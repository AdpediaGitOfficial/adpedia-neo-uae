# Adpedia Neo — Working Notes

Short handoff note. See `README.md` for stack/architecture.

## Status

| Route | State |
|---|---|
| `/` | built (pixel-verified against Figma) |
| `/about` | built — Figma `935-1334` |
| `/services` | built — Figma `935-5485` |
| `/portfolio` + `/portfolio/[slug]` | built — Figma `935-1725`; 4 projects |
| `/blog` + `/blog/[slug]` | built — Figma `935-4663`, `935-5114`; 2 posts |
| `/careers` | built — Figma `935-2121` |
| `/contact` | built — Figma `935-2513` |
| `/services/ui-ux-design` | built — Figma `935-6100` |
| `/services/web-development` | built — Figma `935-6509` |
| `/services/mobile-app-development` | built — Figma `935-7099` |
| `/services/ai-data-science` | built — Figma `940-7758` |
| `/services/product-development` | built — Figma `940-8180` |
| `/services/devops-services` | built — Figma `940-8507` (8 sections) |
| `/privacy-policy`, `/terms` | **not built** — need real legal copy |

Design-system refactor complete (6/6). Production build passes. Dev: `PORT=3000 npm run dev`.
Figma file key: `eR3jRwfwj4u38Fk8oP7AzK`. **Every page needs its node ID from the client** —
the file exposes one "Cover" page and `get_metadata` returns a partial dump, so frames
cannot be enumerated.

## Adding a page — the workflow that works

1. Get the **node ID** from the client. Then `get_metadata` (gives exact coordinates and
   every text string — this is the authoritative source, more reliable than screenshots)
   and `get_screenshot` for visual treatment.
2. **Read the geometry before assuming.** Three separate bugs came from assuming an
   overlay where the comp specifies adjacent frames (about ticker vs date badge, process
   card labels, portfolio filter row). If two frames don't overlap in the metadata, don't
   overlay them in code.
3. **Identical Figma layer names do not mean identical images.** Export the composited
   group and compare byte sizes before reusing one asset across cards.
4. Copy goes in `src/lib/<page>-content.ts`. Reuse existing sections where the comp
   matches (`CtaBand`, `Footer`, `Industries` are all shared).
5. Build, then verify **in the browser**, then commit. Add the route to `src/app/sitemap.ts`.

**Interactive lists must not use `useSearchParams`.** It opts the subtree out of
prerendering, so the content vanishes from the served HTML. This bit portfolio, careers,
and blog. Use local state; read the query once in `useEffect` and write back with
`replaceState` if deep links matter (see `PortfolioBrowser`). Always confirm with
`curl <url> | grep` — no JS runs there.

**Mega menus.** Three now: Service, Portfolio, and Blog (`MegaKey`). All are
mounted at all times so their links ship in the served HTML and stay crawlable;
only their imagery is deferred until the menu is first opened. `BlogMegaPanel`
is built to the same plan as `PortfolioMegaPanel` — intro + category chips left,
cards right — with two content-driven differences: post titles are clamped to
two lines (they run far longer than project names and would otherwise set every
card to a different height), and each card shows its date.

`blogLinks` follows `portfolioLinks`' rule: only categories that actually have
posts are offered, so the menu never advertises a filter that returns nothing.
Today that is Development alone.

**A menu chip is only useful if the target page reads the query.** `BlogBrowser`
was local-state-only, so `/blog?category=…` would have navigated and changed
nothing. It now reads the query once on mount and writes back with
`replaceState`, exactly as `PortfolioBrowser` does — *not* `useSearchParams`,
which would drop every post from the prerendered HTML.

**Home `Stats`** was rebuilt (approved from a mock). It had a structural void —
the intro card was `h-full` with `mt-auto` on the button, so it stretched to a
2x2 grid it had no content for — and four white cards floating on a white
section, each carrying a border *and* a shadow. Now: one hairline-divided panel,
and an `accent-600` intro card rather than `ink`, because Stats is the home
page's **first light section** and an ink card made the whole top of the page
read as one long dark run. Columns measure equal (695px each at 1440).

Two things to keep in mind if it is touched again:
- **The dividers are a 1px grid `gap`, not cell borders.** Per-cell borders
  needed `border-b` at one breakpoint and `border-b-0` at another — the same
  utility twice, where Tailwind's output order decides the winner rather than
  the order passed to `cn`. The horizontal rules silently lost. A gap has
  nothing to collide with and re-flows itself between one and two columns.
- **`body-lg` (20px) and the `invert` Button variant were added for this.** The
  intro paragraph is 20px from `sm` up; `invert` is a white-on-colour CTA, for
  any filled surface where `primary` would be accent-on-accent and invisible.

## Open items

- **Assets missing**: 3 process-card images for `/services`. Images attached in chat
  cannot be written to disk — they must be placed in `public/images/` directly.
- **Service mega-menu thumbnails are PLACEHOLDERS.** All 6 services now set
  `Service.thumb` → `public/images/services/thumb-<slug>.png`, generated on-brand
  (ink-800 ground, accent geometry, initials, dotted rule marking them provisional).
  Swap the files keeping the same names and no code changes; drop a `thumb` entry to
  fall back to the icon tile. Do not ship these to production as-is.
- **`CtaBand` self-links** on `/contact` (`closingCta.cta.href` is `/contact`).
- **Home Stories cards don't link** to case studies; the mega menu and index both do.
- **`cn` has no tailwind-merge**, so a `text-*` class passed to a typography primitive is
  silently ignored — it shipped grey error text and invisible white-on-white titles.
  `Title` has `accent`, `Text` has `danger`; add props rather than fighting the class list.
- **21 enumerated debt items** in `scripts/check-design-system.mjs`
  (`LEGACY_DEBT`, `TEXT_TONE_DEBT`).
- **Push is blocked** — no write access from this machine; all work is local on
  `feat/contact-page` (branch name is stale, now covers the whole site).

**`/contact` form** posts to `POST /api/contact` (Resend). Validation is shared by
client and server via `src/lib/contact-schema.ts`. Rate limit: 5/IP/10min, in-memory
and **per-instance** — not global across serverless instances.

**Before deploy, set env** (see `.env.example`): `RESEND_API_KEY` and
`CONTACT_FROM_EMAIL` (must be a Resend-**verified domain**), optional `CONTACT_TO_EMAIL`.
Without them the route returns 503 and the form shows an error. **Not yet tested with a
real key** — only against a fake one (correctly 502s), so do one live send after deploy.

## Design system

**Tokens** — `tailwind.config.ts` (colors `ink`/`paper`/`accent`, fluid `display-*` scale,
text scale `title-lg/title/subtitle/body/body-sm/caption`, `eyebrow`, `label`,
`maxWidth.content: 1920`, `spacing.section`, **all radii = 0** except `full`).
Fonts: **one Inter family** (+ JetBrains Mono for nav/buttons/labels) — `lib/fonts.ts`.

**Primitives** — `src/components/ui/`
- typography.tsx: `Eyebrow, Label, Heading, Title, Subtitle, Text`
- `Section, Container, Card, Tag/TagLink, IconButton, Button, SectionHeading`
- motion: `Reveal, Stagger, StaggerItem, ScrollFillText` (`Parallax` removed — it
  fought the smooth scroll)

**Conventions**
- Opacity scale: primary 100 / **secondary 60** / **muted 45** / faint 25; card hairlines `/10`.
- Surfaces: page `#000`, raised `#0e0e0e`, light `#fff`, light-2 `#f7f7f7`.
- Emphasis via **weight**, never a second typeface. Sharp corners everywhere.
- **Two heading sizes, site-wide.** Page hero titles (`h1`) are **68px**
  (`display-xl`); every section heading is **60px** (`display-lg`). Both caps
  live in `tailwind.config.ts` and are the *only* place a heading size is set —
  every heading renders through the tokens, so never hard-code one. Verified: 13
  of 13 `h1` at 68px, 36 of 36 section headings at 60px.
  Three things sit outside that pair on purpose:
  - `sr-only` headings (7), added where a comp has no visible heading. Invisible,
    so their size is irrelevant.
  - `Heading size="sm"` (~35px) for in-card titles, pull quotes, and the hero
    statements — a genuine third tier, not section headings.
  - `Title as="h2" size="lg" uppercase tracking-spaced` (32px) on "Inside the
    project", "More work", "Related blogs" — a wide-tracked label treatment from
    the comp. At 60px with 0.25em tracking these would be enormous and wrap.
- **Title Case for everything rendered as `Heading`** — hero page-titles, section
  headings, card/step titles, AND the big centred display statements (the CtaBand
  line, the service-hero statements). If it's a `Heading`, it's Title Case ("What
  We Do Best", "Every Great Brand Begins with a Great Conversation."), short words
  (a/an/the/and/or/for/to/with/in/of/on) lowercase unless first/last, proper nouns
  preserved (AI, UI/UX, Kotlin). Only `Subtitle`/`Text` (subtitles, intros, body)
  stay sentence case — those are not titles. Page hero titles end with a period.
- **Section rhythm.** Each padded `Section` carries `py-section` top and bottom, so
  adjacent sections leave 2× between them. At a colour change that reads fine (one
  section's padding per side); two **same-tone** sections would stack into one
  oversized void. `Section` emits `data-section-tone`/`data-section-padded` and a
  rule in globals.css zeroes the second's top padding for same-tone neighbours, so
  they sit one `py-section` apart. `CtaBand` is a padded `Section` (not inner
  padding) so it participates — its gap to a preceding dark section collapses too.
- Container: `max-w-1920` + `xl:px-[100px]` → **1720px content / 100px gutters** (matches Figma).

## Phases

| Phase | Commit | State |
|---|---|---|
| 1 tokens + dead-code cleanup | `2a1aba6` | done |
| 2 typography primitives | `c935044` | done |
| 3 Section/Card/Tag/IconButton | `3684fd1` | done |
| 4a 9 sections → primitives | `c79393a` | done |
| 4b Testimonials + Footer → primitives | see log | done |
| 4c MegaMenuPanels chips + MobileMenu icon buttons | see log | done |
| 5 form primitives (Field/Input/Textarea/Select) | see log | done |
| 6 strip legacy `rounded-*`, write DESIGN-SYSTEM.md | see log | done |

Rule for the refactor: **pixel-identical** (verified via computed styles), except
opacities snapped to the scale (approved; sub-perceptual).

## Adding a service detail page (`/services/<slug>`)

Add an entry to `serviceDetails` in `src/lib/service-detail-content.ts`, keyed by
the service `slug` from `services.ts`. That map drives everything: the route's
`generateStaticParams`, the sitemap, and `dynamicParams = false` — so a service
with no entry **404s at build** rather than shipping an empty shell. No route or
sitemap edits needed per page. Sections live in
`src/components/sections/services/detail/` and are all data-driven from the map.
The closing band reuses the shared `CtaBand` (its copy already matches the comp's
"great conversation" section). Assets go in `public/images/services/<slug>/`.

**No two pages share a shape**, so every section block except the hero/work/cta is
optional and the page renders whatever a service provides, in a fixed order:
hero → `platforms?` → `platformGrid?` → `principles?` → `featureCards?` →
`capabilities?` → `bento?` → `mvpBento?` → `process?` → `serviceCards?` →
`expertise?` → work → cta. `ServiceDetail` optional fields:
- `platforms?` (UI/UX) — image + label tiles.
- `platformGrid?` (Mobile) — device icon + label tiles in one grey panel; `icon`
  is a lucide key (the comp's bespoke device glyphs → closest lucide icon).
- `capabilities?` (Web Dev) — the bento of overlay/banner/icon cards + proof.
- `bento?` (Mobile) — image + copy per service on a dark band, cascaded in a
  zigzag (each item its own grid row, alternating `col-start`, so they step down
  opposite sides); collapses to a straight column on mobile. `tag` → accent chip.
- `process?` (UI/UX, Web Dev) — `variant: "cards" | "list"`.
- `serviceCards?` (Mobile) — a light row of accent-icon cards, no eyebrow.
- `featureCards?` (AI) — icon-over-title cards, centred, on a light band.
- `orbital?` (AI) — 8 service nodes ringed around a core on a dark band; a
  desktop-only absolutely-positioned octagon (a deliberate circle exception, per
  the client), collapsing to a sharp-cornered card grid below `lg`.
- `expertise?` (AI) — a dark band of centred icon + label chips, no eyebrow.
- `process.variant: "grid"` (AI) — numbered cards two-up, accent numerals.
- `principles?` (Product Dev) — light band: eyebrow/title/intro hold a left
  column, and compact cards (dark image tile + paragraph) stack down the right,
  each offset to alternating edges so the stack cascades. The comp gives these
  cards **no title** — the paragraph is the card — so `items` has no `title`.
  The stagger is `lg`-only; below that they go full width and stack straight.
- `mvpBento?` (Product Dev) — dark band: the comp's three-column masonry in two
  grid rows, each paragraph beside its artwork. Images carry intrinsic
  `width`/`height` and render at their own aspect ratios. Item order is fixed
  (design, web, mobile, consulting) — the component destructures by role, since
  the layout is specific to this comp rather than a generic list. See the
  layout note below before changing any percentage.
- `work?` is now optional too (AI and Product Dev have no projects section).

Worked examples: `/ui-ux-design` (`935-6100`), `/web-development` (`935-6509`),
`/mobile-app-development` (`935-7099`). Icons that the comp draws as fragile masked
vector groups (device platforms, service glyphs) are mapped to the project's lucide
set rather than exported — one icon family, and no 15 brittle asset exports.

Decisions worth carrying forward:
- **Work grid** uses the real `projects.ts` via `ProjectCard`, not the comps'
  duplicated MACARE/ERP placeholders (client confirmed).
- **Process numbers** render uniform via `display-xl` (→ `display-md` on mobile),
  identical across both process layouts; not the comps' raw 120px, and dropping
  `935-6100`'s accent-tinted "03" (a mockup state, not meaning).
- **Hero art** already falls off to black, so a comp's feather gradients are
  dropped — stacking them only darkens the subject.
- **Capabilities bento** (`935-6509`): the four-column layout from the comp —
  three card treatments (`overlay` photo-with-scrim, `banner` photo-over-text,
  `icon` glyph) driven by a `variant` on each `Capability`, with the stat +
  testimonial as the interleaved second column. A real grid (4 → 2 → 1 col).
  Alignment recipe (three revisions to get right): columns are **equal height +
  `justify-between`** so top cards top-align and bottom cards bottom-align; the
  **overlay card is `flex-1`** so it fills its column and the capability columns
  pack tight, leaving the big middle gap only in the proof column; non-overlay
  cards are **`shrink-0`** so the stretch can't flatten them; the overlay keeps a
  `min-h` for the single-column mobile case where there's nothing to fill.
- **Fonts** map identically on both pages: section headings `display-lg` (64),
  card titles `title`, process step titles `title-lg`, all body `body-sm`.
- **MVP bento** (`940:8180`) is the comp's **three-column masonry, reproduced
  exactly** — two grid rows, each paragraph set *beside* its artwork. Verified
  at 1920 against the Figma coordinates: every measured x and y lands on 0px
  delta. How, and what not to undo:
  - **The comp's 1718px content box is this site's 1720px box**, so its
    coordinates convert straight to percentages. Columns are
    `[34.69% 34.69% 25.9%]` in row 1 and `[34.69% 26.83% 25.9%]` in row 2 (the
    consulting graphic is 461 wide where the web screens are 596, which pulls
    row 2's third column left). Gaps are `1.222%` (21/1718) so the grid stays
    proportional at any width; the same trick sets the in-column offsets
    (`5.54%` = 33/596, `6.71%` = 40/596).
  - **Three alignments are load-bearing**: rocket and web screens end on the
    same baseline, phone and consulting graphic start on the same one, and the
    two right-hand paragraphs are bottom-aligned to their artwork. Hence
    `mt-auto`/`justify-end`, not fixed offsets.
  - **The rocket is the one image that stretches** (`lg:h-full object-cover`).
    Body copy doesn't scale with the grid — 14px stays 14px as columns narrow —
    so the column holding a paragraph *and* an image runs ~15px taller than the
    comp predicts. Pinning the rocket to its intrinsic ratio breaks the shared
    baseline; letting it fill keeps it locked. Safe to crop: the render sits in
    a wide margin of near-black.
  - **Heading boxes are widened past the comp's**: 60% vs the comp's 53.5% here,
    because Title Case ("End-to-End MVP") runs wider than the comp's lowercase
    and tips into a third line. Same reason the principles title gets the full
    45.9% column. Both restore the comp's line count.
  - The MVP-consulting graphic is white-ground **in the comp too** — it is meant
    to read as a light block on the dark band, not a broken asset.
- **Principles** (`940:8180`) is likewise exact: columns split `45.9%/54.1%`
  with no gutter, cards at `74.4%` of the right column alternately flush left
  and right (the comp's 238px offset), 14px card gap, 11px card padding, and a
  28.2% image tile. Measured within 1–2px of Figma at 1920.
- **`940:8180` is mislabeled "AI & data science"** in the Figma file; its content
  is Product Development throughout. So is `940:8507` (DevOps). Trust the
  content, never the layer name.

### DevOps Services (`940:8507`) — all 8 sections built

At 12,907px it is by far the largest comp — eight content sections against
Product Development's two, so it was built in three stages. Blocks, in page
order: `capabilityTabs`, `proof`, `industries`, `toolStack`, `whyUs`,
`engagementModels`, `challenges`, `deliveryProcess`.

**Draft copy.** The comp details only the *first* row/tab/step of every
interactive block, so the rest was written here to give each one minimal,
service-appropriate content (approved). Every such string is marked `[draft]` in
`service-detail-content.ts` — two whole capability tabs, five tool categories,
four engagement models, three process steps, and two accordion rows. **None of it
is client copy; it needs a review pass before launch.** The tool lists in
particular assert which tools the team uses.

**`Disclosure.tsx` is the shared accordion** behind `toolStack` and
`engagementModels` (`capabilityTabs` has its own, nested inside a tab panel).
It exists because this comp details only the *first* row of every accordion and
leaves the rest as bare labels, so one rule had to hold in three places: **a row
with no content renders inert, not as a dead toggle.** Two ARIA traps it now
handles, both of which shipped briefly and were caught by asserting that every
`aria-controls` resolves to a real element:
- a contentless row rendered as a button advertises `aria-expanded` on a control
  that toggles nothing;
- **a collapsed row's `aria-controls` dangles**, because the panel is only
  mounted while open. `aria-controls` is therefore set only while open —
  `aria-expanded` alone is a complete disclosure contract. Worth re-checking
  after any change here: the bug hides whenever the open-by-default row is the
  only one tested.

`deliveryProcess` follows the same "only once a second one exists" rule as the
tab bar: its rail stays static until a second step gains a `body`, since a lone
always-current button is a control that does nothing.

**Comp copy defects found so far** — all left as drawn rather than invented
around, each flagged inline in `service-detail-content.ts`:
- `industries` repeats the eyebrow **"Our Capabilities"** already used by
  `capabilityTabs`. Two identical eyebrows on one page reads as an oversight;
  this one probably wants "Industries We Serve".
- the `industries` intro names finance/healthcare/retail/manufacturing while its
  tiles list a different eight.
- the `toolStack` intro is **truncated mid-sentence**, ending on "and
  continuous". It needs a real ending.
- product names were corrected where the comp misspells them: "Docket SWARM" →
  Docker Swarm, "Open Shift" → OpenShift, "Open VZ" → OpenVZ. These are
  unambiguous typos of real products, not stylings.

**`industries` is a redesign, not the comp.** The comp centres eight
icon-over-label tiles in a tall grey field — loose objects on an empty ground,
a full screen of height to say eight nouns, and a visible void between two dark
bands. It now renders as **two columns of compact rows** (icon, label, one line
of substance) on a hairline grid, echoing this page's accordions. Approved.
- **The grid never drops to one column.** Eight rows of icon + label + sentence
  stacked singly is ~900px of phone scrolling, which is the one thing this
  layout must not do. It stays two-up at every width and sheds detail instead:
  descriptions are hidden below `sm`, where two columns leave each row far too
  narrow for a sentence. Measured: panel is 181px at 390px wide, 443px at 768.
- The eyebrow was "Our Capabilities" — the same one the capabilities section
  above already uses — and the intro named four industries that didn't match the
  eight tiles. Both rewritten.
- The eight descriptor lines are `[draft]` **capability claims**, not decoration.

**The capability-tab glyph is lucide, not the comp's raster.** The comp ships one
93x103 PNG and reuses it on all three tabs: soft on any retina display at that
size, and a single mark for three different services says nothing. It is deleted;
each tab now names a lucide key (`MessagesSquare` / `Workflow` / `ShieldCheck`),
sharp at any density. Same one-icon-family rule as the industries tiles.

**Tool logos.** Exported from the comp and, like the partner marks, they should
become official brand assets before launch. Two traps if they are ever
re-exported: the **Kubernetes** mark is two overlapping sibling vectors with no
wrapping group, so exporting the node alone yields a bare blue heptagon with no
helm wheel — it had to be composited from `940:8708` + `940:8709` at a (5,5)
Figma offset. And the **LXC** node is named "Podman-logo-orig 2" but its image
really is the LXC logo; trust the pixels, not the layer name.

**The comp was drawn from Appinventiv's DevOps page** and named that agency in a
section heading and a body paragraph. Both are rewritten to Adpedia (approved).
Two things this leaves open, both flagged in the content file:
- **The six stat figures are Appinventiv's**, not ours. UNVERIFIED — confirm
  with the client before launch.
- **The partner logos** (Google Cloud, Azure, AWS, Huawei) were exported from
  the comp. Replace with official brand assets and confirm we may display each
  mark. They render at the comp's per-logo dimensions rather than a shared box,
  because their aspect ratios run from 1.7:1 to 4.3:1 and a common box sizes
  them inconsistently.

Comp treatments normalised to the design system, as on every earlier page: the
tab bar's `rounded-full` pills and tray become sharp-cornered, and its drop
shadows become a hairline border plus a filled active state.

Two things worth knowing before continuing:
- **`capabilityTabs` renders its tab bar only when there is more than one tab.**
  The comp labels three ("DevOps consulting service", "DevOps professional
  services", "DevsecOps service") but writes the panel for only the first, and
  this repo does not invent copy. Adding the other two is a pure data change.
- **An accordion row with no `body` renders as a plain row, not a button.** Making
  it a button would put `aria-expanded` on a control that toggles nothing and an
  `aria-controls` pointing at an element that never exists. It becomes
  interactive by itself once the copy lands.

**Type note:** the comp's card titles cluster at 16/17/19/20px — four sizes for
one role, none on our scale, and all smaller than the 24px every other service
page uses. They are snapped to `subtitle` (18px) for dense accordion rows. Its
stat numerals are 63px; those use `display-lg` (64) rather than the bespoke 60px
in `home/Stats.tsx`, which the design system carries as file-scoped legacy debt
and forbids spreading. (`check:ds` scans comments too, so don't quote that value.)

## Adding a project

Everything lives in `src/lib/projects.ts` — no component changes needed. Categories
come from `src/lib/taxonomy.ts` (the 7 in the Figma filter row). Every case-study
field is optional and its block is skipped when absent, so a project can start thin
and be filled in later.

```ts
{
  slug: "acme-rebrand",          // URL segment — stable, it is the public link
  name: "Acme",                  // card headline
  type: "Website Design",        // card sub-line (free text)
  category: "web-development",   // drives the filter row only
  tags: ["UI Design", "SEO"],    // renders as "What we did"
  summary: "One or two lines.",  // card + hero + meta description
  thumb: { src: "/images/projects/acme.png", alt: "…" },
  featured: true,                // optional: show in the portfolio mega menu

  year: 2025, location: "UAE", duration: "12 weeks",   // meta strip, each optional
  narrative: [                                          // the write-up, in order
    { title: "Overview", body: ["Para one.", "Para two."] },
    { title: "The challenge", body: ["…"] },
  ],
  results: [{ value: "+38%", label: "Conversion rate" }],
  gallery: [
    { src: "…", alt: "…", caption: "Optional", span: "full" },  // full = full width
    { src: "…", alt: "…" },                                     // default = 2-up
  ],
  quote: { text: "…", author: "Name", role: "Title, Acme" },
  website: { label: "Visit site", href: "https://…" },
}
```

Images go in `public/images/projects/`. The card and hero use `thumb`; gallery
images are separate. Sitemap and `generateStaticParams` pick up new projects
automatically.

## Known issues / decisions

- **`backdrop-filter` breaks `position: fixed` descendants.** The `Header` gets
  `backdrop-blur-md` when scrolled, which makes it the containing block for any
  `fixed` child — so the `MobileMenu` overlay (rendered inside the header) pinned
  to the ~100px header instead of the viewport once scrolled, and the menu spilled
  over the page. Fix: the overlay is rendered through a `createPortal` to
  `document.body` so it escapes the filtered subtree. Any future full-screen
  overlay must portal out of the header for the same reason.
- **Push is blocked.** Remote `origin` = `git@github.com:AdpediaGitOfficial/adpedia-neo-uae.git`.
  This machine's SSH key is not registered on an account with write access
  (`Permission denied (publickey)`); HTTPS account `akash-adpedia` gets 403.
  All work is committed locally on `main`.
- **Bundle grew ~6 kB** (First Load JS 159 → 165 kB) — primitives pulled into client
  bundles by `"use client"` sections. Can be trimmed in Phase 6.
- **Left bespoke on purpose** (protects parity): stat number `text-[3.75rem]`,
  accordion row title `text-2xl sm:text-[2rem]`.
- **Home** and **`/contact`** exist. `/about`, `/portfolio`, `/services`, `/careers`,
  `/blog` resolve to the on-brand 404 until built from their Figma frames.
- Env: no `claude` CLI on PATH; `/Applications/XAMPP/bin/head` shadows GNU `head`
  (pipe to a file instead). Figma MCP `get_design_context`/`get_metadata` time out on
  this large file — use `get_screenshot` + `download_assets` instead.
- **Don't run `next build` and `next dev` against the same `.next`.** It corrupts the
  dev cache and throws bogus JSX syntax errors in untouched files
  (`Testimonials.tsx`, `Footer.tsx`). Fix: `rm -rf .next` and restart.
- **Next 15.5.20** (upgraded from 15.1.6 for the critical advisory). One moderate
  advisory remains — `postcss <8.5.10` pinned *inside* `node_modules/next`; our own
  postcss is 8.5.19 (patched) and npm's only "fix" is `next@9.3.3`, so it is not
  actionable. `next lint` is deprecated and goes away in Next 16.
- **Measuring pixel parity:** use the **offsetParent chain sum**
  (`while(n){t+=n.offsetTop;n=n.offsetParent}`), not `getBoundingClientRect`+`scrollY`
  and not raw `offsetTop` (relative to `offsetParent`, which moves). Expect ≤1px noise
  from integer rounding accumulating up the chain, and ignore `<br>` (zero-size,
  meaningless offsets).
- **The Browser pane cannot verify motion.** Its tab runs with
  `document.visibilityState === "hidden"`, so the browser suspends
  `requestAnimationFrame` **and `IntersectionObserver`**. Consequences, all of which
  look like site bugs but are not:
  - scroll reveals stay at `opacity: 0` forever (the IO callback never fires — even a
    hand-rolled observer gets no callback at all)
  - Lenis's rAF loop never runs, so scrolling appears frozen and `window.scrollTo`
    looks like a no-op
  - frame-timing scripts hang until the tool times out

  Check `document.visibilityState` **before** concluding anything about animation,
  scroll smoothness, or reveal timing. Static layout/DOM assertions are still valid;
  anything frame-driven must be judged in a real browser.
