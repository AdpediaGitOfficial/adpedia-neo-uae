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
    url: `${siteConfig.domain}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
