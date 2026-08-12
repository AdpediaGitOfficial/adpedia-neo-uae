import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Label, Text, Title } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-challenges-heading";

/**
 * "Simplifying DevOps with smart solutions": four challenge cards, two up, each
 * stating a problem and then its answer in an inset panel.
 *
 * The inset uses `paper-200` against the card's white, which is the comp's own
 * treatment and needs no normalising — the cards were already drawn sharp.
 */
export function ServiceChallenges({ detail }: { detail: ServiceDetail }) {
  const section = detail.challenges;
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
        <Text size="body-sm" surface="light" className="lg:max-w-[25%] lg:pt-16 lg:text-right">
          {section.intro}
        </Text>
      </div>

      <Stagger as="ul" className="mt-14 grid list-none gap-6 lg:grid-cols-2">
        {section.items.map((item) => (
          <StaggerItem as="li" key={item.title}>
            <Card tone="light" padding="none" className="flex h-full flex-col p-6 sm:p-10">
              <div className="flex items-center gap-3">
                <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-600" />
                <Title as="h3" size="sm" weight="semibold" surface="light">
                  {item.title}
                </Title>
              </div>
              <Text size="body-sm" surface="light" className="mt-4">
                {item.body}
              </Text>
              <div className="mt-8 flex-1 bg-paper-200 p-6 sm:p-8">
                <Label as="p" className="text-ink/45">
                  Solution
                </Label>
                <Text size="body-sm" surface="light" className="mt-4">
                  {item.solution}
                </Text>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
