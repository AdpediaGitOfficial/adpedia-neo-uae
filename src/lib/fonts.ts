import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

/**
 * Typography system (design → code).
 *
 * The Figma comp uses three roles. These Google fonts are close, license-clean
 * matches that are self-hosted by next/font (no runtime network, no CLS):
 *   - sans     → body copy + light hero/section headings   (Inter)
 *   - display  → geometric section headings                (Space Grotesk)
 *   - mono     → nav items, buttons, eyebrow/attribution   (JetBrains Mono)
 *
 * All three are wired to CSS variables and consumed via Tailwind's fontFamily,
 * so swapping in the licensed brand fonts later is a one-file change.
 */
export const fontSans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const fontDisplay = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const fontVariables = `${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable}`;
