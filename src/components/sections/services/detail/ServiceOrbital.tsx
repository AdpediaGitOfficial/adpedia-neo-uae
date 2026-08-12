import {
  Database,
  Code2,
  Sparkles,
  Gauge,
  Compass,
  BarChart3,
  BrainCircuit,
  type LucideIcon,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceMedia } from "./ServiceMedia";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-orbital-heading";

const iconMap: Record<string, LucideIcon> = {
  Database,
  Code2,
  Sparkles,
  Gauge,
  Compass,
  BarChart3,
  BrainCircuit,
};

/**
 * Node positions on the ring, clockwise from the top — center of each node as a
 * percentage of the square container. Eight points of an octagon at radius 36%
 * (cos/sin of 90°, 45°, 0°, −45° … pre-computed so the layout is static).
 */
const NODE_POS = [
  { left: 50, top: 14 },
  { left: 75.5, top: 24.5 },
  { left: 86, top: 50 },
  { left: 75.5, top: 75.5 },
  { left: 50, top: 86 },
  { left: 24.5, top: 75.5 },
  { left: 14, top: 50 },
  { left: 24.5, top: 24.5 },
];

/**
 * The "Build, Scale, and Optimise" band: eight service nodes ringed around a
 * central core (AI & Data Science). The ring is a desktop-only, absolutely
 * positioned octagon (a deliberate exception to the sharp-corner rule — the
 * comp's diagram is circular); below `lg` it collapses to a plain card grid so
 * the content still reflows.
 */
export function ServiceOrbital({ detail }: { detail: ServiceDetail }) {
  const orbital = detail.orbital;
  if (!orbital) return null;

  return (
    <Section aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{orbital.eyebrow}</Eyebrow>
          <Heading as="h2" id={headingId} size="lg" weight="light" className="mt-5 max-w-3xl">
            {orbital.title}
          </Heading>
        </div>
        <Text size="body-sm" className="max-w-md lg:pb-2 lg:text-right">
          {orbital.intro}
        </Text>
      </div>

      {/* Desktop: the orbital ring. */}
      <Reveal className="mt-16 hidden lg:block">
        <div className="relative mx-auto aspect-square w-full max-w-[60rem]">
          {/* ring the nodes sit on */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 aspect-square w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          />
          {/* central core */}
          <div className="absolute left-1/2 top-1/2 aspect-square w-[27%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-ink">
            {/* Circular mask, so no edge feather; small decorative element, so
                not an LCP priority image. */}
            <ServiceMedia
              image={{ src: orbital.core.src, alt: orbital.core.alt }}
              video={orbital.core.video}
              sizes="260px"
              feather={false}
              priority={false}
            />
          </div>
          {/* nodes */}
          {orbital.items.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Database;
            const pos = NODE_POS[i] ?? NODE_POS[0];
            return (
              <div
                key={`${item.label}-${i}`}
                className="absolute w-[24%] -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
              >
                <div className="flex aspect-square flex-col items-center justify-center gap-2.5 rounded-full border border-white/10 bg-ink-800 p-4 text-center">
                  <Icon className="h-6 w-6 text-accent-400" aria-hidden strokeWidth={1.5} />
                  <Text size="caption" tone="primary" className="font-medium leading-snug">
                    {item.label}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Mobile / tablet: a plain grid. */}
      <ul className="mt-12 grid list-none grid-cols-2 gap-4 lg:hidden">
        {orbital.items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Database;
          return (
            <li key={`${item.label}-${i}`}>
              <Card tone="raised" padding="md" className="flex h-full flex-col items-center gap-4 text-center">
                <Icon className="h-7 w-7 text-accent-400" aria-hidden strokeWidth={1.5} />
                <Text size="body-sm" tone="primary" className="font-medium">
                  {item.label}
                </Text>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
