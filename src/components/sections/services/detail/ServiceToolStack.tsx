import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { DisclosureList, type DisclosureItem } from "./Disclosure";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-tool-stack-heading";

/**
 * The DevOps technology stack: an accordion of tool categories on a dark band,
 * the open one revealing a grid of logo + name chips.
 *
 * The disclosure behaviour — including the rule that a category with no tools
 * renders inert rather than as a dead toggle — lives in `DisclosureList`, shared
 * with the engagement models below.
 *
 * The comp draws the chips as rounded cards with shadows; here they are
 * sharp-cornered raised surfaces with hairline borders, per the design system.
 */
export function ServiceToolStack({ detail }: { detail: ServiceDetail }) {
  const section = detail.toolStack;
  if (!section) return null;

  const items: DisclosureItem[] = section.categories.map((category) => ({
    id: category.label,
    label: category.label,
    content: category.tools ? (
      <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {category.tools.map((tool) => (
          // Only the containerisation tools shipped marks in the comp; the rest
          // render as name-only chips rather than holding the section back for
          // artwork. The row keeps its height either way so the grid stays even.
          <li
            key={tool.name}
            className="flex min-h-[72px] items-center gap-4 border border-white/10 bg-ink px-5 py-4"
          >
            {tool.logo ? (
              <span className="relative h-10 w-10 shrink-0">
                <Image
                  src={tool.logo.src}
                  alt={tool.logo.alt}
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </span>
            ) : null}
            <Text size="body-sm" tone="primary" className="truncate">
              {tool.name}
            </Text>
          </li>
        ))}
      </ul>
    ) : undefined,
  }));

  return (
    <Section aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <Heading as="h2" id={headingId} size="lg" weight="light" className="mt-5 max-w-3xl">
            {section.title}
          </Heading>
        </div>
        <Text size="body-sm" className="lg:max-w-[29.5%] lg:pt-16 lg:text-right">
          {section.intro}
        </Text>
      </div>

      <Reveal className="mt-14">
        <DisclosureList
          items={items}
          idPrefix="tool-category"
          className="border border-white/10 bg-ink-800 px-6 sm:px-10 lg:px-14"
        />
      </Reveal>
    </Section>
  );
}
