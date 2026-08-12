import { Section } from "@/components/ui/Section";
import { Title, Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { projectDetail } from "@/lib/portfolio-content";
import type { Project } from "@/lib/projects";

/** Headline numbers, separated by hairlines in the manner of the offices block. */
export function ProjectResults({ results }: { results: NonNullable<Project["results"]> }) {
  if (results.length === 0) return null;

  return (
    <Section padded={false} innerClassName="pb-section" aria-labelledby="project-results-heading">
      <Title
        as="h2"
        id="project-results-heading"
        size="lg"
        weight="light"
        className="uppercase tracking-spaced"
      >
        {projectDetail.results}
      </Title>

      <Stagger className="mt-10 grid gap-px border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((result) => (
          <StaggerItem key={result.label}>
            <div className="pt-8">
              <Title as="h3" size="lg" weight="light">
                {result.value}
              </Title>
              <Text size="body-sm" tone="muted" className="mt-3">
                {result.label}
              </Text>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
