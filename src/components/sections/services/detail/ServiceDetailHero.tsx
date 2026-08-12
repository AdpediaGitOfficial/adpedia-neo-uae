import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceMedia } from "./ServiceMedia";
import { ServiceHeroSlats } from "./ServiceHeroSlats";
import type { ServiceDetail } from "@/lib/service-detail-content";

/**
 * Opener: kicker + display title with the intro set right, then the centred
 * statement and supporting paragraph. The comp is a clean black hero — no
 * framed media.
 *
 * When a service supplies a `hero.video` it plays full-bleed behind the title
 * as an ambient backdrop, scrimmed dark on the left (so the title stays
 * legible) and faded to pure black at the foot (so the statement below sits on
 * black), which is why the band reads as texture top-right rather than a video
 * pane. Services without a video get a plain black hero. Reduced-motion users
 * see the poster still, handled inside ServiceMedia.
 */
export function ServiceDetailHero({ detail }: { detail: ServiceDetail }) {
  return (
    <Section
      padded={false}
      container={false}
      className="relative isolate overflow-hidden pt-[calc(var(--header-height)+2rem)]"
      aria-labelledby="service-hero-heading"
    >
      {detail.hero.video ? (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[calc(var(--header-height)+1.5rem)] -z-10 aspect-video w-[80%] -translate-x-1/2 sm:w-[62%] lg:w-[50%]"
        >
          {/* Slightly knock the media back; the slat overlay's #252525 fill
              carries most of the muting, so this stays light. */}
          <div className="absolute inset-0 brightness-[.8] saturate-[.8]">
            <ServiceMedia
              image={{ src: detail.hero.src, alt: detail.hero.alt }}
              video={detail.hero.video}
              feather={false}
              sizes="100vw"
            />
          </div>
          {/* The exact Figma frosted-slat overlay, blurring the media into soft
              "equalizer" columns. */}
          <ServiceHeroSlats />
          {/* Vignette the effect into the centre with pure-black margins, so —
              as in the comp — the title (left) and intro (right) both sit on
              black; then fade to black at the foot for the statement. */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink from-[12%] via-ink/25 to-ink to-[88%]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />
        </div>
      ) : null}

      <Container className="relative pb-section pt-14 sm:pt-20 lg:pt-28">
        <Eyebrow>{detail.eyebrow}</Eyebrow>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <Heading as="h1" id="service-hero-heading" size="xl" weight="light" balance={false}>
            {detail.title}
          </Heading>
          <Text size="body-sm" className="max-w-sm lg:pt-2 lg:text-right">
            {detail.intro}
          </Text>
        </div>

        <div className="mt-28 flex flex-col items-center gap-8 text-center sm:mt-40 lg:mt-56">
          <Reveal>
            <Heading as="h2" size="sm" weight="light" className="max-w-5xl">
              {detail.statement}
            </Heading>
          </Reveal>
          <Reveal delay={0.05}>
            <Text size="body-sm" className="max-w-4xl">
              {detail.body}
            </Text>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
