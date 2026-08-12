import { Database, MessageSquareText, PieChart, TrendingUp, ScanText, Eye, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-expertise-heading";

/** Applied-expertise chips (icon + label) on a dark band. */
const iconMap: Record<string, LucideIcon> = {
  Database,
  MessageSquareText,
  PieChart,
  TrendingUp,
  ScanText,
  Eye,
};

export function ServiceExpertise({ detail }: { detail: ServiceDetail }) {
  const section = detail.expertise;
  if (!section) return null;

  return (
    <Section aria-labelledby={headingId}>
      <Heading as="h2" id={headingId} size="lg" weight="light" className="mx-auto max-w-3xl text-center">
        {section.title}
      </Heading>

      <Stagger
        as="ul"
        className="mx-auto mt-12 grid max-w-4xl grid-cols-2 list-none gap-x-6 gap-y-12 sm:mt-16 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14"
      >
        {section.items.map((item) => {
          const Icon = iconMap[item.icon] ?? Database;
          return (
            <StaggerItem as="li" key={item.label} className="flex flex-col items-center gap-4 text-center">
              <Icon className="h-8 w-8 text-accent-400" aria-hidden strokeWidth={1.5} />
              <Text as="span" size="body" tone="primary" className="font-medium">
                {item.label}
              </Text>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
