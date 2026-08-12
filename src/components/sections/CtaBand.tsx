import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Heading, Subtitle } from "@/components/ui/typography";
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
    <Section
      className="relative overflow-hidden"
      container={false}
      aria-labelledby="cta-heading"
    >
      {/* soft indigo glow rising from the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(60%_100%_at_50%_100%,rgba(54,49,191,0.28),transparent_70%)]"
      />
      <Container className="relative text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <Heading as="h2" id="cta-heading" size="lg">
            {title}
          </Heading>
          <Subtitle className="max-w-xl">{subtitle}</Subtitle>
          <Button href={cta.href} size="lg" className="mt-2">
            {cta.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
