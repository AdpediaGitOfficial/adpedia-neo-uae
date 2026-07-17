import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroMarquee } from "./HeroMarquee";
import { heroContent } from "@/lib/home-content";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-[calc(var(--header-height)+2rem)]">
      <Container className="flex flex-col items-center pb-16 pt-14 text-center sm:pt-20 lg:pt-28">
        <Reveal className="flex flex-col items-center gap-6">
          <h1 className="text-balance font-sans text-display-xl font-light tracking-tight text-white">
            {heroContent.title[0]}
            <br className="hidden sm:block" /> {heroContent.title[1]}
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            {heroContent.subtitle}
          </p>
          <Button href={heroContent.cta.href} size="lg" className="mt-2">
            {heroContent.cta.label}
          </Button>
        </Reveal>
      </Container>

      <div className="pb-16 sm:pb-24">
        <HeroMarquee />
      </div>
    </section>
  );
}
