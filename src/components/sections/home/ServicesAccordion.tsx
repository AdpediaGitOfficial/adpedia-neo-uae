"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { servicesSection, serviceItems } from "@/lib/home-content";
import { cn } from "@/lib/utils";

export function ServicesAccordion() {
  const [openId, setOpenId] = useState<string>(serviceItems[0].id);
  const reduce = useReducedMotion();

  return (
    <section className="bg-paper py-section text-ink" aria-labelledby="services-heading">
      <Container>
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <span className="eyebrow">{servicesSection.eyebrow}</span>
          <h2 id="services-heading" className="font-display text-display-md font-medium text-ink">
            {servicesSection.title}
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-ink/60">
            {servicesSection.subtitle}
          </p>
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
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? "" : item.id)}
                      className="flex w-full items-center gap-6 py-7 text-left"
                    >
                      <span className="w-10 shrink-0 font-display text-lg tabular-nums text-ink/70 sm:text-xl">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 font-display text-2xl font-medium transition-colors sm:text-[2rem]",
                          isOpen ? "text-ink" : "text-ink/85"
                        )}
                      >
                        {item.title}
                      </span>
                      <span aria-hidden className="shrink-0 text-ink/70">
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
                        <div className="grid gap-8 pb-9 pl-0 sm:pl-16 lg:grid-cols-[1fr_auto] lg:items-end">
                          <div className="max-w-md">
                            <p className="text-base leading-relaxed text-ink/60">{item.body}</p>
                            <ul className="mt-6 flex flex-wrap gap-3">
                              {item.tags.map((tag) => (
                                <li
                                  key={tag}
                                  className="rounded-md border border-ink/15 px-3.5 py-1.5 text-sm text-ink/75"
                                >
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <ul className="flex gap-4">
                            {item.images.map((img) => (
                              <li
                                key={img.src + img.alt}
                                className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-ink-800"
                              >
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  sizes="112px"
                                  className="object-cover"
                                />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
