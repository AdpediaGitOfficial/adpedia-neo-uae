import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-principles-heading";

/**
 * "Why choose us" on a light band: the eyebrow/title/intro hold a left column,
 * and the principles cascade down the right as compact cards — an image tile
 * beside a paragraph.
 *
 * Two things the comp does that are easy to get wrong:
 *
 * 1. **The cards have no titles.** The paragraph is the entire card body. Adding
 *    a heading here would invent copy the comp doesn't have, so the data model
 *    carries none.
 * 2. **The stack is staggered, not flush.** Each card is narrower than its
 *    column and alternates which edge it hangs off — card 1 right, card 2 left,
 *    card 3 right, card 4 left — so the stack reads as a cascade rather than a
 *    list. That's a desktop-only flourish; below `lg` the cards go full width
 *    and stack straight, where the offset would just look like broken padding.
 *
 * Every proportion below is the comp's own geometry (`940:8180`), normalised
 * against its 1718px content box — which is this site's 1720px box, so the
 * percentages carry over directly:
 *
 * - columns split 789/930 → **45.9% / 54.1%**, no gutter between them
 * - cards are 692 of the right column's 930 → **74.4%**, alternately flush
 *   left and flush right (930 − 692 = the 238px offset the comp draws)
 * - inside a card: 11px padding, a 189×142 tile (**28.2%** of the inner width),
 *   a 21px gap, then the paragraph, vertically centred
 * - cards sit on a 178px pitch at 164 tall → a **14px** gap
 *
 * The image tiles are dark renders on black, so they keep an `ink-800` ground
 * rather than the card's white — that contrast is the point of the treatment.
 */
export function ServicePrinciples({ detail }: { detail: ServiceDetail }) {
  const section = detail.principles;
  if (!section) return null;

  return (
    <Section tone="light" aria-labelledby={headingId}>
      <div className="grid gap-12 lg:grid-cols-[45.9%_54.1%] lg:gap-0">
        <div>
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <Heading as="h2" id={headingId} size="lg" weight="light" surface="light" className="mt-5">
            {section.title}
          </Heading>
          {/* The comp drops 66px between the title and the intro (66/789). */}
          <Text size="body-sm" surface="light" className="mt-8 lg:mt-[8.4%] lg:max-w-[84.8%]">
            {section.intro}
          </Text>
        </div>

        {/* The card stack starts level with the title, not the eyebrow (44.5/930). */}
        <Stagger as="ul" className="flex list-none flex-col gap-6 lg:gap-3.5 lg:pt-[4.78%]">
          {section.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.body}
              className={cn("lg:w-[74.4%]", i % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto")}
            >
              <Card
                tone="light"
                padding="none"
                className="flex h-full items-center gap-5 p-4 lg:gap-[3.1%] lg:p-[11px]"
              >
                <div className="relative aspect-[189/142] w-[34%] shrink-0 overflow-hidden bg-ink-800 lg:w-[28.2%]">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(max-width: 1024px) 34vw, 190px"
                    className="object-cover"
                  />
                </div>
                <Text size="body-sm" surface="light" className="flex-1">
                  {item.body}
                </Text>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
