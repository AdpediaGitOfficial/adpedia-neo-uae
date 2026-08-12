"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Tag } from "@/components/ui/Tag";
import { Eyebrow, Heading, Subtitle, Label, Title, Text } from "@/components/ui/typography";
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
    <Section container={false} aria-labelledby="stories-heading">
      <Container>
        <Reveal className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <Eyebrow>{storiesSection.eyebrow}</Eyebrow>
            <Heading as="h2" id="stories-heading" size="lg" balance={false}>
              {storiesSection.title}
            </Heading>
            <Subtitle className="max-w-md">{storiesSection.subtitle}</Subtitle>
          </div>
          <Button href={storiesSection.cta.href} size="lg" className="self-start md:self-auto">
            {storiesSection.cta.label}
          </Button>
        </Reveal>
      </Container>

      <div className="mt-14">
        <Container>
          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projectStories.map((project) => (
              <li key={project.brand + project.title} data-card className="w-[min(90vw,880px)] shrink-0 snap-start">
                <article className="grid gap-6 border border-white/10 bg-ink-800 p-4 sm:grid-cols-[0.85fr_1.15fr] sm:p-5">
                  <div className="flex flex-col justify-center p-3 sm:p-5">
                    <Label className="text-white/45">{project.brand}</Label>
                    <Title as="h3" size="md" weight="normal" className="mt-4">
                      {project.title}
                    </Title>
                    <Text className="mt-3">{project.body}</Text>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {project.tags.map((tag) => (
                        <Tag key={tag} size="sm">
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
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
            <IconButton size="lg" variant="outline" label="Previous projects" onClick={() => scrollBy(-1)}>
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </IconButton>
            <IconButton size="lg" variant="outline" label="Next projects" onClick={() => scrollBy(1)}>
              <ArrowRight className="h-5 w-5" aria-hidden />
            </IconButton>
          </div>
        </Container>
      </div>
    </Section>
  );
}
