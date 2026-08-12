import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { careersIntro } from "@/lib/careers-content";

/** Invitation heading on the left, studio background on the right. */
export function CareersIntro() {
  return (
    <Section padded={false} innerClassName="pb-section pt-4" aria-labelledby="careers-intro-heading">
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-24">
          <Heading as="h2" id="careers-intro-heading" size="lg" weight="light" className="max-w-xl">
            {careersIntro.title}
          </Heading>
          <Text size="body-sm" className="lg:pt-2">
            {careersIntro.body}
          </Text>
        </div>
      </Reveal>
    </Section>
  );
}
