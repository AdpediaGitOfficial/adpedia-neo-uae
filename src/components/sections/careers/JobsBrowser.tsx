"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { TagButton } from "@/components/ui/Tag";
import { Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { JobRow } from "./JobRow";
import { jobCategories, jobs, jobsSection, type JobCategoryId } from "@/lib/careers-content";

/**
 * Filter row + role list.
 *
 * The filter is local state rather than a URL query on purpose. Reading the
 * query with `useSearchParams` opts the subtree out of prerendering, which
 * would leave the open roles out of the served HTML entirely — bad for a
 * careers page, where the listings are the content and there are no per-role
 * pages to carry them. As local state the default (unfiltered) list is
 * server-rendered, and filtering still works client-side. The trade is that a
 * filtered view is not shareable; nothing links to one.
 */
export function JobsBrowser() {
  const [filter, setFilter] = useState<JobCategoryId | undefined>(undefined);
  const visible = filter ? jobs.filter((job) => job.category === filter) : jobs;

  return (
    <>
      {/* One scrolling row below lg — wrapping orphans the star separators at
          the start of each line, where they read as bullets. */}
      <div
        role="group"
        aria-label="Filter roles by discipline"
        className="-mx-5 flex items-center gap-x-2 gap-y-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:flex-wrap lg:justify-center lg:overflow-x-visible lg:pb-0"
      >
        <TagButton
          variant="ghost"
          tone="light"
          size="md"
          active={!filter}
          onClick={() => setFilter(undefined)}
          className="shrink-0 whitespace-nowrap"
        >
          {jobsSection.allPositions}
        </TagButton>
        {jobCategories.map((category) => (
          <span key={category.id} className="flex shrink-0 items-center gap-x-2">
            <Star aria-hidden className="h-3 w-3 shrink-0 fill-current text-ink/45" />
            <TagButton
              variant="ghost"
              tone="light"
              size="md"
              active={filter === category.id}
              onClick={() => setFilter(category.id)}
              className="whitespace-nowrap"
            >
              {category.label}
            </TagButton>
          </span>
        ))}
      </div>

      {visible.length > 0 ? (
        <Stagger key={filter ?? "all"} className="mt-12 flex flex-col gap-5">
          {visible.map((job) => (
            <StaggerItem key={job.slug}>
              <JobRow job={job} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <Text surface="light" className="mt-12 text-center">
          {jobsSection.empty}
        </Text>
      )}
    </>
  );
}
