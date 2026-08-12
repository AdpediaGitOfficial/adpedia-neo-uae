"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Eyebrow, Heading, Subtitle, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { servicesSection, serviceItems } from "@/lib/home-content";
import { cn } from "@/lib/utils";

export function ServicesAccordion() {
  const [openId, setOpenId] = useState<string>(serviceItems[0].id);
  const reduce = useReducedMotion();

  return (
    <Section tone="light" aria-labelledby="services-heading">
      <Reveal className="flex flex-col items-center gap-5 text-center">
        <Eyebrow>{servicesSection.eyebrow}</Eyebrow>
        <Heading as="h2" id="services-heading" size="lg" weight="medium" surface="light" balance={false}>
          {servicesSection.title}
        </Heading>
        <Subtitle surface="light" className="max-w-xl">
          {servicesSection.subtitle}
        </Subtitle>
        <Button href={servicesSection.cta.href} size="lg" className="mt-2">
          {servicesSection.cta.label}
        </Button>
      </Reveal>

      <div className="mt-16">
        <ul className="border-t border-ink/10">
          {serviceItems.map((item, i) => {
            const isOpen = openId === item.id;
            const panelId = `service-panel-${item.id}`;
            const btnId = `service-btn-${item.id}`;
            return (
              <li key={item.id} className="border-b border-ink/10">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    // Only while the panel is mounted. `AnimatePresence` unmounts
                    // it when closed, so a permanent `aria-controls` points every
                    // collapsed row at an id that is not in the document —
                    // `aria-expanded` alone is a complete disclosure contract.
                    // Same fix as `services/detail/Disclosure.tsx`.
                    aria-controls={isOpen ? panelId : undefined}
                    onClick={() => setOpenId(isOpen ? "" : item.id)}
                    className="flex w-full items-center gap-6 py-7 text-left"
                  >
                    <span className="w-10 shrink-0 font-sans text-lg tabular-nums text-ink/60 sm:text-xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 font-sans text-2xl font-medium transition-colors sm:text-[2rem]",
                        isOpen ? "text-ink" : "text-ink/85"
                      )}
                    >
                      {item.title}
                    </span>
                    <span aria-hidden className="shrink-0 text-ink/60">
                      {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
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
                      <div className="pb-9 pl-0 sm:pl-16">
                        <div className="max-w-2xl">
                          <Text as="p" size="body" surface="light">
                            {item.body}
                          </Text>
                          <div className="mt-6 flex flex-wrap gap-3">
                            {item.tags.map((tag) => (
                              <Tag key={tag} tone="light" size="md">
                                {tag}
                              </Tag>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
