import { Target, BrainCircuit, Server, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text, Title } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-feature-cards-heading";

/** Icon-over-title feature cards, centred on a light band. */
const iconMap: Record<string, LucideIcon> = { Target, BrainCircuit, Server };

export function ServiceFeatureCards({ detail }: { detail: ServiceDetail }) {
  const section = detail.featureCards;
  if (!section) return null;

  return (
    <Section tone="light" aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <Heading as="h2" id={headingId} size="lg" weight="light" surface="light" className="mt-5 max-w-3xl">
            {section.title}
          </Heading>
        </div>
        <Text size="body-sm" surface="light" className="max-w-md lg:pb-2 lg:text-right">
          {section.intro}
        </Text>
      </div>

      <Stagger as="ul" className="mt-16 grid list-none gap-10 sm:grid-cols-3 sm:gap-8">
        {section.items.map((item) => {
          const Icon = iconMap[item.icon] ?? Target;
          return (
            <StaggerItem as="li" key={item.title} className="flex flex-col items-center gap-6 text-center">
              <span className="grid size-16 place-items-center bg-accent-600/10 text-accent-600">
                <Icon className="h-7 w-7" aria-hidden strokeWidth={1.5} />
              </span>
              <div>
                <Title as="h3" size="md" weight="medium" surface="light">
                  {item.title}
                </Title>
                <Text size="body-sm" surface="light" className="mx-auto mt-3 max-w-xs">
                  {item.body}
                </Text>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
