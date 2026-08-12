import { Label, Text } from "@/components/ui/typography";
import { categoryLabel } from "@/lib/taxonomy";
import { projectDetail } from "@/lib/portfolio-content";
import type { Project } from "@/lib/projects";

/**
 * Fact strip under the hero image. Entries with no data are dropped rather than
 * rendered blank, so the legacy projects (no year/location yet) still look
 * deliberate.
 */
export function ProjectMeta({ project }: { project: Project }) {
  const entries = [
    { label: projectDetail.meta.category, value: categoryLabel(project.category) },
    { label: projectDetail.meta.type, value: project.type },
    { label: projectDetail.meta.year, value: project.year?.toString() },
    { label: projectDetail.meta.location, value: project.location },
    { label: projectDetail.meta.duration, value: project.duration },
  ].filter((entry): entry is { label: string; value: string } => Boolean(entry.value));

  return (
    <dl className="grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
      {entries.map((entry) => (
        <div key={entry.label}>
          <dt>
            <Label className="text-white/45">{entry.label}</Label>
          </dt>
          <dd className="mt-3">
            <Text size="body" tone="primary">
              {entry.value}
            </Text>
          </dd>
        </div>
      ))}
    </dl>
  );
}
