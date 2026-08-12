import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heading, Text, Title } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-why-us-heading";

/**
 * "Choose Adpedia for DevOps Excellence": numbered reason cards on a light band,
 * then a metrics panel with its own CTA. The comp has no eyebrow here.
 *
 * The comp lays the five cards out 3-up then 2-up and overlaps each numeral onto
 * the top edge of its card — the numeral box genuinely intersects the card box in
 * the file, so the overlap is real rather than two adjacent frames misread. It is
 * reproduced with a negative margin, and only from `sm` up: on a phone the
 * numeral sits above the card, where an overlap would collide with the copy.
 *
 * Numerals use `display-xl` (the comp sets 77px) and the accent, matching the
 * numbered-card treatment already established by `ServiceProcess`.
 */
export function ServiceWhyUs({ detail }: { detail: ServiceDetail }) {
  const section = detail.whyUs;
  if (!section) return null;

  return (
    <Section tone="light" aria-labelledby={headingId}>
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <Heading as="h2" id={headingId} size="lg" weight="light" surface="light" className="max-w-4xl">
          {section.title}
        </Heading>
        <Text size="body-sm" surface="light" className="max-w-4xl">
          {section.intro}
        </Text>
      </Reveal>

      <Stagger as="ol" className="mt-16 grid list-none gap-x-6 gap-y-10 lg:grid-cols-3">
        {section.reasons.map((reason, i) => (
          <StaggerItem as="li" key={reason.title} className="flex flex-col">
            <span
              aria-hidden
              className="relative z-10 pl-6 text-display-md font-normal leading-none tabular-nums text-accent-600 sm:text-display-xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <Card
              tone="light"
              padding="lg"
              className="flex h-full flex-1 flex-col sm:-mt-5 sm:pt-10"
            >
              <Title as="h3" size="sm" weight="medium" surface="light">
                {reason.title}
              </Title>
              <Text size="body-sm" surface="light" className="mt-4">
                {reason.body}
              </Text>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-16">
        <div className="border border-ink/10 bg-ink px-8 py-14 text-white sm:px-14 lg:px-20">
          <Heading as="h3" size="sm" weight="light" className="mx-auto max-w-2xl text-center">
            {section.metrics.title}
          </Heading>

          <ul className="mx-auto mt-12 grid max-w-4xl list-none gap-10 text-center sm:grid-cols-3">
            {section.metrics.stats.map((stat) => (
              <li key={stat.label}>
                <p className="font-sans text-display-md font-light leading-none tracking-tight">
                  {stat.value}
                  <sup className="ml-1 align-super text-subtitle font-light">{stat.suffix}</sup>
                </p>
                <Text size="body-sm" className="mx-auto mt-4 max-w-[14rem]">
                  {stat.label}
                </Text>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center">
            <Button href={section.metrics.cta.href} size="lg">
              {section.metrics.cta.label}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
