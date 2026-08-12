import {
  HeartPulse,
  ShoppingCart,
  Landmark,
  GraduationCap,
  Truck,
  Banknote,
  Car,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-industries-heading";

/**
 * Industries served: two columns of compact rows inside one light panel, each
 * an icon beside a label and a line of substance.
 *
 * The comp centres eight icon-over-label tiles in a tall grey field. That reads
 * as loose objects on an empty ground, spends a full screen of height to say
 * eight nouns, and — sitting between two dark technical bands — leaves a visible
 * void mid-page. Rows on a hairline grid give the panel structure, cut roughly a
 * third of its height, and let each industry carry a claim. The treatment
 * deliberately echoes the accordions elsewhere on this page so the section reads
 * as part of the same page rather than a borrowed component.
 *
 * **The grid never drops to one column.** Eight rows of icon + label + sentence
 * stacked singly is ~900px of scrolling on a phone, which is the one thing this
 * layout must not do. Instead it stays two-up at every width and sheds detail
 * as it narrows: below `sm` the descriptions are hidden — two columns on a phone
 * leaves each row far too narrow for a sentence — so phones get a scannable list
 * of the eight industries and the substance appears from tablet up.
 *
 * The comp draws each industry as a small raster glyph; per the convention every
 * earlier page followed, those become lucide icons — one icon family across the
 * site, and eight fewer brittle exports to keep in sync.
 */
const iconMap: Record<string, LucideIcon> = {
  HeartPulse,
  ShoppingCart,
  Landmark,
  GraduationCap,
  Truck,
  Banknote,
  Car,
  Sprout,
};

export function ServiceIndustries({ detail }: { detail: ServiceDetail }) {
  const section = detail.industries;
  if (!section) return null;

  return (
    <Section tone="light" aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            id={headingId}
            size="lg"
            weight="light"
            surface="light"
            className="mt-5 max-w-3xl"
          >
            {section.title}
          </Heading>
        </div>
        <Text size="body-sm" surface="light" className="lg:max-w-[29.5%] lg:pt-16 lg:text-right">
          {section.intro}
        </Text>
      </div>

      <Stagger
        as="ul"
        className="mt-10 grid list-none grid-cols-2 gap-x-3.5 border border-ink/10 bg-paper-200 px-4 sm:mt-14 sm:gap-x-8 sm:px-6 lg:gap-x-16 lg:px-11"
      >
        {section.items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Landmark;
          // Two columns at every width, so the final row is always the last two
          // items — they carry no rule, which keeps the panel's inner edge clean.
          const hasRule = i < section.items.length - 2;
          return (
            <StaggerItem
              as="li"
              key={item.label}
              className={cn(
                "flex items-center gap-2.5 py-3 sm:items-start sm:gap-3.5 sm:py-4 lg:gap-5 lg:py-6",
                hasRule && "border-b border-ink/10"
              )}
            >
              <Icon
                className="h-5 w-5 shrink-0 text-accent-600 sm:mt-0.5 lg:h-6 lg:w-6"
                aria-hidden
                strokeWidth={1.5}
              />
              <div>
                {/* Token sizes on a raw element rather than `Title`: the label
                    steps 14 → 16 → 18 across breakpoints, and passing a second
                    text size through `Title`'s className would ship both — `cn`
                    has no tailwind-merge, so CSS order would decide the winner.
                    Same reason `ServiceProcess` sets its numeral this way. */}
                <h3 className="font-sans text-body-sm font-medium leading-tight text-ink sm:text-body lg:text-subtitle">
                  {item.label}
                </h3>
                {item.body ? (
                  <Text
                    size="body-sm"
                    surface="light"
                    className="mt-1.5 hidden max-w-[34ch] sm:block"
                  >
                    {item.body}
                  </Text>
                ) : null}
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
