import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { StatsMarquee } from "./StatsMarquee";
import { aboutIntro } from "@/lib/about-content";

/** Stats ticker, team photo, then the studio statement and origin paragraph. */
export function AboutIntro() {
  return (
    <Section padded={false} innerClassName="pb-section" aria-labelledby="about-intro-heading">
      <StatsMarquee />

      {/* Rendered immediately (no Reveal) since it's the LCP image. */}
      <div className="relative mt-6 aspect-[1743/902] w-full overflow-hidden bg-ink-800">
        <Image
          src={aboutIntro.photo.src}
          alt={aboutIntro.photo.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1720px"
          className="object-cover"
        />
      </div>

      <div className="mt-20 flex flex-col items-center gap-8 text-center sm:mt-28">
        <Reveal>
          <Heading as="h2" id="about-intro-heading" size="lg" weight="light" className="max-w-4xl">
            {aboutIntro.statement}
          </Heading>
        </Reveal>
        <Reveal delay={0.05}>
          <Text size="body-sm" className="max-w-2xl">
            {aboutIntro.body}
          </Text>
        </Reveal>
      </div>
    </Section>
  );
}
