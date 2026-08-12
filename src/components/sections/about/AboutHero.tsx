import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/typography";
import { aboutHero } from "@/lib/about-content";

/**
 * Page opener — same construction as the contact and portfolio heroes:
 * oversized lowercase wordmark left, intro set right and bottom-aligned.
 */
export function AboutHero() {
  return (
    <Section
      padded={false}
      className="pt-[calc(var(--header-height)+2rem)]"
      innerClassName="pb-10 pt-14 sm:pt-20 lg:pt-28"
      aria-labelledby="about-heading"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Heading as="h1" id="about-heading" size="xl" weight="light" balance={false}>
          {aboutHero.title}
        </Heading>
        <Text size="body-sm" className="max-w-xs lg:pb-3 lg:text-right">
          {aboutHero.intro}
        </Text>
      </div>
    </Section>
  );
}
