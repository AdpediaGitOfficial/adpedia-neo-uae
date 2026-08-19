import { Inter, JetBrains_Mono } from "next/font/google";

/**
 * Typography system (design → code).
 *
 * The Figma uses ONE neutral grotesque family for all headings and body, with
 * weight (not a second typeface) providing emphasis — so we keep a single sans
 * family site-wide for consistency. Mono is used for nav/buttons/labels only.
 *   - sans  → body + all headings (Inter; the `display` role reuses this family)
 *   - mono  → nav items, buttons, eyebrow/attribution (JetBrains Mono)
 *
 * Wired to CSS variables and consumed via Tailwind, so swapping in the licensed
 * brand font later is a one-file change.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontMono.variable}`;
