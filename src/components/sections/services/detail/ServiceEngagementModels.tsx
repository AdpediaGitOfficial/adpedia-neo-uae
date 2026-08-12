import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { DisclosureList, type DisclosureItem } from "./Disclosure";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-engagement-models-heading";

/**
 * "Flexible engagement models": an accordion on a dark band, each row a small
 * accent dot beside its label, the open one revealing a paragraph.
 *
 * Shares `DisclosureList` with the technology stack — same control, different
 * panel — including the rule that a model with no `body` renders inert rather
 * than as a dead toggle. The comp writes only the first of the five.
 */
export function ServiceEngagementModels({ detail }: { detail: ServiceDetail }) {
  const section = detail.engagementModels;
  if (!section) return null;

  const items: DisclosureItem[] = section.items.map((item) => ({
    id: item.label,
    label: item.label,
    content: item.body ? (
      <Text size="body-sm" className="max-w-5xl bg-ink p-6 sm:p-8">
        {item.body}
      </Text>
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
          idPrefix="engagement-model"
          dot
          className="border border-white/10 bg-ink-800 px-6 sm:px-10 lg:px-14"
        />
      </Reveal>
    </Section>
  );
}
