import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Title, Text } from "@/components/ui/typography";
import { projectHref, type Project } from "@/lib/projects";

/**
 * Grid card: inset image, then name + year on one row and type + location on
 * the next. Year and location are omitted when the project has no data for
 * them rather than rendering a placeholder.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      as={Link}
      href={projectHref(project.slug)}
      tone="dark"
      padding="none"
      className="group block transition-colors hover:border-white/25"
    >
      <div className="p-2.5">
        <div className="relative aspect-[3/2] overflow-hidden bg-ink">
          <Image
            src={project.thumb.src}
            alt={project.thumb.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="flex items-start justify-between gap-4 px-5 pb-6 pt-4">
        <div className="min-w-0">
          <Title as="h3" size="sm" weight="medium">
            {project.name}
          </Title>
          <Text size="body-sm" tone="muted" className="mt-2">
            {project.type}
          </Text>
        </div>

        {project.year || project.location ? (
          <div className="shrink-0 text-right">
            {project.year ? <Text size="body-sm">{project.year}</Text> : null}
            {project.location ? (
              <Text size="body-sm" className="mt-2">
                {project.location}
              </Text>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
}
