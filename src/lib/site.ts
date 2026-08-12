/** Global site configuration: metadata, navigation, footer, contact. */

import { categories, categoryLabel } from "@/lib/taxonomy";
import { featuredProjects, projectHref, projects } from "@/lib/projects";
import { serviceFooterColumns, serviceHref, services } from "@/lib/services";
import { formatPostDate, postCategories, postHref, posts } from "@/lib/blog-content";

export const siteConfig = {
  name: "Adpedia Neo",
  shortName: "adpedia",
  domain: "https://adpedia.in",
  tagline: "We design brands that demand attention",
  description:
    "Adpedia Neo is a creative digital studio crafting impactful brand experiences through strategy, design, and technology — from branding and UI/UX to web, apps, and AI.",
  email: "info@adpedia.in",
  phone: "+91 9447768570",
  phoneHref: "tel:+919447768570",
  social: {
    facebook: "https://facebook.com/adpedia",
    instagram: "https://instagram.com/adpedia",
    linkedin: "https://linkedin.com/company/adpedia",
  },
} as const;

export type MegaKey = "service" | "portfolio" | "blog";

export type NavLink = {
  label: string;
  href: string;
  /** When set, this item opens a full-width mega menu instead of a simple dropdown. */
  mega?: MegaKey;
  children?: { label: string; href: string; description?: string }[];
};

/** Derived from the canonical list in `lib/services.ts`. */
export const serviceLinks = services.map((service) => ({
  label: service.label,
  href: serviceHref(service.slug),
}));

/**
 * Portfolio filters, derived from the categories that actually have work in
 * `lib/projects.ts`. Empty categories are hidden, so the list grows on its own
 * as projects are added instead of advertising filters that return nothing.
 */
/**
 * Blog categories, derived from the categories that actually have posts — the
 * same rule `portfolioLinks` follows, so the menu never advertises a filter
 * that returns nothing. `?category=` is read by `BlogBrowser` on mount.
 */
export const blogLinks = [
  { label: "All Posts", href: "/blog" },
  ...postCategories
    .filter((category) => posts.some((post) => post.category === category.id))
    .map((category) => ({ label: category.label, href: `/blog?category=${category.id}` })),
];

export const portfolioLinks = [
  { label: "All Projects", href: "/portfolio" },
  ...categories
    .filter((category) => projects.some((project) => project.category === category.id))
    .map((category) => ({ label: category.label, href: `/portfolio?filter=${category.id}` })),
];

export const mainNav: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio", mega: "portfolio", children: portfolioLinks },
  { label: "Service", href: "/services", mega: "service", children: serviceLinks },
  { label: "Career", href: "/careers" },
  { label: "Blog", href: "/blog", mega: "blog", children: blogLinks },
  { label: "Contact", href: "/contact" },
];

/** Rich content for the Service mega menu (icon keys map to lucide-react icons). */
export const serviceMenu = {
  eyebrow: "Service",
  title: "What We Do Best",
  description: "End-to-end digital services designed to create impact and drive growth.",
  viewAll: { label: "View all services", href: "/services" },
  /**
   * Derived from the canonical list. `description` is only present on the
   * services that have real copy — the panel omits it otherwise rather than
   * showing an invented line.
   */
  items: services.map((service) => ({
    label: service.label,
    href: serviceHref(service.slug),
    icon: service.icon,
    description: service.description,
    thumb: service.thumb,
  })),
};

/** Rich content for the Portfolio mega menu. */
export const portfolioMenu = {
  eyebrow: "Selected work",
  title: "Stories We've Built",
  description: "Projects designed to solve problems, create impact, and elevate brands.",
  viewAll: { label: "View all projects", href: "/portfolio" },
  filters: portfolioLinks,
  /**
   * Derived from the canonical project list. Cards now deep-link to the
   * individual case study rather than all pointing at the index.
   */
  featured: featuredProjects.map((project) => ({
    category: categoryLabel(project.category),
    title: project.name,
    href: projectHref(project.slug),
    image: project.thumb.src,
  })),
} as const;

/**
 * Rich content for the Blog mega menu — the same shape as `portfolioMenu`, so
 * the two panels read as one family.
 *
 * Cards are the most recent posts by date rather than only those flagged
 * `featured`: a menu that shows one card because only one post is flagged looks
 * broken, and recency is the right signal for a blog anyway.
 */
export const blogMenu = {
  eyebrow: "Latest thinking",
  title: "Insights We Share",
  description: "Practical writing on design, engineering, and the decisions behind good digital work.",
  viewAll: { label: "View all posts", href: "/blog" },
  filters: blogLinks,
  featured: [...posts]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3)
    .map((post) => ({
      category: postCategories.find((c) => c.id === post.category)?.label ?? post.category,
      title: post.title,
      href: postHref(post.slug),
      image: post.cover.src,
      date: formatPostDate(post.date),
    })),
} as const;

export const footerColumns = [
  {
    title: "Navigation",
    links: [
      { label: "About us", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Service", href: "/services" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  // The comp splits services across two footer columns, both headed "Services".
  ...serviceFooterColumns().map((column) => ({
    title: "Services",
    links: column.map((service) => ({ label: service.label, href: serviceHref(service.slug) })),
  })),
];

/**
 * Regional offices. `address` is kept as discrete lines so the contact page can
 * render the three-line block from the Figma comp without hard-coded breaks.
 */
export const offices = [
  {
    country: "India",
    address: ["Chinnangath Complex", "Room No: VIII/318, Ground Floor,", "Thommana, Irinjalakuda, Thrissur"],
    email: "info@adpedia.in",
    phone: "+91 9447768570",
    phoneHref: "tel:+919447768570",
  },
  {
    country: "New Zealand",
    address: ["G06/430 Queen Street,", "Auckland CBD Auckland 1010-", "New Zealand"],
    email: "info@adpedia.in",
    phone: "+64 210 285 6948",
    phoneHref: "tel:+642102856948",
  },
  {
    country: "Singapore",
    address: ["Block 681a, Unit 02-11 Woodlands", "Drive 62,", "Singapore -731681"],
    email: "info@adpedia.in",
    phone: "+65 91156075",
    phoneHref: "tel:+6591156075",
  },
] as const;
