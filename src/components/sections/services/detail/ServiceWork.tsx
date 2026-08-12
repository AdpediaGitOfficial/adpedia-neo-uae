import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/sections/portfolio/ProjectCard";
import { projects } from "@/lib/projects";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-work-heading";

/**
 * Closing proof: real work, two up, reusing the portfolio index card so the two
 * surfaces stay in sync and every card links to its case study.
 *
 * The comp fills this grid with two projects repeated twice; those are mockup
 * placeholders rather than a shortlist, so this renders the real project list
 * instead. New projects appear here automatically.
 */
export function ServiceWork({ detail }: { detail: ServiceDetail }) {
  const work = detail.work;
  if (!work || projects.length === 0) return null;

  return (
    <Section aria-labelledby={headingId}>
      <div className="flex flex-col items-center gap-5 text-center">
        <Eyebrow>{work.eyebrow}</Eyebrow>
        <Heading as="h2" id={headingId} size="lg" weight="light" className="max-w-3xl">
          {work.title}
        </Heading>
      </div>

      <Stagger as="ul" className="mt-14 grid list-none gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <StaggerItem as="li" key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
