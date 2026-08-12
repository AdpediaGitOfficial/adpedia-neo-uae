import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Title, Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { FocusIcon, TransparencyIcon, QuickResultsIcon, PartnershipIcon } from "./icons";
import { whyHireUs, type AdvantageId } from "@/lib/about-content";

const icons: Record<AdvantageId, (props: { className?: string }) => React.JSX.Element> = {
  focus: FocusIcon,
  transparency: TransparencyIcon,
  "quick-results": QuickResultsIcon,
  partnership: PartnershipIcon,
};

/**
 * The one light-surface section on the page: heading, then a 2x2 grid of
 * advantages. Each card is a light panel with an accent mark and title, and the
 * body sits in an inset panel a shade darker — matching the comp.
 */
export function WhyHireUs() {
  return (
    <Section tone="light" aria-labelledby="why-hire-us-heading">
      <SectionHeading
        headingId="why-hire-us-heading"
        eyebrow={whyHireUs.eyebrow}
        title={whyHireUs.title}
        subtitle={whyHireUs.subtitle}
        tone="light"
        as="h2"
      />

      <Stagger className="mt-16 grid gap-6 lg:grid-cols-2">
        {whyHireUs.advantages.map((advantage) => {
          const Icon = icons[advantage.id];
          return (
            <StaggerItem key={advantage.id} className="h-full">
              <Card tone="light" padding="lg" className="flex h-full flex-col">
                <div className="flex items-center gap-4">
                  <Icon className="h-8 w-8 shrink-0 text-accent-600" />
                  <Title as="h3" size="md" weight="normal" surface="light">
                    {advantage.title}
                  </Title>
                </div>
                <div className="mt-8 flex-1 bg-paper-200 p-6">
                  <Text size="body-sm" surface="light" tone="secondary">
                    {advantage.body}
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
