import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text, Title } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-mvp-bento-heading";

/**
 * The MVP services bento on a dark band, laid out exactly as the comp
 * (`940:8180`) draws it: a three-column masonry in two rows, where each
 * service's paragraph sits *beside* its artwork rather than under it.
 *
 * The percentages below are the comp's own geometry, normalised against its
 * 1718px content box — which is this site's 1720px content box, so they carry
 * over one-to-one:
 *
 * ```
 *              col 1 (34.69%)      col 2                col 3
 *   row 1   ┌ rocket ──────────┐ ┌ "MVP design" ────┐ ┌ ─────────────────┐
 *           │                  │ ├ web screens ─────┤ └ "MVP Web App" ───┘  ← bottom-aligned
 *           └──────────────────┘ └──────────────────┘
 *   row 2   ┌ phone ───────────┐ ┌ consulting ──────┐ ┌ ─────────────────┐
 *           └ "MVP Mobile App" ┘ └ (26.83%) ────────┘ └ "MVP consulting" ┘  ← bottom-aligned
 * ```
 *
 * Three alignments in the comp are load-bearing and are reproduced rather than
 * approximated: the rocket and the web screens **end on the same baseline**
 * (both bottom out at 3696 in the file); the phone and the consulting graphic
 * **start on the same one**; and the two right-hand paragraphs are bottom-, not
 * top-aligned to their neighbouring artwork. Hence `mt-auto` / `justify-end`
 * rather than fixed offsets — the images set their own heights from their
 * intrinsic aspect ratios, and the copy settles against them.
 *
 * The two rows carry different column templates because they genuinely differ
 * in the comp: the consulting graphic is 461 wide where the web screens are
 * 596, which pulls row 2's third column left. Column gaps are a percentage
 * (21/1718) so the whole grid stays proportional at any width.
 *
 * Below `lg` the grid unwinds to a single column. DOM order is
 * artwork-then-its-copy for all four services, so the stack reads as four
 * correct pairs without duplicating any markup.
 */

/**
 * Artwork renders at its intrinsic ratio — the uneven heights are the layout.
 *
 * `stretch` makes the piece fill its grid row instead, which is what keeps the
 * comp's rocket/web-screens shared baseline honest. Copy does not scale linearly
 * with the layout (14px body stays 14px as the grid narrows), so the column
 * holding a paragraph *and* an image is a little taller than the comp's
 * proportions predict. Pinning the rocket to its intrinsic ratio would leave it
 * ending short of the web screens by ~15px; letting it fill and crop keeps the
 * two bottoms locked together at any width. Safe to crop here — the render sits
 * in a wide margin of near-black.
 */
function Art({
  image,
  sizes,
  stretch = false,
}: {
  image: { src: string; alt: string; width: number; height: number };
  sizes: string;
  stretch?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden bg-ink-800", stretch && "lg:h-full")}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        className={cn("h-auto w-full", stretch && "lg:h-full lg:object-cover")}
      />
    </div>
  );
}

/**
 * `narrow` constrains the paragraph to the comp's 445px measure inside the
 * wider 596px columns; in the 445-wide third column the track already does it.
 */
function Copy({
  item,
  narrow = false,
}: {
  item: { title: string; body: string };
  narrow?: boolean;
}) {
  return (
    <>
      <Title as="h3" size="md" weight="normal">
        {item.title}
      </Title>
      <Text size="body-sm" className={cn("mt-4", narrow && "lg:max-w-[74.7%]")}>
        {item.body}
      </Text>
    </>
  );
}

const ART_SIZES = "(max-width: 1024px) 100vw, 35vw";
const ART_SIZES_NARROW = "(max-width: 1024px) 100vw, 27vw";

export function ServiceMvpBento({ detail }: { detail: ServiceDetail }) {
  const section = detail.mvpBento;
  if (!section) return null;

  // Fixed roles — this layout is specific to this comp, not a generic list.
  const [design, web, mobile, consulting] = section.items;
  if (!design || !web || !mobile || !consulting) return null;

  return (
    <Section aria-labelledby={headingId}>
      {/* The comp top-aligns the intro against the title, not the baseline. */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            id={headingId}
            size="lg"
            weight="light"
            /* The comp's title box is 918/1718 = 53.5%, but that was measured on
               its lowercase setting; Title Case ("End-to-End MVP") runs wider and
               tips into a third line. 60% restores the comp's two-line shape and
               still clears the intro, which starts at 70.6%. */
            className="mt-5 lg:max-w-[60%]"
          >
            {section.title}
          </Heading>
        </div>
        <Text size="body-sm" className="lg:max-w-[29.5%] lg:pt-16 lg:text-right">
          {section.intro}
        </Text>
      </div>

      {/* Row 1 — rocket | "MVP design" over web screens | "MVP Web Application" */}
      <div className="mt-14 flex flex-col gap-10 lg:mt-24 lg:grid lg:grid-cols-[34.69%_34.69%_25.9%] lg:gap-x-[1.222%]">
        <Reveal className="lg:h-full">
          <Art image={design.image} sizes={ART_SIZES} stretch />
        </Reveal>

        {/* Offsets are percentages of the column so they track the comp at any
            width — 33/596 and, in row 2, 40/596. */}
        <div className="flex flex-col gap-10 lg:gap-0 lg:pt-[5.54%]">
          <Reveal delay={0.05}>
            <Copy item={design} narrow />
          </Reveal>
          <Reveal delay={0.1} className="lg:mt-auto">
            <Art image={web.image} sizes={ART_SIZES} />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:flex lg:h-full lg:flex-col lg:justify-end">
          <Copy item={web} />
        </Reveal>
      </div>

      {/* Row 2 — phone over "MVP Mobile" | consulting art | "MVP consulting" */}
      <div className="mt-10 flex flex-col gap-10 lg:mt-[1.222%] lg:grid lg:grid-cols-[34.69%_26.83%_25.9%] lg:gap-x-[1.222%]">
        <div className="flex flex-col gap-10 lg:gap-0">
          <Reveal>
            <Art image={mobile.image} sizes={ART_SIZES} />
          </Reveal>
          <Reveal delay={0.05} className="lg:mt-[6.71%]">
            <Copy item={mobile} narrow />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Art image={consulting.image} sizes={ART_SIZES_NARROW} />
        </Reveal>

        <Reveal delay={0.15} className="lg:flex lg:h-full lg:flex-col lg:justify-end">
          <Copy item={consulting} />
        </Reveal>
      </div>
    </Section>
  );
}
