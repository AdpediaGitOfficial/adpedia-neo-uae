# Adpedia Neo — Design System

Single source of truth for UI. **Build new pages from these primitives — don't hand-roll styles.**

## Principles

1. **One family.** Inter for everything; emphasis comes from **weight**, never a second typeface.
   JetBrains Mono is reserved for nav items, buttons, eyebrow labels, and attribution.
2. **Sharp corners.** Every box/card/control has `border-radius: 0`. Only genuine circles
   (avatars, dots, icon buttons) use `rounded-full`.
3. **Borders, not shadows.** Surfaces are separated by hairline borders; shadows are near-absent.
4. **Tone over ad-hoc opacity.** Use the 4-step text scale, never a new `/57`.

## Tokens (`tailwind.config.ts`)

**Color**

| Role | Token |
|---|---|
| Page surface | `ink` `#000` |
| Raised surface / cards | `ink-800` `#0e0e0e` (hover `ink-700`) |
| Light surface | `paper` `#fff`, inner panels `paper-200` `#f7f7f7` |
| Brand accent | `accent-600` `#3631bf` (hover `accent-500`) |

**Text tone** — primary `100%` · secondary `60%` · muted `45%` · faint `25%`
(`text-white/*` on dark, `text-ink/*` on light). **Hairline borders: `/10`.**

**Type scale** — display `display-xl / lg / md / sm` (fluid `clamp`) ·
text `title-lg / title / subtitle / body / body-sm / caption` · `eyebrow` · `label` (mono).

**Layout** — `max-w-content` 1920 + `xl:px-[100px]` → **1720px content / 100px gutters**.
Vertical rhythm: `py-section` (`clamp(4.5rem, 9vw, 9rem)`).

## Primitives (`src/components/ui/`)

**Typography** (`typography.tsx`) — `Eyebrow` · `Label` · `Heading` (`size` xl/lg/md/sm, `weight`,
`surface`, `balance`) · `Title` (lg/md/sm) · `Subtitle` · `Text` (`size`, `tone`, `surface`)

**Layout & surfaces** — `Section` (`tone`, `padded`, `container`) · `Container` ·
`Card` (`tone` dark/raised/light, `padding`) · `SectionHeading` (eyebrow + heading + subtitle)

**Controls** — `Button` (`variant` primary/outline/ghost, `size` md/lg; renders `<a>` when given `href`) ·
`IconButton` (`size` sm/md/lg/xl, `variant` ghost/outline/soft/scrim/plain, **`label` required**) ·
`Tag` / `TagLink` (`tone`, `size`, `active`)

**Forms** (`form.tsx`) — `Field` (label + error/hint wiring) · `Input` · `Textarea` · `Select`.
Always wrap a control in `Field` and pass `htmlFor` matching the control `id`.

**Motion** — `Reveal` (`direction`, `delay`) · `Stagger` + `StaggerItem` · `Parallax` ·
`ScrollFillText`. Global smooth scroll via `SmoothScroll` (Lenis). **All respect
`prefers-reduced-motion`;** a `<noscript>` rule reveals content without JS.

## Building a page

```tsx
<Section tone="light" aria-labelledby="x-heading">
  <SectionHeading eyebrow="Service" title="What we do best" subtitle="…" tone="light" />
  <Stagger className="mt-14 grid gap-6 sm:grid-cols-3">
    {items.map((i) => (
      <StaggerItem key={i.id}>
        <Card tone="light" padding="md">
          <Title as="h3" size="sm" surface="light">{i.title}</Title>
          <Text surface="light" className="mt-3">{i.body}</Text>
        </Card>
      </StaggerItem>
    ))}
  </Stagger>
</Section>
```

## Rules

- Put page copy in `src/lib/` (`site.ts`, `*-content.ts`) — never inline in components.
- Every `IconButton` needs `label`; decorative icons need `aria-hidden`.
- Sections get `aria-labelledby` pointing at their heading `id`.
- Don't add new opacity values, radii, or font sizes — extend the tokens instead.

## Known exceptions

Two bespoke values are kept deliberately to preserve the Figma rendering:
the stat number (`text-[3.75rem]`) and the accordion row title (`text-2xl sm:text-[2rem]`).
