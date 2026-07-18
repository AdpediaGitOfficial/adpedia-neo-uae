import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { Label, Text } from "@/components/ui/typography";
import { siteConfig, footerColumns } from "@/lib/site";

const socials = [
  { label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  { label: "Instagram", href: siteConfig.social.instagram, Icon: Instagram },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink pb-12">
      <Container>
        {/* Card is inset narrower than the content column, matching the Figma footer. */}
        <Card
          padding="none"
          className="relative mx-auto max-w-[1560px] overflow-hidden px-8 py-14 sm:px-12 lg:px-16"
        >
          {/* subtle ambient glow — keeps the card reading cleanly black */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-1/2 left-1/2 h-80 w-[60%] -translate-x-1/2 rounded-full bg-accent-600/10 blur-[130px]"
          />

          <div className="relative grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr]">
            {/* Brand */}
            <div className="max-w-xs sm:col-span-2 lg:col-span-1">
              <Image
                src="/images/brand/logo-white.png"
                alt="Adpedia Neo"
                width={172}
                height={50}
                className="h-8 w-auto"
              />
              <Text className="mt-6">
                We are a creative digital studio crafting impactful brand experiences through strategy,
                design, and technology
              </Text>
              <ul className="mt-7 flex items-center gap-4">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <IconButton
                      href={href}
                      size="sm"
                      variant="ghost"
                      label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </div>

            {/* Link columns */}
            {footerColumns.map((col, i) => (
              <nav key={`${col.title}-${i}`} aria-label={col.title}>
                <Label as="h3" className="text-white/45">
                  {col.title}
                </Label>
                <ul className="mt-5 space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* Contact column */}
            <div>
              <Label as="h3" className="text-white/45">
                Contact us
              </Label>
              <ul className="mt-5 space-y-3.5 text-sm text-white/70">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-white">
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a href={siteConfig.phoneHref} className="transition-colors hover:text-white">
                    {siteConfig.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar — inside the card, matching Figma */}
          <div className="relative mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-body-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              {siteConfig.shortName} © {year} All rights reserved
            </p>
            <div className="flex items-center gap-3">
              <Link href="/privacy-policy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <span aria-hidden className="text-white/25">
                |
              </span>
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms &amp; Conditions
              </Link>
            </div>
          </div>
        </Card>
      </Container>
    </footer>
  );
}
