import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { projectDetail } from "@/lib/portfolio-content";
import { relatedProjects } from "@/lib/projects";

/** Closing rail of other work, reusing the index card so the two stay in sync. */
export function RelatedProjects({ slug }: { slug: string }) {
  const related = relatedProjects(slug);
  if (related.length === 0) return null;

  return (
    <Section aria-labelledby="related-heading">
      <Title as="h2" id="related-heading" size="lg" weight="light" className="uppercase tracking-spaced">
        {projectDetail.related}
      </Title>
      <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
