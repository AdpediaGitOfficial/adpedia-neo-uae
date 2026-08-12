import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JobsBrowser } from "./JobsBrowser";
import { jobsSection } from "@/lib/careers-content";

/** The page's one light surface: open roles, filterable by discipline. */
export function JobsSection() {
  return (
    <Section tone="light" aria-labelledby="jobs-heading">
      <SectionHeading
        headingId="jobs-heading"
        eyebrow={jobsSection.eyebrow}
        title={jobsSection.title}
        subtitle={jobsSection.subtitle}
        tone="light"
        as="h2"
      />
      <div className="mt-14">
        <JobsBrowser />
      </div>
    </Section>
  );
}
