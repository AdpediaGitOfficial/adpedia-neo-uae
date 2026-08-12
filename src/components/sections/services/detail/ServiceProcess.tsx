import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text, Title } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-process-heading";

/**
 * The process band. Two layouts share one header and one data shape:
 *
 * - `cards` (UI/UX): a light band — a tall image beside a stack of numbered
 *   step cards. Each step is a light `Card` holding a grey inner panel. The
 *   comp separated these white-on-white cards with a soft drop shadow, but the
 *   design system separates surfaces with a hairline border, so they carry the
 *   `Card tone="light"` border every other light card uses instead.
 *
 * - `list` (Web Development): a dark band — a numbered vertical list, each row
 *   a step title (left) against a large ordinal (right), ruled between rows.
 *
 * Both number their steps 01, 02, 03… because the order is the process. The
 * ordinal is decorative (`aria-hidden`): the list already conveys order and the
 * step title is the heading, so voicing "01" before each title only adds noise.
 * The numeral follows the display scale (shrinking to `display-md` on mobile)
 * rather than the comp's raw 120px — the same reduction every other page made,
 * and identical across both process layouts.
 */
export function ServiceProcess({ detail }: { detail: ServiceDetail }) {
  const { process } = detail;
  if (!process) return null;

  // Only the numbered list sits on a dark surface; cards and grid are light.
  const surface = process.variant === "list" ? "dark" : "light";

  return (
    <Section tone={surface} aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <Heading as="h2" id={headingId} size="lg" weight="light" surface={surface} className="mt-5 max-w-3xl">
            {process.title}
          </Heading>
        </div>
        <Text size="body-sm" surface={surface} className="max-w-md lg:pb-2 lg:text-right">
          {process.intro}
        </Text>
      </div>

      {process.variant === "list" ? (
        <ProcessList process={process} />
      ) : process.variant === "grid" ? (
        <ProcessGrid process={process} />
      ) : (
        <ProcessCards process={process} />
      )}
    </Section>
  );
}

/** Numbered cards, two per row, on a light surface (accent numerals). */
function ProcessGrid({ process }: { process: NonNullable<ServiceDetail["process"]> }) {
  return (
    <Stagger as="ol" className="mt-14 grid list-none gap-6 lg:grid-cols-2">
      {process.steps.map((step, i) => (
        <StaggerItem as="li" key={step.title}>
          <Card tone="light" padding="lg" className="flex h-full items-start gap-5 sm:gap-8">
            <span
              aria-hidden
              className="shrink-0 text-display-md font-normal leading-none tabular-nums text-accent-600 sm:text-display-xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <Title as="h3" size="md" weight="medium" surface="light">
                {step.title}
              </Title>
              <Text size="body-sm" surface="light" className="mt-3">
                {step.body}
              </Text>
            </div>
          </Card>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Numbered vertical list on a dark surface — step title left, ordinal right. */
function ProcessList({ process }: { process: NonNullable<ServiceDetail["process"]> }) {
  return (
    <Stagger as="ol" className="mt-12 flex list-none flex-col">
      {process.steps.map((step, i) => (
        <StaggerItem as="li" key={step.title} className="border-t border-white/10">
          <div className="flex items-center justify-between gap-6 py-8 sm:gap-12 sm:py-10">
            <div className="min-w-0">
              <Title as="h3" size="lg" weight="normal">
                {step.title}
              </Title>
              {step.body ? (
                <Text size="body-sm" className="mt-3 max-w-xl">
                  {step.body}
                </Text>
              ) : null}
            </div>
            <span
              aria-hidden
              className="shrink-0 text-display-md font-normal leading-none tabular-nums text-white sm:text-display-xl"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Numbered step cards beside a tall image on a light surface. */
function ProcessCards({ process }: { process: NonNullable<ServiceDetail["process"]> }) {
  return (
    <div
      className={cn(
        "mt-14 grid gap-6",
        process.image && "lg:grid-cols-[545fr_1153fr] lg:items-start"
      )}
    >
      {process.image ? (
        <Reveal className="hidden lg:block">
          <div className="relative aspect-[545/890] w-full overflow-hidden bg-paper-200">
            <Image
              src={process.image.src}
              alt={process.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 545px"
              className="object-cover"
            />
          </div>
        </Reveal>
      ) : null}

      <Stagger as="ol" className="flex list-none flex-col gap-[22px]">
        {process.steps.map((step, i) => (
          <StaggerItem as="li" key={step.title}>
            {/* Mobile stacks the ordinal above the panel so the body gets the
                full width — the comp's side-by-side layout leaves a tall empty
                column beside the vertically-centred number and squeezes the copy
                into a narrow column on a phone. From `sm` up it restores the
                comp: big number left, panel right. */}
            <Card
              tone="light"
              padding="none"
              className="flex h-full flex-col gap-3 p-4 sm:flex-row sm:items-stretch sm:gap-8 sm:p-[23px]"
            >
              <span
                aria-hidden
                className="shrink-0 text-display-md font-normal leading-none tabular-nums text-ink sm:self-center sm:text-display-xl"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 bg-paper-200 p-5 sm:p-8">
                <Title as="h3" size="lg" weight="normal" surface="light">
                  {step.title}
                </Title>
                <Text size="body-sm" surface="light" className="mt-3 sm:mt-4">
                  {step.body}
                </Text>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
