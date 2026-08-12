import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heading, Text, Title } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-proof-heading";

/**
 * "Proven expertise. Measurable impact.": a centred heading over three stats,
 * a row of platform partner logos, and a closing CTA. The comp has no eyebrow
 * here, so neither does this.
 *
 * The stat numeral uses **`display-lg`** (64px against the comp's 63px). The
 * site's other stat treatment, `home/Stats.tsx`, sets a bespoke 60px arbitrary
 * size that the design system carries as *file-scoped* legacy debt and
 * explicitly forbids spreading — so this reaches for the nearest real token
 * instead of copying the exception. `check:ds` fails that value in a new file
 * (it scans comments too, so it is described here rather than quoted).
 *
 * The comp draws each stat as numeral → rule → label → body, which is the same
 * order `Stats.tsx` uses, so the two read as one family despite the different
 * numeral size.
 */
export function ServiceProof({ detail }: { detail: ServiceDetail }) {
  const section = detail.proof;
  if (!section) return null;

  return (
    <Section aria-labelledby={headingId}>
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <Heading as="h2" id={headingId} size="lg" weight="light" className="max-w-4xl">
          {section.title}
        </Heading>
        <Text size="body-sm" className="max-w-3xl">
          {section.intro}
        </Text>
      </Reveal>

      <Stagger as="ul" className="mt-16 grid list-none gap-12 lg:grid-cols-3 lg:gap-16">
        {section.stats.map((stat) => (
          <StaggerItem as="li" key={stat.label}>
            <p className="font-sans text-display-lg font-light leading-none tracking-tight text-white">
              {stat.value}
              <sup className="ml-1 align-super text-title font-light">{stat.suffix}</sup>
            </p>
            <hr className="my-7 border-white/10" />
            <Title as="h3" size="sm" weight="medium">
              {stat.label}
            </Title>
            <Text size="body-sm" className="mt-4">
              {stat.body}
            </Text>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-20">
        {/* Sized from the comp's per-logo dimensions rather than a shared box,
            so the marks stay optically balanced. Exported at 2x for retina. */}
        <ul className="flex list-none flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-20">
          {section.partners.map((partner) => (
            <li key={partner.src} className="shrink-0">
              <Image
                src={partner.src}
                alt={partner.alt}
                width={partner.width}
                height={partner.height}
                className="h-auto w-auto"
              />
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-16 flex justify-center">
        <Button href={section.cta.href} size="lg">
          {section.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
