import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Title, Text } from "@/components/ui/typography";
import { applyHref, jobsSection, type Job } from "@/lib/careers-content";

/** One label/value pair in the row. */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <Text as="div" size="body" surface="light" tone="primary" className="font-medium">
        {label}
      </Text>
      <Text as="div" size="body-sm" surface="light" tone="secondary" className="mt-3 truncate">
        {value}
      </Text>
    </div>
  );
}

/**
 * A single open role. Stacks on small screens and resolves to the comp's
 * single-line layout at lg, where the columns line up across every row.
 */
export function JobRow({ job }: { job: Job }) {
  const { labels } = jobsSection;

  return (
    <Card tone="light" padding="none" className="px-6 py-8 sm:px-10 lg:px-14">
      <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_1fr_1.5fr_0.9fr_auto] lg:gap-10">
        <div className="min-w-0">
          <Title as="h3" size="sm" weight="medium" surface="light" accent>
            {job.title}
          </Title>
          <Text as="div" size="body-sm" surface="light" tone="secondary" className="mt-3">
            {job.openings} {labels.openings}
          </Text>
        </div>

        <Field label={labels.experience} value={job.experience} />
        <Field label={labels.skills} value={job.skills} />
        <Field label={labels.location} value={job.location} />

        <Button href={applyHref(job)} size="md" className="justify-self-start lg:justify-self-end">
          {jobsSection.moreInfo}
        </Button>
      </div>
    </Card>
  );
}
