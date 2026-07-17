import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ClarityCards } from "./ClarityCards";
import { clarityContent } from "@/lib/home-content";

export function Clarity() {
  return (
    <section className="bg-ink py-section" aria-labelledby="clarity-heading">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal className="flex flex-col gap-8">
            <span className="eyebrow">{clarityContent.eyebrow}</span>
            <h2
              id="clarity-heading"
              className="text-pretty font-sans text-display-sm font-light leading-snug"
            >
              <span className="text-white">{clarityContent.leadStrong}</span>
              <span className="text-white/35">{clarityContent.leadMuted}</span>
            </h2>
            <div>
              <Button href={clarityContent.cta.href} size="lg">
                {clarityContent.cta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ClarityCards />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
