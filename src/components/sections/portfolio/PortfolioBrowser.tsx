"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { TagButton } from "@/components/ui/Tag";
import { Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProjectCard } from "./ProjectCard";
import { PROJECTS_PER_PAGE, projectCategories, projects } from "@/lib/projects";
import { categories, isCategoryId } from "@/lib/taxonomy";
import { portfolioLabels } from "@/lib/portfolio-content";
import type { CategoryId } from "@/lib/taxonomy";

/**
 * Filter row + grid + pagination.
 *
 * State is local, not `useSearchParams`. Reading the query with that hook opts
 * the subtree out of prerendering, which left every project card out of the
 * served HTML — a crawler without JavaScript saw no work at all on the page
 * that exists to show it.
 *
 * Deep links still work: the query is read once on mount and applied, and every
 * change is pushed back with `replaceState`, so a filtered view stays
 * shareable. The difference is that the unfiltered grid is now server-rendered
 * and the query only refines it.
 */
export function PortfolioBrowser() {
  const [filter, setFilter] = useState<CategoryId | undefined>(undefined);
  const [page, setPage] = useState(1);

  // Apply ?filter= / ?page= from the URL after hydration, so the mega menu's
  // /portfolio?filter=brand-design links land on the right view.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("filter") ?? undefined;
    if (isCategoryId(raw)) setFilter(raw);
    const requested = Number.parseInt(params.get("page") ?? "1", 10);
    if (Number.isFinite(requested) && requested > 1) setPage(requested);
  }, []);

  const syncUrl = (next?: CategoryId, nextPage = 1) => {
    const params = new URLSearchParams();
    if (next) params.set("filter", next);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    window.history.replaceState(null, "", query ? `/portfolio?${query}` : "/portfolio");
  };

  const chooseFilter = (next?: CategoryId) => {
    setFilter(next);
    setPage(1);
    syncUrl(next, 1);
  };

  const choosePage = (next: number) => {
    setPage(next);
    syncUrl(filter, next);
  };

  const visible = filter ? projects.filter((p) => projectCategories(p).includes(filter)) : projects;
  const pageCount = Math.max(1, Math.ceil(visible.length / PROJECTS_PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * PROJECTS_PER_PAGE;
  const pageItems = visible.slice(start, start + PROJECTS_PER_PAGE);

  return (
    <>
      {/* One scrolling row on small screens — wrapping orphans the ★ separators
          at the start of each line, where they read as bullets. */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="-mx-5 flex items-center gap-x-2 gap-y-3 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0 lg:flex-wrap lg:overflow-x-visible lg:pb-0"
      >
        <TagButton
          variant="ghost"
          size="md"
          active={!filter}
          onClick={() => chooseFilter(undefined)}
          className="shrink-0 whitespace-nowrap"
        >
          {portfolioLabels.allProjects}
        </TagButton>
        {categories.map((category) => (
          <span key={category.id} className="flex shrink-0 items-center gap-x-2">
            <Star aria-hidden className="h-3 w-3 shrink-0 fill-current text-white/45" />
            <TagButton
              variant="ghost"
              size="md"
              active={filter === category.id}
              onClick={() => chooseFilter(category.id)}
              className="whitespace-nowrap"
            >
              {category.label}
            </TagButton>
          </span>
        ))}
      </div>

      {pageItems.length > 0 ? (
        <Stagger key={`${filter ?? "all"}-${current}`} className="mt-10 grid gap-4 lg:grid-cols-2">
          {pageItems.map((project) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <Text className="mt-10">{portfolioLabels.empty}</Text>
      )}

      {pageCount > 1 ? (
        <nav aria-label="Pagination" className="mt-12 flex items-center justify-between gap-4">
          <TagButton variant="ghost" size="md" active>
            {current}
          </TagButton>
          <span className="flex items-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1)
              .filter((n) => n !== current)
              .map((n) => (
                <TagButton key={n} variant="outline" size="md" onClick={() => choosePage(n)}>
                  {n}
                </TagButton>
              ))}
          </span>
        </nav>
      ) : null}
    </>
  );
}
