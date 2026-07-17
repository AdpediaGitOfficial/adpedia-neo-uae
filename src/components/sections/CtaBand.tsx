import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { closingCta } from "@/lib/home-content";

type CtaBandProps = {
  title?: React.ReactNode;
  subtitle?: string;
  cta?: { label: string; href: string };
};

/** Shared closing call-to-action band that precedes the footer on every page. */
export function CtaBand({
  title = (
    <>
      {closingCta.title[0]}
      <br />
      {closingCta.title[1]}
    </>
  ),
  subtitle = closingCta.subtitle,
  cta = closingCta.cta,
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* soft indigo glow rising from the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(54,49,191,0.28),transparent_70%)]"
      />
      <Container className="relative py-section text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <h2 className="text-balance font-sans text-display-md font-light text-white">{title}</h2>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-white/60">{subtitle}</p>
          <Button href={cta.href} size="lg" className="mt-2">
            {cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
