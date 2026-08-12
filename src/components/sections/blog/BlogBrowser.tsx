"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input, Select } from "@/components/ui/form";
import { TagButton } from "@/components/ui/Tag";
import { Text } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { PostCard } from "./PostCard";
import { FeaturedPostCard } from "./FeaturedPostCard";
import {
  POSTS_PER_PAGE,
  blogLabels,
  postCategories,
  posts,
  type PostCategoryId,
} from "@/lib/blog-content";

/**
 * Search, category filter, grid, and pagination.
 *
 * All three are local state rather than `useSearchParams` on purpose: reading
 * the query that way opts the subtree out of prerendering, which would leave
 * every post out of the served HTML. Posts are the content here, so they must
 * be in the markup.
 *
 * Deep links still work, exactly as in `PortfolioBrowser`: `?category=` is read
 * once on mount and applied, and every change is pushed back with
 * `replaceState`. That is what makes the blog mega menu's
 * `/blog?category=development` links land on the right view — without it the
 * chips would navigate but change nothing.
 */
function isPostCategoryId(value: string | undefined): value is PostCategoryId {
  return postCategories.some((c) => c.id === value);
}

export function BlogBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<PostCategoryId | "">("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("category") ?? undefined;
    if (isPostCategoryId(raw)) setCategory(raw);
    const requested = Number.parseInt(params.get("page") ?? "1", 10);
    if (Number.isFinite(requested) && requested > 1) setPage(requested);
  }, []);

  const syncUrl = (next: PostCategoryId | "", nextPage = 1) => {
    const params = new URLSearchParams();
    if (next) params.set("category", next);
    if (nextPage > 1) params.set("page", String(nextPage));
    const q = params.toString();
    window.history.replaceState(null, "", q ? `/blog?${q}` : "/blog");
  };

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const inCategory = !category || post.category === category;
      const inQuery =
        !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  const pageCount = Math.max(1, Math.ceil(matches.length / POSTS_PER_PAGE));
  const current = Math.min(page, pageCount);
  const start = (current - 1) * POSTS_PER_PAGE;
  const visible = matches.slice(start, start + POSTS_PER_PAGE);

  // Only the first page leads with the featured post; deeper pages are a plain grid.
  const [lead, ...rest] = visible;
  const showLead = current === 1 && lead?.featured;

  const chooseCategory = (next: PostCategoryId | "") => {
    setCategory(next);
    setPage(1);
    syncUrl(next, 1);
  };

  const chooseQuery = (next: string) => {
    setQuery(next);
    setPage(1);
  };

  const choosePage = (next: number) => {
    setPage(next);
    syncUrl(category, next);
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
        <div className="relative sm:w-80">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/45"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => chooseQuery(e.target.value)}
            placeholder={blogLabels.search}
            aria-label="Search posts"
            className="pl-11"
          />
        </div>

        <Select
          value={category}
          onChange={(e) => chooseCategory(e.target.value as PostCategoryId | "")}
          aria-label="Filter by category"
          className="sm:w-48"
        >
          <option value="">{blogLabels.allCategories}</option>
          {postCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </Select>
      </div>

      {visible.length > 0 ? (
        <Stagger
          key={`${category}-${query}-${current}`}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {showLead ? (
            <StaggerItem className="sm:col-span-2">
              <FeaturedPostCard post={lead} />
            </StaggerItem>
          ) : null}
          {(showLead ? rest : visible).map((post) => (
            <StaggerItem key={post.slug} className="h-full">
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <Text className="mt-12 text-center">{blogLabels.empty}</Text>
      )}

      {pageCount > 1 ? (
        <nav aria-label="Pagination" className="mt-14 flex items-center justify-between gap-4">
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
