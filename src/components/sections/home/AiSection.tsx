import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Parallax } from "@/components/ui/Parallax";
import { aiContent } from "@/lib/home-content";

export function AiSection() {
  return (
    <section className="relative overflow-hidden bg-ink py-section" aria-labelledby="ai-heading">
      <Container className="relative flex flex-col items-center text-center">
        <Reveal className="flex flex-col items-center gap-5">
          <h2
            id="ai-heading"
            className="text-balance font-sans text-display-lg font-light text-white"
          >
            {aiContent.title}
          </h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-white/60">
            {aiContent.subtitle}
          </p>
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
      </Container>
    </section>
  );
}
