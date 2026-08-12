import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heading, Subtitle } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
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
        {/* Animated loop (1920x1080). `unoptimized` is required: the Next image
            optimizer would collapse an animated GIF to a single frame, and there
            is no reason to run a 44 MB file through sharp anyway. Aspect matches
            the asset (16:9) so it neither letterboxes nor crops. */}
        <div className="relative aspect-[16/9] w-full">
          <Image
            src="/videos/AI.gif"
            alt="Abstract neural wave animation representing AI-driven systems"
            fill
            unoptimized
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover"
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
