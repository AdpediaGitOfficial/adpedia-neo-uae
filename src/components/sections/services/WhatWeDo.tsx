"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Title, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { whatWeDo } from "@/lib/services-content";
import { serviceItems } from "@/lib/home-content";
import { cn } from "@/lib/utils";

/**
 * The services list as the comp draws it on /services: a dark section with the
 * eyebrow set left, the list in the middle, and a single image on the right.
 *
 * Deliberately not the home accordion — that one is a light, numbered list with
 * tags and a three-image strip per service. Same underlying `serviceItems`
 * data, different presentation.
 */
export function WhatWeDo() {
  const [activeId, setActiveId] = useState(serviceItems[0].id);
  const activeImage = whatWeDo.images[activeId] ?? whatWeDo.fallbackImage;

  return (
    <Section aria-labelledby="what-we-do-heading">
      <Reveal>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <Heading as="h2" id="what-we-do-heading" size="lg" weight="light" className="max-w-xl">
            {whatWeDo.title}
          </Heading>
          <Text size="body-sm" className="max-w-sm lg:pt-3 lg:text-right">
            {whatWeDo.intro}
          </Text>
        </div>
      </Reveal>

      <div className="mt-20 grid gap-12 lg:grid-cols-[0.5fr_1.3fr_1fr] lg:gap-10">
        <Eyebrow>{whatWeDo.eyebrow}</Eyebrow>

        <ul className="flex flex-col gap-8">
          {serviceItems.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActiveId(item.id)}
                  className="group block w-full text-left"
                >
                  <span className="flex items-center gap-4">
                    <ArrowRight
                      aria-hidden
                      className={cn(
                        "h-5 w-5 shrink-0 text-accent-400 transition-all duration-300 ease-out-expo",
                        isActive ? "opacity-100" : "-ml-9 opacity-0"
                      )}
                    />
                    <Title
                      as="h3"
                      size="md"
                      weight="normal"
                      className={cn(
                        "transition-colors",
                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                      )}
                    >
                      {item.title}
                    </Title>
                  </span>
                </button>

                {isActive ? (
                  <Text size="body-sm" className="mt-5 max-w-lg">
                    {item.body}
                  </Text>
                ) : null}
              </li>
            );
          })}
        </ul>

        <Reveal className="hidden lg:block">
          <div className="relative aspect-[556/682] w-full overflow-hidden bg-ink-800">
            {/* `key` remounts on service change so a fresh element fades in over
                the previous one — a plain `src` swap would pop. */}
            <Image
              key={activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              sizes="556px"
              className="animate-fade-in object-cover motion-reduce:animate-none"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
