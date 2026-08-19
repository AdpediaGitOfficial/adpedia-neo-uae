import Image from "next/image";
import { Asterisk } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Eyebrow, Heading, Subtitle, Text } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
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
  return (
    <Section container={false} aria-labelledby="testimonials-heading">
      <Container>
        <Reveal className="flex flex-col items-center gap-5 text-center">
          <Eyebrow>{testimonialsSection.eyebrow}</Eyebrow>
          <Heading as="h2" id="testimonials-heading" size="lg" balance={false}>
            {testimonialsSection.title}
          </Heading>
          <Subtitle className="max-w-xl">{testimonialsSection.subtitle}</Subtitle>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {/* Featured testimonial.
              Below `sm` the quote is long enough (many wrapped lines at
              phone width) that overlaying it on the portrait — the
              treatment that works well from `sm` up, where there's room to
              wrap into just a few lines — would climb up over the subject's
              face. So on phones the photo and the quote split into two
              stacked panels instead: a full, unobscured portrait, then the
              quote on its own panel below in the same bg-ink-800 surface
              the other four testimonial cards use, so it still reads as
              part of the same family rather than a one-off treatment. */}
          <Reveal>
            <figure className="relative flex h-full flex-col overflow-hidden sm:min-h-[420px]">
              <div className="relative aspect-[4/5] w-full sm:absolute sm:inset-0 sm:aspect-auto sm:h-full">
                <Image
                  src={featuredTestimonial.image}
                  alt={`Portrait of ${featuredTestimonial.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 hidden bg-gradient-to-t from-black/85 via-black/25 to-black/10 sm:block"
                />
              </div>

              <figcaption className="border border-t-0 border-white/10 bg-ink-800 p-7 sm:absolute sm:inset-x-0 sm:bottom-0 sm:border-0 sm:bg-transparent sm:p-8">
                <blockquote
                  dir={featuredTestimonial.quoteDir}
                  className="whitespace-pre-line text-pretty text-base leading-relaxed text-white sm:text-lg sm:font-light sm:leading-snug"
                >
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
                  <div className="flex items-center gap-3">
                    <Image
                      src={t.avatar}
                      alt={`Portrait of ${t.name}`}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-full object-cover"
                    />
                    <Text as="span" size="body-sm" tone="primary">
                      {t.name}
                    </Text>
                  </div>
                  <blockquote className="mt-6 flex-1 text-body-sm leading-relaxed text-white/60">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6">
                    <p className="mono-label flex items-center gap-2 text-white/60">
                      <Asterisk className="h-3.5 w-3.5 text-accent-400" aria-hidden />
                      <span className="text-white/45">{t.role.toUpperCase()}</span>
                    </p>
                  </figcaption>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </Section>
  );
}
