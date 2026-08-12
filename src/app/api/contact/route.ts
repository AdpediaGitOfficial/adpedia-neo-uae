import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site";
import { validateContact, type ContactValues } from "@/lib/contact-schema";

/** Needs the Node runtime (and per-instance state) rather than edge. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Best-effort in-memory rate limit: 5 submissions per IP per 10 minutes.
 * Per-instance only — a serverless deploy with many cold instances will not
 * enforce this globally. It stops casual abuse, not a determined flood; put a
 * WAF / provider-level rate limit in front if that becomes a concern.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Keep submitted text out of the HTML we send to ourselves. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
  // Must be a domain verified in Resend, otherwise sending is rejected.
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from) {
    // Misconfiguration is ours, not the visitor's — log loudly, stay vague publicly.
    console.error("[contact] RESEND_API_KEY or CONTACT_FROM_EMAIL is not set");
    return NextResponse.json({ error: "Contact form is not configured." }, { status: 503 });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: Partial<ContactValues>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation failed.", errors }, { status: 400 });
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const company = body.company!.trim();
  const service = (body.service ?? "").trim() || "Not specified";
  const message = body.message!.trim();

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `New enquiry — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company}`,
        `Service: ${service}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New enquiry from ${escapeHtml(name)}</h2>
        <p><strong>Email:</strong> ${escapeHtml(email)}<br/>
           <strong>Company:</strong> ${escapeHtml(company)}<br/>
           <strong>Service:</strong> ${escapeHtml(service)}</p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error("[contact] Resend rejected the send:", error);
      return NextResponse.json({ error: "Could not send your message." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (cause) {
    console.error("[contact] Unexpected failure sending enquiry:", cause);
    return NextResponse.json({ error: "Could not send your message." }, { status: 500 });
  }
}
