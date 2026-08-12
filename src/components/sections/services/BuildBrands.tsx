import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Heading, Title, Text } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { buildBrands } from "@/lib/services-content";

/**
 * Light band: heading and intro side by side, then the three-step process as
 * cards — image with the step name over it, copy in an inset panel beneath.
 */
export function BuildBrands() {
  return (
    <Section tone="light" aria-labelledby="build-brands-heading">
      <Reveal>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Heading
            as="h2"
            id="build-brands-heading"
            size="lg"
            weight="medium"
            surface="light"
            className="max-w-lg"
          >
            {buildBrands.title}
          </Heading>
          <Text size="body-sm" surface="light" className="max-w-md lg:pb-2 lg:text-right">
            {buildBrands.intro}
          </Text>
        </div>
      </Reveal>

      <Stagger className="mt-14 grid gap-6 lg:grid-cols-3">
        {buildBrands.steps.map((step) => (
          <StaggerItem key={step.id} className="h-full">
            <Card tone="light" padding="none" className="flex h-full flex-col p-5">
              <div className="relative aspect-[498/349] w-full overflow-hidden bg-ink-800">
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                {/* Frosted panel behind the label (Figma "Frame 572"): roughly
                    two-thirds the width and a quarter the height, centred. The
                    blur is what keeps the label readable over busy artwork, so
                    it replaces the flat scrim. */}
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-[26%] w-[68%] place-items-center border border-white/25 bg-white/10 backdrop-blur-md">
                    <Title as="h3" size="md" weight="normal">
                      {step.label}
                    </Title>
                  </span>
                </span>
              </div>

              <div className="mt-5 flex-1 bg-paper-200 p-6">
                <Text size="body-sm" surface="light" tone="secondary">
                  {step.body}
                </Text>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
