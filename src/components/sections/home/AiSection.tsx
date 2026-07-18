import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heading, Subtitle } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
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
        <div className="relative aspect-[1920/900] w-full">
          <Parallax speed={0.06} className="absolute inset-0">
            <Image
              src="/images/ai/wave.png"
              alt="Abstract neural wave visualization representing AI-driven systems"
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-contain"
            />
          </Parallax>
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
