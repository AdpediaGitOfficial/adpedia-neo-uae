import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heading, Subtitle } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceMedia } from "@/components/sections/services/detail/ServiceMedia";
import { aiContent } from "@/lib/home-content";

export function AiSection() {
  return (
    <Section
      className="relative overflow-hidden"
      innerClassName="relative flex flex-col items-center text-center"
      aria-labelledby="ai-heading"
    >
      <Reveal className="flex flex-col items-center gap-5">
        <Heading as="h2" id="ai-heading" size="lg">
          {aiContent.title}
        </Heading>
        <Subtitle className="max-w-xl">{aiContent.subtitle}</Subtitle>
      </Reveal>

      <Reveal delay={0.1} className="relative my-4 w-full max-w-4xl">
        {/* Same loop, now served as an MP4 (was a 43MB animated GIF) so the
            browser streams/decodes it instead of downloading the whole file
            as a still-image request. Aspect matches the asset (16:9) so it
            neither letterboxes nor crops. */}
        <div className="relative aspect-[16/9] w-full">
          <ServiceMedia
            image={{
              src: "/images/ai/ai-section-poster.jpg",
              alt: "Abstract neural wave animation representing AI-driven systems",
            }}
            video="/videos/ai-section.mp4"
            sizes="(max-width: 1024px) 100vw, 896px"
            feather={false}
            priority={false}
          />
        </div>
      </Reveal>

      <Reveal delay={0.15}>
        <Button href={aiContent.cta.href} size="lg">
          {aiContent.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}
