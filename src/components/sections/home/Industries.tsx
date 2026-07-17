import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesSection, industries } from "@/lib/home-content";
import { cn } from "@/lib/utils";

export function Industries() {
  return (
    <section className="bg-paper py-section text-ink" aria-labelledby="industries-heading">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={industriesSection.eyebrow}
            title={industriesSection.title}
            subtitle={industriesSection.subtitle}
            tone="light"
            face="display"
            as="h2"
          />
        </Reveal>

        <Stagger as="ul" className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6" gap={0.07}>
          {industries.map((industry) => (
            <StaggerItem
              as="li"
              key={industry.name}
              className={cn(
                "rounded-card border border-ink/[0.07] bg-white p-6",
                industry.wide ? "lg:col-span-3" : "lg:col-span-2"
              )}
            >
              <h3 className="flex items-center gap-2.5 text-xl font-medium">
                <span aria-hidden className="h-2 w-2 rounded-full bg-accent-600" />
                {industry.name}
              </h3>
              <div className="mt-5 rounded-lg bg-paper-200 p-5">
                <p className="text-sm leading-relaxed text-ink/60">{industry.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
