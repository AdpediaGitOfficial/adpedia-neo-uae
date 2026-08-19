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
          800: "#0e0e0e", // elevated dark cards / footer
          700: "#141414",
        },
        paper: {
          DEFAULT: "#ffffff", // light section background
          200: "#f7f7f7", // light inner cards
        },
        // Brand accent (indigo) — exact fill sampled from Figma buttons: #3631BF
        accent: {
          DEFAULT: "#3631bf",
          50: "#eeedfb",
          300: "#8d86de",
          400: "#645cd0",
          500: "#4a43cc",
          600: "#3631bf", // primary
          700: "#2c289b",
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
        // Fluid display scale. The caps are the site's two heading sizes and
        // are deliberate: 68px for page hero titles (`display-xl`) and 60px for
        // every section heading (`display-lg`). Because every heading renders
        // through these tokens, changing a cap here is the only place a heading
        // size is set — do not hard-code one in a component.
        "display-xl": ["clamp(2.75rem, 6vw, 4.25rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem, 4.6vw, 3.75rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.9rem, 3.2vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.6rem, 2.4vw, 2.25rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        // Text scale (non-display) — one source for titles, body, and captions.
        "title-lg": ["clamp(1.5rem, 2.4vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        title: ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        subtitle: ["1.125rem", { lineHeight: "1.5" }],
        // 20px step between `subtitle` and `body` — the home stats intro sets its
        // paragraph at this size on desktop. A token rather than an arbitrary
        // value, per "extend the tokens instead".
        "body-lg": ["1.25rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.625" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.8125rem", { lineHeight: "1.5" }],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.04em" }],
        label: ["0.75rem", { lineHeight: "1.1", letterSpacing: "0.14em" }],
      },
      letterSpacing: {
        // Wide-tracked uppercase headings (e.g. the contact page office names).
        spaced: "0.25em",
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
        full: "9999px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 20s) linear infinite",
        // Short crossfade for the /services "what we do" image when the active
        // service changes. `motion-reduce:animate-none` on the element opts out.
        "fade-in": "fade-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
