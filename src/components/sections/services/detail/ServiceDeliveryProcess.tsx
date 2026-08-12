"use client";

import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text, Title } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-delivery-process-heading";
const panelId = "service-delivery-process-panel";

/**
 * "A structured approach to seamless DevOps delivery": the process steps run
 * down a rail on the left, with the selected step's detail set beside them.
 *
 * Only steps that actually carry a `body` are selectable, and — as with the
 * capability tabs — **the selector only becomes interactive once a second such
 * step exists.** The comp details just the first of the four, so today the list
 * renders as a static rail with that step highlighted and its detail shown.
 * Filling in the other bodies turns the rail into a working selector with no
 * change here; a lone always-current button would be a control that does
 * nothing.
 *
 * The active step is marked by an accent segment of the rail, which is how the
 * comp draws its progress indicator.
 */
export function ServiceDeliveryProcess({ detail }: { detail: ServiceDetail }) {
  const section = detail.deliveryProcess;
  const firstWithBody = section?.steps.findIndex((s) => s.body) ?? -1;
  const [activeIndex, setActiveIndex] = useState(Math.max(firstWithBody, 0));

  if (!section) return null;

  const selectableCount = section.steps.filter((s) => s.body).length;
  const interactive = selectableCount > 1;
  const active = section.steps[activeIndex] ?? section.steps[0];

  return (
    <Section aria-labelledby={headingId}>
      <Reveal className="flex flex-col items-center gap-6 text-center">
        <Eyebrow>{section.eyebrow}</Eyebrow>
        <Heading as="h2" id={headingId} size="lg" weight="light" className="max-w-4xl">
          {section.title}
        </Heading>
        <Text size="body-sm" className="max-w-4xl">
          {section.intro}
        </Text>
      </Reveal>

      <Reveal className="mt-16">
        <div className="grid gap-10 border border-white/10 bg-ink-800 p-8 sm:p-12 lg:grid-cols-[511fr_862fr] lg:gap-16 lg:p-16">
          <ol className="list-none">
            {section.steps.map((step, i) => {
              const isActive = i === activeIndex;
              const selectable = interactive && Boolean(step.body);
              const inner = (
                <Title
                  as="span"
                  size="sm"
                  weight="medium"
                  className={cn("block", isActive ? "text-white" : "text-white/45")}
                >
                  {step.title}
                </Title>
              );
              return (
                <li
                  key={step.title}
                  className={cn(
                    "border-l-2 py-5 pl-6 transition-colors",
                    isActive ? "border-accent-400" : "border-white/10"
                  )}
                >
                  {selectable ? (
                    <button
                      type="button"
                      aria-current={isActive}
                      aria-controls={panelId}
                      onClick={() => setActiveIndex(i)}
                      className="w-full text-left"
                    >
                      {inner}
                    </button>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ol>

          <div id={panelId} aria-live={interactive ? "polite" : undefined}>
            <Title as="h3" size="md" weight="normal">
              {active.title}
            </Title>
            {active.body ? (
              <Text size="body-sm" className="mt-6 max-w-3xl">
                {active.body}
              </Text>
            ) : null}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
