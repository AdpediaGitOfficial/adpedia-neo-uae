import { LifeBuoy, Code2, Layers, type LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Heading, Text, Title } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-cards-heading";

/**
 * A light row of icon cards ("Our services"). The comp has no eyebrow here, so
 * neither does this. The comp separates the white cards with a soft shadow; per
 * the design system they carry the hairline `Card` border instead, and the
 * comp's masked illustration icons become accent lucide glyphs on a tinted tile
 * (one icon family with the rest of the site).
 */
const iconMap: Record<string, LucideIcon> = {
  LifeBuoy,
  Code2,
  Layers,
};

export function ServiceCards({ detail }: { detail: ServiceDetail }) {
  const section = detail.serviceCards;
  if (!section) return null;

  return (
    <Section tone="light" aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Heading as="h2" id={headingId} size="lg" weight="light" surface="light" className="max-w-3xl">
          {section.title}
        </Heading>
        <Text size="body-sm" surface="light" className="max-w-md lg:pb-2 lg:text-right">
          {section.intro}
        </Text>
      </div>

      <Stagger as="ul" className="mt-14 grid list-none gap-6 lg:grid-cols-3">
        {section.items.map((item) => {
          const Icon = iconMap[item.icon] ?? LifeBuoy;
          return (
            <StaggerItem as="li" key={item.title}>
              <Card tone="light" padding="lg" className="flex h-full items-start gap-5">
                <span className="grid size-14 shrink-0 place-items-center bg-accent-600/10 text-accent-600">
                  <Icon className="h-6 w-6" aria-hidden strokeWidth={1.5} />
                </span>
                <div>
                  <Title as="h3" size="md" weight="medium" surface="light">
                    {item.title}
                  </Title>
                  <Text size="body-sm" surface="light" className="mt-3">
                    {item.body}
                  </Text>
                </div>
              </Card>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
