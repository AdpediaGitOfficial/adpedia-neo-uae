"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { storiesSection, projectStories } from "@/lib/home-content";

export function Stories() {
  const trackRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="bg-ink py-section" aria-labelledby="stories-heading">
      <Container>
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">{storiesSection.eyebrow}</span>
            <h2 id="stories-heading" className="font-sans text-display-lg font-light text-white">
              {storiesSection.title}
            </h2>
            <p className="max-w-md text-pretty text-base leading-relaxed text-white/60">
              {storiesSection.subtitle}
            </p>
          </div>
          <Button href={storiesSection.cta.href} variant="primary" size="lg" className="self-start md:self-auto">
            {storiesSection.cta.label}
          </Button>
        </Reveal>
      </Container>

      <div className="mt-14">
        <Container>
          <ul
            ref={trackRef}
            className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projectStories.map((project) => (
              <li
                key={project.brand + project.title}
                data-card
                className="w-[min(90vw,880px)] shrink-0 snap-start"
              >
                <article className="grid gap-6 rounded-card border border-white/10 bg-ink-800 p-4 sm:grid-cols-[0.85fr_1.15fr] sm:p-5">
                  <div className="flex flex-col justify-center p-3 sm:p-5">
                    <p className="mono-label text-white/45">{project.brand}</p>
                    <h3 className="mt-4 font-sans text-2xl font-normal text-white">{project.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">{project.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-2.5">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-md border border-white/15 px-3 py-1.5 text-xs text-white/70"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-ink">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(max-width: 640px) 90vw, 500px"
                      className="object-cover"
                    />
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous projects"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/5"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next projects"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/5"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}
