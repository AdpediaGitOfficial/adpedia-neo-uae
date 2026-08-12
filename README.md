# Adpedia Neo — Website

Production Next.js implementation of the Adpedia Neo creative-studio site, built pixel-close to the Figma design (`eR3jRwfwj4u38Fk8oP7AzK`).

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3.4** — design tokens in `tailwind.config.ts`
- **Framer Motion** — scroll reveals, accordion, stacked-card + modal
- **lucide-react** — UI icons
- Self-hosted fonts via `next/font` (Inter · Space Grotesk · JetBrains Mono)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
npm run typecheck
```

## Architecture

```
src/
  app/
    layout.tsx          # root layout: metadata/SEO, fonts, header/footer, JSON-LD
    page.tsx            # Home — composes the section components
    globals.css         # base layer, tokens mirror, component/utility classes
    not-found.tsx       # on-brand 404
    robots.ts sitemap.ts
  components/
    ui/                 # Button, Container, Reveal, SectionHeading  (primitives)
    layout/             # Header, MobileMenu, Footer
    sections/
      CtaBand.tsx       # shared closing CTA (used on every page)
      home/             # Hero, TrustedLogos, Stats, AiSection, Clarity,
                        # ServicesAccordion, Stories, Industries, Testimonials
  lib/
    site.ts             # nav, footer, offices, brand config
    home-content.ts     # all Home copy + asset references (single source of truth)
    fonts.ts utils.ts
public/images/          # design assets exported from Figma (+ cropped logos/avatars)
```

## Design system

Tokens live in `tailwind.config.ts` and are mirrored as CSS variables in `globals.css`:

- **Colors** — `ink` (dark surfaces `#000`/`#0e0e0e`), `paper` (light `#fff`/`#f7f7f7`),
  `accent` indigo scale (primary `#3631bf`, sampled from the Figma buttons).
- **Type roles** — `font-sans` (Inter, body + light hero headings), `font-display`
  (Space Grotesk, geometric section headings), `font-mono` (JetBrains Mono, nav /
  buttons / eyebrows / attribution). Fonts are wired to CSS variables so the licensed
  brand fonts can be swapped in one file (`lib/fonts.ts`).
- **Fluid type** — `display-xl…sm` clamps keep parity with the 1920 comp down to mobile.

## Accessibility & performance

- Semantic landmarks, `aria-expanded`/`aria-controls` accordion, labelled dialogs
  (mobile menu, testimonial modal) with Escape + scroll-lock, skip link, visible focus rings.
- `prefers-reduced-motion` disables animation; `<noscript>` reveals content without JS.
- `next/image` for every asset, static prerender, security headers in `next.config.mjs`.

## Notes

- Only bound tokens were unavailable in Figma, so colors/spacing were sampled from the
  comp and encoded as tokens. Fonts are close free matches — swap in the licensed faces
  in `lib/fonts.ts` if desired.
- The Home page is complete. Other routes (About, Portfolio, Services, Careers, Blog,
  Contact) resolve to the on-brand 404 until built from their own Figma frames.
