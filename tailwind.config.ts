import type { Config } from "tailwindcss";

/**
 * Adpedia Neo design system.
 * Tokens are derived from the Figma file (eR3jRwfwj4u38Fk8oP7AzK).
 * Colors are also exposed as CSS variables in globals.css so they can be
 * themed/overridden without touching component code.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Core surfaces
        ink: {
          DEFAULT: "#000000", // primary dark background
          900: "#0a0a0a",
          800: "#0e0e0e", // elevated dark cards / footer
          700: "#141414",
          600: "#1a1a1a",
        },
        paper: {
          DEFAULT: "#ffffff", // light section background
          100: "#fafafa",
          200: "#f7f7f7", // light inner cards
          300: "#efefef",
        },
        // Brand accent (indigo) — exact fill sampled from Figma buttons: #3631BF
        accent: {
          DEFAULT: "#3631bf",
          50: "#eeedfb",
          100: "#d9d7f4",
          200: "#b3aee9",
          300: "#8d86de",
          400: "#645cd0",
          500: "#4a43cc",
          600: "#3631bf", // primary
          700: "#2c289b",
          800: "#221f78",
          900: "#191655",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Single family site-wide (matches Figma); `display` reuses sans, emphasis
        // comes from weight. Kept as a role so headings can be retargeted in one place.
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid display scale (clamps for responsive parity with the 1920 comp)
        "display-xl": ["clamp(2.75rem, 6vw, 5.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.6vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.9rem, 3.2vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.6rem, 2.4vw, 2.25rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        // Text scale (non-display) — one source for titles, body, and captions.
        "title-lg": ["clamp(1.5rem, 2.4vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        title: ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        subtitle: ["1.125rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.625" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.04em" }],
        label: ["0.75rem", { lineHeight: "1.1", letterSpacing: "0.14em" }],
      },
      maxWidth: {
        // Matches the Figma 1920 canvas: box caps at 1920, and 100px inner gutters (xl:px-[100px])
        // leave a ~1720px content column. Every section uses <Container>, so width stays consistent.
        content: "1920px",
      },
      spacing: {
        section: "clamp(4.5rem, 9vw, 9rem)", // vertical section rhythm
      },
      borderRadius: {
        // Sharp-edge design system: every box/card/control is square.
        // `full` is kept for genuine circles (avatars, dots) — those aren't "boxes".
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        card: "0",
        full: "9999px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
