import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { trustedLogos } from "@/lib/home-content";

export function TrustedLogos() {
  // Repeat enough times that one half of the track always exceeds the viewport,
  // so the -50% loop is seamless (no gap) on wide screens.
  const items = [...trustedLogos, ...trustedLogos, ...trustedLogos, ...trustedLogos];

  return (
    <Section
      padded={false}
      container={false}
      className="pt-16 pb-28 sm:pt-20 sm:pb-36"
      aria-labelledby="trusted-heading"
    >
      <Container>
        <Reveal>
          <h2 id="trusted-heading" className="text-center text-subtitle text-white">
            Trusted by many, and you
          </h2>
        </Reveal>
      </Container>

      <div className="pause-on-hover marquee-mask-wide relative mt-10 w-full overflow-hidden">
        <ul
          data-marquee
          className="animate-marquee flex w-max items-stretch gap-3 [animation-direction:reverse]"
          style={{ ["--marquee-duration" as string]: "19s" }}
        >
          {items.map((logo, i) => (
            <li
              key={`${logo.name}-${i}`}
              aria-hidden={i >= trustedLogos.length}
              className="flex h-24 w-[clamp(150px,15vw,200px)] shrink-0 items-center justify-center border border-white/10 bg-ink-800"
            >
              <Image
                src={logo.src}
                alt={i < trustedLogos.length ? logo.name : ""}
                width={200}
                height={80}
                className="h-auto max-h-16 w-auto max-w-[84%] object-contain opacity-80 transition-opacity hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
