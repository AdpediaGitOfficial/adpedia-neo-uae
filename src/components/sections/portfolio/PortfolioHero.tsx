import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/typography";
import { portfolioHero } from "@/lib/portfolio-content";

/**
 * Page opener: oversized lowercase wordmark left, intro set right and bottom
 * aligned to the heading — the same construction as the contact hero.
 */
export function PortfolioHero() {
  return (
    <Section
      padded={false}
      className="pt-[calc(var(--header-height)+2rem)]"
      innerClassName="pb-12 pt-14 sm:pt-20 lg:pt-28"
      aria-labelledby="portfolio-heading"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Heading as="h1" id="portfolio-heading" size="xl" weight="light" balance={false}>
          {portfolioHero.title}
        </Heading>
        <Text size="body-sm" className="max-w-xs lg:pb-3 lg:text-right">
          {portfolioHero.intro}
        </Text>
      </div>
    </Section>
  );
}
