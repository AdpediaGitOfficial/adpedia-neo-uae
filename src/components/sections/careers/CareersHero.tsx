import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/typography";
import { careersHero } from "@/lib/careers-content";

/**
 * Page opener — the construction shared with about, portfolio, and contact:
 * oversized wordmark left, intro set right and bottom-aligned — followed by the
 * full-width photograph.
 */
export function CareersHero() {
  return (
    <Section
      padded={false}
      className="pt-[calc(var(--header-height)+2rem)]"
      innerClassName="pb-16 pt-14 sm:pt-20 lg:pt-28"
      aria-labelledby="careers-heading"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Heading as="h1" id="careers-heading" size="xl" weight="light" balance={false}>
          {careersHero.title}
        </Heading>
        <Text size="body-sm" className="max-w-sm lg:pb-3 lg:text-right">
          {careersHero.intro}
        </Text>
      </div>

      {/* Rendered immediately (no Reveal) since it's the LCP image. */}
      <div className="relative mt-12 aspect-[1720/609] w-full overflow-hidden bg-ink-800">
        <Image
          src={careersHero.photo.src}
          alt={careersHero.photo.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1720px"
          className="object-cover"
        />
      </div>
    </Section>
  );
}
