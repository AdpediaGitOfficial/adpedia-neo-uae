import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { trustedLogos } from "@/lib/home-content";

export function TrustedLogos() {
  return (
    <section className="bg-ink py-16 sm:py-20" aria-labelledby="trusted-heading">
      <Container>
        <Reveal>
          <h2 id="trusted-heading" className="text-center text-base text-white/70">
            Trusted by many, and you
          </h2>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {trustedLogos.map((logo) => (
              <li
                key={logo.name}
                className="flex h-24 items-center justify-center rounded-card border border-white/[0.06] bg-ink-800"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={80}
                  className="h-auto max-h-12 w-auto max-w-[70%] object-contain opacity-80 transition-opacity hover:opacity-100"
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
