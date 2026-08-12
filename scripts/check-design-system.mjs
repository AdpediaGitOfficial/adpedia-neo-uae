#!/usr/bin/env node
/**
 * Enforces the DESIGN-SYSTEM.md checklist. Runs on `npm run build` (prebuild),
 * so a page cannot ship without passing it.
 *
 * Checks are deliberately narrow — each one catches a class of bug we have
 * actually hit, and none of them should produce false positives:
 *
 *  1. Every <Section>/<section> is labelled, and the aria-labelledby target
 *     resolves to an id/headingId in the same file. (Industries declared
 *     aria-labelledby="industries-heading" with no such id, so the section
 *     looked labelled but was not.)
 *  2. Sharp corners: no rounded-* except rounded-full / rounded-none.
 *  3. No arbitrary font sizes, tracking, or radii — extend the tokens instead.
 *     The two deliberate exceptions from DESIGN-SYSTEM.md are allowlisted.
 *
 * Not checked (too noisy to be useful): arbitrary spacing values like
 * pt-[calc(...)], and the text-opacity scale, which legitimately uses values
 * beyond the 4 documented steps for borders, placeholders, and hover states.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SRC = join(ROOT, "src");

/** Documented exceptions in DESIGN-SYSTEM.md ("Known exceptions"). */
const ARBITRARY_ALLOWLIST = [
  { file: "src/components/sections/home/Stats.tsx", value: "text-[3.75rem]" },
  { file: "src/components/sections/home/ServicesAccordion.tsx", value: "text-[2rem]" },
];

/**
 * Pre-existing debt, enumerated so it is visible rather than hidden. Each is a
 * font size or tracking that should be a token. They sit on pixel-verified
 * components (header, mega menu, buttons), so resolving them is a deliberate
 * task — either name each value as a token (no visual change) or snap them to
 * the nearest scale step (small visual change). Do NOT add new entries here.
 */
/**
 * The documented text-tone scale: primary (no suffix) / secondary 60 /
 * muted 45 / faint 25. Only *text* is checked — borders and backgrounds
 * legitimately need steps in between (hairlines, hover states, scrims), and
 * enforcing those produces noise rather than signal.
 */
const TEXT_TONE_STEPS = [25, 45, 60];

/**
 * Pre-existing text tones outside the scale, enumerated so they stay visible.
 * Each is a real violation on a component that predates the gate. Resolving
 * them means snapping to the nearest step, which is a small visual change and
 * therefore a deliberate task. Do NOT add new entries.
 */
const TEXT_TONE_DEBT = [
  { file: "src/components/layout/Footer.tsx", value: "text-white/70" },
  { file: "src/components/layout/Header.tsx", value: "text-white/80" },
  { file: "src/components/layout/MegaMenuPanels.tsx", value: "text-white/50" },
  { file: "src/components/layout/MegaMenuPanels.tsx", value: "text-white/55" },
  { file: "src/components/layout/MobileMenu.tsx", value: "text-white/50" },
  { file: "src/components/sections/home/ServicesAccordion.tsx", value: "text-ink/85" },
  { file: "src/components/sections/home/Testimonials.tsx", value: "text-white/70" },
  { file: "src/components/ui/IconButton.tsx", value: "text-white/70" },
  { file: "src/components/ui/Tag.tsx", value: "text-ink/75" },
  { file: "src/components/ui/Tag.tsx", value: "text-white/70" },
  { file: "src/components/ui/form.tsx", value: "text-ink/40" },
  { file: "src/components/ui/form.tsx", value: "text-ink/70" },
  { file: "src/components/ui/form.tsx", value: "text-white/35" },
  { file: "src/components/ui/form.tsx", value: "text-white/70" },
];

const LEGACY_DEBT = [
  { file: "src/components/layout/Header.tsx", value: "text-[0.9rem]" },
  { file: "src/components/layout/Header.tsx", value: "tracking-[0.1em]" },
  { file: "src/components/layout/MegaMenuPanels.tsx", value: "text-[0.95rem]" },
  { file: "src/components/layout/MegaMenuPanels.tsx", value: "text-[0.8rem]" },
  { file: "src/components/layout/MegaMenuPanels.tsx", value: "text-[0.65rem]" },
  { file: "src/components/layout/MegaMenuPanels.tsx", value: "text-[0.62rem]" },
  { file: "src/components/ui/Button.tsx", value: "text-[0.72rem]" },
];

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(SRC).filter((f) => f.endsWith(".tsx"));
const problems = [];

for (const file of files) {
  const rel = relative(ROOT, file);
  const src = readFileSync(file, "utf8");
  const lines = src.split("\n");

  /* 1. section labelling ------------------------------------------------ */
  // Primitives in ui/ define the element and forward props; they cannot label
  // themselves. Only composed sections and pages are checked.
  const isPrimitive = rel.startsWith("src/components/ui/");
  const opensSection = !isPrimitive && /<(Section|section)[\s>]/.test(src);
  if (opensSection) {
    const labels = [...src.matchAll(/aria-labelledby=["{]?["']([^"']+)["']/g)].map((m) => m[1]);
    const hasAriaLabel = /aria-label=/.test(src);
    // `aria-labelledby={headingId}` — a prop or variable. The label is present
    // but its target cannot be resolved statically, so accept it rather than
    // reporting a section that is in fact labelled.
    const hasDynamicLabel = /aria-labelledby=\{/.test(src);
    if (labels.length === 0 && !hasAriaLabel && !hasDynamicLabel) {
      problems.push(`${rel}: renders a Section but has no aria-labelledby`);
    }
    for (const id of labels) {
      const defined =
        new RegExp(`id=["']${id}["']`).test(src) || new RegExp(`headingId=["']${id}["']`).test(src);
      if (!defined) {
        problems.push(
          `${rel}: aria-labelledby="${id}" does not resolve — no id="${id}" or headingId="${id}" in this file`
        );
      }
    }
  }

  /* 2 & 3. per-line class checks ---------------------------------------- */
  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;

    for (const m of line.matchAll(/\brounded-(?!full\b|none\b)([a-z0-9[\]-]+)/g)) {
      problems.push(`${at}: sharp-corner rule — use rounded-none/full, found rounded-${m[1]}`);
    }

    for (const m of line.matchAll(/\btext-(white|ink)\/(\d+)\b/g)) {
      const value = `text-${m[1]}/${m[2]}`;
      if (TEXT_TONE_STEPS.includes(Number(m[2]))) continue;
      const known = TEXT_TONE_DEBT.some((d) => rel === d.file && value === d.value);
      if (!known) {
        problems.push(
          `${at}: ${value} is off the text-tone scale — use secondary /60, muted /45, or faint /25`
        );
      }
    }

    for (const m of line.matchAll(/\b(text|tracking|rounded)-\[([^\]]+)\]/g)) {
      const value = `${m[1]}-[${m[2]}]`;
      const allowed = [...ARBITRARY_ALLOWLIST, ...LEGACY_DEBT].some(
        (a) => rel === a.file && value === a.value
      );
      if (!allowed) {
        problems.push(`${at}: arbitrary ${m[1]} value ${value} — add a token instead`);
      }
    }
  });
}

if (problems.length > 0) {
  console.error("\n✖ DESIGN-SYSTEM.md checklist failed:\n");
  for (const p of problems) console.error(`  ${p}`);
  console.error(`\n${problems.length} problem(s). See DESIGN-SYSTEM.md.\n`);
  process.exit(1);
}

console.log(`✔ DESIGN-SYSTEM checklist passed (${files.length} files)`);
