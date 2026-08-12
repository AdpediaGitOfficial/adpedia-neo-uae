import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { projectHref, projects } from "@/lib/projects";
import { postHref, posts } from "@/lib/blog-content";
import { serviceDetailSlugs } from "@/lib/service-detail-content";
import { serviceHref } from "@/lib/services";

/**
 * Only routes that actually exist. Deriving this from `mainNav` advertised
 * `/about`, `/portfolio`, `/services`, `/careers`, and `/blog` to search
 * engines while they still resolve to the 404 page — add each here as it ships.
 *
 * Case studies are enumerated from the project list, so new work appears in the
 * sitemap automatically.
 */
const builtRoutes = ["/", "/about", "/services", "/portfolio", "/blog", "/careers", "/contact"];

/**
 * Real per-content update dates, keyed by path — only blog posts carry a
 * genuine date in their data. `lastModified` is omitted for every other
 * route rather than stamped with the build time: a sitemap that claims every
 * URL changed "now" on every deploy is a false freshness signal that erodes
 * search engines' trust in the field over time, which is worse than leaving
 * it unset.
 */
function lastModifiedFor(path: string): string | undefined {
  const post = posts.find((p) => postHref(p.slug) === path);
  return post?.date;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const unique = Array.from(
    new Set([
      ...builtRoutes,
      ...projects.map((p) => projectHref(p.slug)),
      ...posts.map((p) => postHref(p.slug)),
      // Only services whose detail page is written — the rest 404.
      ...serviceDetailSlugs().map(serviceHref),
    ])
  );
  return unique.map((path) => ({
    url: `${siteConfig.domain}${path === "/" ? "/" : path}`,
    lastModified: lastModifiedFor(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
