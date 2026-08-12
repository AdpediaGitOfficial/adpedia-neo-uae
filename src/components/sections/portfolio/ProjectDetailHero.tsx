import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Heading, Label, Text } from "@/components/ui/typography";
import { projectDetail } from "@/lib/portfolio-content";
import type { Project } from "@/lib/projects";

/**
 * Case-study opener. Same construction as the contact and portfolio heroes —
 * oversized name on the left, supporting copy set right and bottom-aligned —
 * with a back link above it.
 */
export function ProjectDetailHero({ project }: { project: Project }) {
  return (
    <Section
      padded={false}
      className="pt-[calc(var(--header-height)+2rem)]"
      innerClassName="pb-12 pt-10 sm:pt-14 lg:pt-20"
      aria-labelledby="project-heading"
    >
      <Link
        href="/portfolio"
        className="group inline-flex items-center gap-2 text-white/45 transition-colors hover:text-white"
      >
        <ArrowLeft aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        <Label>{projectDetail.backToWork}</Label>
      </Link>

      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <Heading as="h1" id="project-heading" size="xl" weight="light" balance={false}>
          {project.name}
        </Heading>
        <Text size="body-sm" className="max-w-sm lg:pb-3 lg:text-right">
          {project.summary}
        </Text>
      </div>
    </Section>
  );
}
