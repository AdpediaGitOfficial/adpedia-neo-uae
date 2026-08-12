/**
 * Canonical service list — the single source for the nav dropdown, the service
 * mega menu, the footer columns, and the /services routes.
 *
 * These are the seven services the studio actually offers, matching the "What
 * we do best" accordion on the home page. `slug` is deliberately identical to
 * the corresponding `serviceItems` id in home-content.ts, so the accordion and
 * the routes always refer to the same service.
 *
 * Note this is NOT the list in the Figma footer, which shows a different set
 * (Website Development, Web app development, Project Management, Business
 * Intelligence, Team Augmentation). That comp is out of date; this list is
 * authoritative and the footer is rendered from it.
 */

export type Service = {
  slug: string;
  label: string;
  /**
   * Key into the mega menu's lucide icon map. Used when the service has no
   * `thumb` yet, so services can gain artwork one at a time.
   */
  icon: string;
  description?: string;
  /**
   * Square thumbnail for the service mega menu, replacing the icon tile so the
   * panel reads like the portfolio one. Roughly 160px source or larger; it
   * renders at 56px.
   *
   * All seven currently point at PLACEHOLDER artwork (`thumb-<slug>.png`,
   * generated on-brand: ink-800 ground, accent geometry, service initials, and
   * a dotted rule along the bottom edge that marks them as stand-ins). They are
   * deliberately distinct from one another so the rows stay tellable apart at
   * 56px. Swap the files in `public/images/services/` when real art arrives —
   * keeping the same filenames means no code change is needed.
   *
   * The field stays optional and `MegaMenuPanels` keeps its icon fallback, so
   * dropping a `thumb` degrades to the icon tile rather than a hole.
   */
  thumb?: { src: string; alt: string };
};

export const services: Service[] = [
  {
    slug: "ui-ux-design",
    label: "UI/UX Design",
    icon: "PenTool",
    description: "Intuitive, accessible interfaces and design systems.",
    thumb: { src: "/images/services/thumb-ui-ux-design.png", alt: "UI/UX Design" },
  },
  {
    slug: "web-development",
    label: "Web Development",
    icon: "Code2",
    description: "Fast, scalable, secure websites and web apps.",
    thumb: { src: "/images/services/thumb-web-development.png", alt: "Web Development" },
  },
  {
    slug: "mobile-app-development",
    label: "Mobile App Development",
    icon: "Smartphone",
    description: "iOS & Android apps built for growth.",
    thumb: {
      src: "/images/services/thumb-mobile-app-development.png",
      alt: "Mobile App Development",
    },
  },
  {
    slug: "product-development",
    label: "Product Development",
    icon: "Rocket",
    description: "Lean MVPs built to launch and scale fast.",
    thumb: { src: "/images/services/thumb-product-development.png", alt: "Product Development" },
  },
  {
    slug: "ai-data-science",
    label: "AI & Data Science",
    icon: "Sparkles",
    description: "Intelligent systems that unlock insight.",
    thumb: { src: "/images/services/thumb-ai-data-science.png", alt: "AI & Data Science" },
  },
  {
    slug: "devops-services",
    label: "DevOps Services",
    icon: "Server",
    description: "Reliable delivery, cloud, and automation.",
    thumb: { src: "/images/services/thumb-devops-services.png", alt: "DevOps Services" },
  },
];

export function serviceHref(slug: string): string {
  return `/services/${slug}`;
}


/**
 * The footer comp splits services across two columns. Kept as a derivation so
 * adding a service rebalances automatically instead of needing a manual move.
 */
export function serviceFooterColumns(): Service[][] {
  const half = Math.ceil(services.length / 2);
  return [services.slice(0, half), services.slice(half)];
}
