"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  MessagesSquare,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text, Title } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-capability-tabs-heading";

/**
 * The comp ships one 93x103 raster glyph and reuses it on all three tabs. At
 * that size it is soft on any retina display, and a single mark for three
 * different services carries no meaning — so each tab gets its own lucide icon,
 * matching the one-icon-family rule used across the rest of the site.
 */
const iconMap: Record<string, LucideIcon> = { MessagesSquare, Workflow, ShieldCheck };

/**
 * "A complete suite of DevOps services": a tab bar over a panel that pairs an
 * illustrated summary card with a numbered accordion.
 *
 * Two comp treatments are deliberately normalised to the design system, the same
 * way every earlier page did it:
 * - the tab bar is drawn as `rounded-full` pills inside a `rounded-full` tray;
 *   here they are sharp-cornered, per "every box has border-radius: 0".
 * - the tray and the active pill carry soft drop shadows; here the active state
 *   is a filled surface and the tray a hairline border, per "borders, not
 *   shadows".
 *
 * Tab labels are sentence-case sans rather than the mono-uppercase this site uses
 * for most controls, and rows are numbered "01." at the title's own size — both
 * as the comp sets them.
 *
 * The tab bar renders **only when there is more than one tab**, which keeps the
 * section honest if it is ever reduced to a single panel. All three of the
 * comp's tabs now carry content, so it shows.
 */
export function ServiceCapabilityTabs({ detail }: { detail: ServiceDetail }) {
  const section = detail.capabilityTabs;
  const [activeTab, setActiveTab] = useState(0);
  // The comp shows the first row expanded and the rest collapsed.
  const [openRow, setOpenRow] = useState(0);
  const reduce = useReducedMotion();

  if (!section || section.tabs.length === 0) return null;

  const tab = section.tabs[Math.min(activeTab, section.tabs.length - 1)];
  const SummaryIcon = iconMap[tab.summary.icon] ?? MessagesSquare;
  const showTabBar = section.tabs.length > 1;

  return (
    <Section tone="light" aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{section.eyebrow}</Eyebrow>
          <Heading
            as="h2"
            id={headingId}
            size="lg"
            weight="light"
            surface="light"
            className="mt-5 max-w-3xl"
          >
            {section.title}
          </Heading>
        </div>
        <Text size="body-sm" surface="light" className="lg:max-w-[29.5%] lg:pt-16 lg:text-right">
          {section.intro}
        </Text>
      </div>

      <Reveal className="mt-14">
        <div className="border border-ink/10 bg-paper-200 p-4 sm:p-8 lg:p-12">
          {showTabBar ? (
            <div
              role="tablist"
              aria-label={section.title}
              className="mx-auto mb-10 flex w-full max-w-5xl flex-col gap-4 bg-white p-4 sm:flex-row"
            >
              {section.tabs.map((t, i) => (
                <button
                  key={t.label}
                  role="tab"
                  type="button"
                  id={`capability-tab-${i}`}
                  aria-selected={i === activeTab}
                  aria-controls="capability-panel"
                  onClick={() => {
                    setActiveTab(i);
                    setOpenRow(0);
                  }}
                  className={cn(
                    // Sentence-case sans, not the mono-uppercase used elsewhere
                    // for controls — the comp sets these as plain labels.
                    "flex-1 px-6 py-5 text-body font-medium transition-colors",
                    i === activeTab ? "bg-ink text-white" : "bg-paper-200 text-ink hover:bg-ink/5"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          ) : null}

          <div
            id="capability-panel"
            role={showTabBar ? "tabpanel" : undefined}
            aria-labelledby={showTabBar ? `capability-tab-${activeTab}` : undefined}
            className="grid gap-6 lg:grid-cols-[672fr_917fr] lg:gap-8"
          >
            {/* Summary card */}
            <article className="flex flex-col bg-ink p-8 text-white sm:p-10">
              <SummaryIcon
                className="h-12 w-12 shrink-0 text-accent-400"
                aria-hidden
                strokeWidth={1.5}
              />
              <Title as="h3" size="sm" weight="medium" className="mt-8">
                {tab.summary.title}
              </Title>
              <Text size="body-sm" className="mt-5">
                {tab.summary.body}
              </Text>
            </article>

            {/* Numbered accordion */}
            <ul className="list-none border-t border-ink/10 bg-white px-6 sm:px-10">
              {tab.items.map((item, i) => {
                const isOpen = openRow === i;
                const panelId = `capability-row-panel-${activeTab}-${i}`;
                const btnId = `capability-row-btn-${activeTab}-${i}`;
                // The comp only writes the body for the first row. A row with no
                // body is not collapsible, so it renders as a plain row — making
                // it a button would mean `aria-expanded` on a control that toggles
                // nothing and an `aria-controls` pointing at an element that never
                // exists. Adding the copy makes it interactive on its own.
                const rowInner = (
                  <>
                    {/* The comp numbers these "01." at the same size and weight
                        as the title, not as a small mono kicker. */}
                    <Title
                      as="span"
                      size="sm"
                      weight="medium"
                      surface="light"
                      className="flex flex-1 gap-3"
                    >
                      <span className="shrink-0 tabular-nums">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <span>{item.title}</span>
                    </Title>
                    {item.body ? (
                      <span aria-hidden className="shrink-0 text-ink/45">
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </span>
                    ) : null}
                  </>
                );
                return (
                  <li key={item.title} className={cn(i > 0 && "border-t border-ink/10")}>
                    <h4>
                      {item.body ? (
                        <button
                          id={btnId}
                          type="button"
                          aria-expanded={isOpen}
                          // Mounted only while open — see Disclosure.tsx; a fixed
                          // aria-controls dangles on every collapsed row.
                          aria-controls={isOpen ? panelId : undefined}
                          onClick={() => setOpenRow(isOpen ? -1 : i)}
                          className="flex w-full items-center gap-5 py-7 text-left"
                        >
                          {rowInner}
                        </button>
                      ) : (
                        <span className="flex w-full items-center gap-5 py-7 text-left">
                          {rowInner}
                        </span>
                      )}
                    </h4>

                    <AnimatePresence initial={false}>
                      {isOpen && item.body ? (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={btnId}
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <Text size="body-sm" surface="light" className="max-w-2xl pb-8 pl-10">
                            {item.body}
                          </Text>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
