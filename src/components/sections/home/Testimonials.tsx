"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X, Asterisk } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { Eyebrow, Heading, Subtitle } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import {
  testimonialsSection,
  featuredTestimonial,
  testimonials,
} from "@/lib/home-content";

function Attribution({ name, role, tone = "light" }: { name: string; role: string; tone?: "light" | "dark" }) {
  return (
    <p className={`mono-label flex items-center gap-2 ${tone === "light" ? "text-white/70" : "text-white/60"}`}>
      <span>{name}</span>
      <Asterisk className="h-3.5 w-3.5 text-accent-400" aria-hidden />
      <span className="text-white/45">{role}</span>
    </p>
  );
}

export function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModalOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modalOpen]);

  return (
    <Section container={false} aria-labelledby="testimonials-heading">
      <Container>
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <Eyebrow>{testimonialsSection.eyebrow}</Eyebrow>
          <Heading as="h2" id="testimonials-heading" size="md" balance={false}>
            {testimonialsSection.title}
          </Heading>
          <Subtitle className="max-w-xl">{testimonialsSection.subtitle}</Subtitle>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Featured video testimonial */}
          <Reveal>
            <figure className="group relative h-full min-h-[420px] overflow-hidden">
              <Parallax cover speed={0.06} className="absolute inset-0">
                <Image
                  src={featuredTestimonial.image}
                  alt={`Portrait of ${featuredTestimonial.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
              </Parallax>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

              <IconButton
                size="xl"
                variant="soft"
                label={featuredTestimonial.videoLabel}
                onClick={() => setModalOpen(true)}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out-expo hover:scale-110"
              >
                <Play className="h-6 w-6 translate-x-0.5 fill-current" aria-hidden />
              </IconButton>

              <figcaption className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <blockquote className="text-pretty text-lg font-light leading-snug text-white">
                  &ldquo;{featuredTestimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-5">
                  <Attribution name={featuredTestimonial.name.toUpperCase()} role={featuredTestimonial.role.toUpperCase()} />
                </div>
              </figcaption>
            </figure>
          </Reveal>

          {/* 2x2 grid of quotes */}
          <Stagger className="grid gap-6 sm:grid-cols-2" gap={0.08}>
            {testimonials.map((t) => (
              <StaggerItem key={t.name} className="h-full">
                <Card as="figure" padding="md" className="flex h-full flex-col">
                  <Image
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <blockquote className="mt-6 flex-1 text-body-sm leading-relaxed text-white/60">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <Attribution name={t.name.toUpperCase()} role={t.role.toUpperCase()} tone="dark" />
                  </figcaption>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>

      {/* Video modal */}
      <AnimatePresence>
        {modalOpen ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Testimonial from ${featuredTestimonial.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden border border-white/10 bg-ink-800"
            >
              <IconButton
                ref={closeRef}
                size="md"
                variant="scrim"
                label="Close testimonial"
                onClick={() => setModalOpen(false)}
                className="absolute right-3 top-3 z-10"
              >
                <X className="h-5 w-5" aria-hidden />
              </IconButton>
              {/* Poster + quote fallback (drop a videoUrl in content to enable playback) */}
              <div className="relative aspect-video w-full">
                <Image
                  src={featuredTestimonial.image}
                  alt={`Portrait of ${featuredTestimonial.name}`}
                  fill
                  sizes="768px"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-black/50" />
                <blockquote className="absolute inset-0 grid place-items-center p-8 text-center text-xl font-light leading-snug text-white sm:p-12 sm:text-2xl">
                  &ldquo;{featuredTestimonial.quote}&rdquo;
                </blockquote>
              </div>
              <div className="flex items-center justify-between p-5">
                <Attribution name={featuredTestimonial.name.toUpperCase()} role={featuredTestimonial.role.toUpperCase()} />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
