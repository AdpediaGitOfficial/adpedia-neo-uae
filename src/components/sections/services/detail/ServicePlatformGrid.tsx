import { Watch, Smartphone, Tv, Car, Tablet, Cpu, MonitorPlay, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-platform-grid-heading";

/**
 * The device platforms, as icon + label tiles inside one light panel.
 *
 * The comp draws each platform with a bespoke brand-device glyph (Wear OS,
 * Android Auto, …) built from masked vector groups. Those don't export as clean
 * assets and the project already standardises on lucide, so each maps to the
 * closest lucide device icon — recognisable and one icon family with the rest
 * of the site.
 */
const iconMap: Record<string, LucideIcon> = {
  Watch,
  Smartphone,
  Tv,
  Car,
  Tablet,
  Cpu,
  MonitorPlay,
};

export function ServicePlatformGrid({ detail }: { detail: ServiceDetail }) {
  const grid = detail.platformGrid;
  if (!grid) return null;

  return (
    <Section tone="light" aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{grid.eyebrow}</Eyebrow>
          <Heading as="h2" id={headingId} size="lg" weight="light" surface="light" className="mt-5 max-w-3xl">
            {grid.title}
          </Heading>
        </div>
        <Text size="body-sm" surface="light" className="max-w-md lg:pb-2 lg:text-right">
          {grid.intro}
        </Text>
      </div>

      <div className="mt-14 bg-paper-200 px-6 py-12 sm:px-10 sm:py-14">
        <Stagger as="ul" className="grid list-none grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
          {grid.items.map((item) => {
            const Icon = iconMap[item.icon] ?? Smartphone;
            return (
              <StaggerItem as="li" key={item.label} className="flex flex-col items-center gap-5 text-center">
                <Icon className="h-9 w-9 text-ink" aria-hidden strokeWidth={1.5} />
                <Text as="span" size="body" tone="primary" surface="light" className="max-w-[12rem] font-medium">
                  {item.label}
                </Text>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </Section>
  );
}
