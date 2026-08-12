import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { servicesHero, servicesStatement } from "@/lib/services-content";

/**
 * Opener, inset hero image, then the positioning statement. Same hero
 * construction as the other top-level pages — wordmark left, intro set right.
 */
export function ServicesHero() {
  return (
    <Section
      padded={false}
      className="pt-[calc(var(--header-height)+2rem)]"
      innerClassName="pb-section pt-14 sm:pt-20 lg:pt-28"
      aria-labelledby="services-hero-heading"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Heading as="h1" id="services-hero-heading" size="xl" weight="light" balance={false}>
          {servicesHero.title}
        </Heading>
        <Text size="body-sm" className="max-w-sm lg:pb-3 lg:text-right">
          {servicesHero.intro}
        </Text>
      </div>

      {/* Inset rather than full-bleed, matching the comp. */}
      <Reveal className="mt-14">
        <div className="relative mx-auto aspect-[1086/585] w-full max-w-[68rem] overflow-hidden bg-ink-800">
          <Image
            src={servicesHero.photo.src}
            alt={servicesHero.photo.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1086px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <div className="mt-20 flex flex-col items-center gap-8 text-center sm:mt-28">
        <Reveal>
          <Heading as="h2" size="sm" weight="light" className="max-w-5xl">
            {servicesStatement.headline}
          </Heading>
        </Reveal>
        <Reveal delay={0.05}>
          <Text size="body-sm" className="max-w-4xl">
            {servicesStatement.body}
          </Text>
        </Reveal>
      </div>
    </Section>
  );
}
