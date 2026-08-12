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

**Forms** (`form.tsx`) — `Field` (label + error/hint wiring, `hideLabel`) · `Input` · `Textarea` · `Select`.
Always wrap a control in `Field` and pass `htmlFor` matching the control `id`.
For placeholder-led layouts (the contact form), pass `hideLabel` — the label stays in the
accessibility tree as `sr-only` rather than being dropped. `Select` renders its own chevron
(the native one is removed by `appearance-none`).

**Motion** — `Reveal` (`direction`, `delay`) · `Stagger` + `StaggerItem` ·
`ScrollFillText`. Global smooth scroll via `SmoothScroll` (Lenis, `lerp` tuned for
wheel tracking). **All respect `prefers-reduced-motion`;** a `<noscript>` rule reveals
content without JS.

> `Parallax` was removed — translating elements against the scroll fought the smooth
> scroll and cost a frame budget it was not worth. Don't reintroduce scroll-linked
> transforms without measuring.

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
- Sections get `aria-labelledby` pointing at their heading `id`. When the comp has no
  visible heading for a section, add an `sr-only` one rather than a bare `aria-label`.
- Use `Section` for page sections and `Text`/`Title`/`Heading` for copy — don't hand-roll
  `text-*`/tone classes on raw elements. Icons may carry tone classes directly (no primitive).
- Don't add new opacity values, radii, font sizes, or tracking — extend the tokens instead.

## Checklist (enforced)

`npm run check:ds` runs `scripts/check-design-system.mjs`. It is wired to
**`prebuild`, so `npm run build` fails before Next compiles** if any rule is broken —
the checklist cannot be skipped or forgotten.

It enforces four things, each chosen because we actually hit it:

1. **Every section is labelled**, *and* `aria-labelledby` resolves to an `id`/`headingId`
   in the same file. Industries once declared a label pointing at nothing, so the section
   looked labelled but was silently unlabelled to screen readers.
2. **Sharp corners** — no `rounded-*` except `rounded-full` / `rounded-none`.
3. **No arbitrary font sizes, tracking, or radii** — add a token instead.
4. **Text stays on the tone scale** — `text-white/*` and `text-ink/*` must be `/60`
   (secondary), `/45` (muted), or `/25` (faint). Primary is no suffix at all.

Scope of rule 4 is deliberately narrow: **text only**. Borders and backgrounds genuinely
need steps in between — hairlines, hover states, scrims — so `border-white/15` and
`bg-black/50` are fine. Tone classes on **icons** are fine too; no text primitive applies
to them. Arbitrary *spacing* is not enforced either (`pt-[calc(...)]` is legitimate).

**Legacy debt.** The script carries two allowlists, enumerated rather than hidden:
`LEGACY_DEBT` (7 arbitrary font sizes/tracking values in `Header`, `MegaMenuPanels`,
`Button`) and `TEXT_TONE_DEBT` (14 off-scale text tones in `Tag`, `IconButton`, `form`,
`Header`, `Footer`, `MobileMenu`, `MegaMenuPanels`, `Testimonials`, `ServicesAccordion`).
Both are scoped per file, so the same value still fails elsewhere. Clearing them means
snapping to the nearest step — a small visual change, and therefore a deliberate task on
components that are pixel-verified. **Do not add new entries to either.**

## Known exceptions

Two bespoke values are kept deliberately to preserve the Figma rendering:
the stat number (`text-[3.75rem]`) and the accordion row title (`text-2xl sm:text-[2rem]`).
