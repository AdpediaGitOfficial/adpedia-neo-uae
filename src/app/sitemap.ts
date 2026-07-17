import type { MetadataRoute } from "next";
import { siteConfig, mainNav, serviceLinks } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    ...mainNav.map((n) => n.href),
    ...serviceLinks.map((s) => s.href),
  ];
  const unique = Array.from(new Set(routes));
  return unique.map((path) => ({
    url: `${siteConfig.domain}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
