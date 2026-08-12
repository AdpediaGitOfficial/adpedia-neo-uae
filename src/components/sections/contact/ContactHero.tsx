import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/typography";
import { contactHero } from "@/lib/contact-content";

/**
 * Page opener: oversized wordmark-style heading on the left, with the intro
 * paragraph set right and bottom-aligned to the heading (matches the comp).
 * Uses its own top offset for the fixed header rather than `py-section`.
 */
export function ContactHero() {
  return (
    <Section
      padded={false}
      className="pt-[calc(var(--header-height)+2rem)]"
      innerClassName="pb-16 pt-14 sm:pt-20 lg:pt-28"
      aria-labelledby="contact-heading"
    >
      {/* Above the fold — rendered immediately, no reveal delay. */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Heading as="h1" id="contact-heading" size="xl" weight="light" balance={false}>
          {contactHero.title}
        </Heading>
        <Text size="body-sm" className="max-w-sm lg:pb-3 lg:text-right">
          {contactHero.intro}
        </Text>
      </div>
    </Section>
  );
}
