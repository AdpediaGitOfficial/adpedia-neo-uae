# Adpedia Neo — Working Notes

Short handoff note. See `README.md` for stack/architecture.

## Status

Home page is **built and complete**. Design-system refactor is **4 of 6 phases done**.
Production build passes (`npm run build`). Dev: `PORT=3000 npm run dev`.

## Design system

**Tokens** — `tailwind.config.ts` (colors `ink`/`paper`/`accent`, fluid `display-*` scale,
text scale `title-lg/title/subtitle/body/body-sm/caption`, `eyebrow`, `label`,
`maxWidth.content: 1920`, `spacing.section`, **all radii = 0** except `full`).
Fonts: **one Inter family** (+ JetBrains Mono for nav/buttons/labels) — `lib/fonts.ts`.

**Primitives** — `src/components/ui/`
- typography.tsx: `Eyebrow, Label, Heading, Title, Subtitle, Text`
- `Section, Container, Card, Tag/TagLink, IconButton, Button, SectionHeading`
- motion: `Reveal, Stagger, StaggerItem, Parallax, ScrollFillText`

**Conventions**
- Opacity scale: primary 100 / **secondary 60** / **muted 45** / faint 25; card hairlines `/10`.
- Surfaces: page `#000`, raised `#0e0e0e`, light `#fff`, light-2 `#f7f7f7`.
- Emphasis via **weight**, never a second typeface. Sharp corners everywhere.
- Container: `max-w-1920` + `xl:px-[100px]` → **1720px content / 100px gutters** (matches Figma).

## Phases

| Phase | Commit | State |
|---|---|---|
| 1 tokens + dead-code cleanup | `2a1aba6` | done |
| 2 typography primitives | `c935044` | done |
| 3 Section/Card/Tag/IconButton | `3684fd1` | done |
| 4a 9 sections → primitives | `c79393a` | done |
| 4b Testimonials + Footer → primitives | see log | done |
| 4c MegaMenuPanels, Header/MobileMenu (icon buttons, tags) | — | **next** |
| 5 form primitives (Input/Textarea/Select/Field/Form) | — | todo |
| 6 strip legacy `rounded-*`, write DESIGN-SYSTEM.md | — | todo |

Rule for the refactor: **pixel-identical** (verified via computed styles), except
opacities snapped to the scale (approved; sub-perceptual).

## Known issues / decisions

- **Push is blocked.** Remote `origin` = `git@github.com:AdpediaGitOfficial/adpedia-neo-uae.git`.
  This machine's SSH key is not registered on an account with write access
  (`Permission denied (publickey)`); HTTPS account `akash-adpedia` gets 403.
  All work is committed locally on `main`.
- **Bundle grew ~6 kB** (First Load JS 159 → 165 kB) — primitives pulled into client
  bundles by `"use client"` sections. Can be trimmed in Phase 6.
- **Left bespoke on purpose** (protects parity): stat number `text-[3.75rem]`,
  accordion row title `text-2xl sm:text-[2rem]`.
- Only the **home page** exists. `/about`, `/portfolio`, `/services`, `/careers`,
  `/blog`, `/contact` resolve to the on-brand 404 until built from their Figma frames.
- Env: no `claude` CLI on PATH; `/Applications/XAMPP/bin/head` shadows GNU `head`
  (pipe to a file instead). Figma MCP `get_design_context`/`get_metadata` time out on
  this large file — use `get_screenshot` + `download_assets` instead.
