import type { CategoryId } from "@/lib/taxonomy";

/**
 * Canonical project list — the single source for the home Stories rail, the
 * portfolio mega menu, the /portfolio index, and the /portfolio/[slug] case
 * studies.
 *
 * Card anatomy on /portfolio (Figma 935:1725): `name` is the headline,
 * `type` the line beneath it, with `year` and `location` set right. `category`
 * is separate from `type` — only `category` drives the filter row.
 *
 * `slug` is the /portfolio/<slug> URL segment and must stay stable; it is the
 * public link target from the menu, home, and the index.
 */

export type Project = {
  slug: string;
  /** Card headline — the project or client name (e.g. "KV Connect"). */
  name: string;
  /** Card sub-line — the kind of work (e.g. "MVP Development"). */
  type: string;
  /** Drives the /portfolio filter row. */
  category: CategoryId;
  /** Optional until the real project data lands — the card hides them when unset. */
  year?: number;
  location?: string;
  tags: string[];
  summary: string;
  thumb: { src: string; alt: string };
  /** Surfaced in the portfolio mega menu. */
  featured?: boolean;

  /* ---- case-study fields, all optional ----
   * The detail page renders each block only when it has content, so a project
   * with just a summary still produces a valid page. Fill these in as the real
   * project write-ups arrive. */

  /**
   * The write-up, as ordered blocks. Free-form rather than fixed
   * challenge/outcome slots so each project can tell its own story — one
   * project may want "The brief" and "Why it works", another a five-part
   * narrative. One string per paragraph.
   */
  narrative?: { title: string; body: string[] }[];

  /**
   * Showcase imagery. `span: "full"` runs the image across the content column
   * for hero-style shots; the default "half" pairs images two-up. `caption`
   * is rendered beneath when present.
   */
  gallery?: { src: string; alt: string; caption?: string; span?: "full" | "half" }[];

  /** Headline numbers, e.g. { value: "+38%", label: "Conversion rate" }. */
  results?: { value: string; label: string }[];

  /** Client words about the work. */
  quote?: { text: string; author: string; role?: string };

  /** How long the engagement ran, e.g. "12 weeks". */
  duration?: string;

  /** Live site, if it is public. */
  website?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "orange-flex",
    name: "Flex",
    type: "Website Design",
    category: "web-development",
    tags: ["UI Design", "UX Design", "Responsive Layout", "+more"],
    summary:
      "We design modern, user-focused websites that blend aesthetics with usability to drive engagement and conversions.",
    thumb: { src: "/images/projects/website-design.png", alt: "Orange Flex website on a laptop" },
    featured: true,
    narrative: [
      {
        title: "Overview",
        body: [
          "Flex arrived with a product people already liked and a website that undersold it. The brand had outgrown its original identity, and the site had gained pages faster than it had gained structure — visitors turned up with clear intent and left without an obvious next step.",
          "We rebuilt the site around what people were actually trying to do. Every page now opens with a single legible proposition and resolves to one clear action, with the supporting detail arranged beneath it rather than competing for the same attention.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "The old site treated every section as equally important, so nothing read as important. Navigation had grown to accommodate internal teams rather than the people using it, and the mobile experience was a compressed desktop layout rather than a considered one.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "We started with the content rather than the layout — auditing every page, cutting what repeated, and grouping what remained into a structure that matched how customers describe the product themselves. Only then did we design, working from the smallest screen up so that constraints set the priorities.",
          "A tighter typographic system carries the long-form pages without extra decoration, which keeps the site quick to load and, more importantly, quick to read.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/hero/flex-laptop.png",
        alt: "The Flex homepage open on a laptop",
        caption: "The homepage leads with one proposition and one action.",
        span: "full",
      },
      {
        src: "/images/services/brand-flex.png",
        alt: "Flex brand and interface elements",
        caption: "Type and colour applied consistently across the system.",
      },
      {
        src: "/images/projects/website-design.png",
        alt: "Flex responsive layouts across screen sizes",
        caption: "Layouts designed from the smallest breakpoint up.",
      },
    ],
  },
  {
    slug: "dotarion-app",
    name: "Dotarion",
    type: "Mobile App Design",
    category: "app-development",
    tags: ["iOS", "Android", "UI/UX", "Responsive Layout", "+more"],
    summary:
      "We create intuitive mobile app experiences focused on clarity, usability, and seamless interaction across platforms.",
    thumb: { src: "/images/projects/mobile-app.png", alt: "Dotarion mobile app screens" },
    featured: true,
    narrative: [
      {
        title: "Overview",
        body: [
          "Dotarion needed an app that felt calm to use. The feature set was already decided; the problem was that everything competed for the same moment of attention, and people were abandoning tasks partway through rather than finishing them.",
          "We reduced each screen to the one decision it was asking for. Secondary actions moved out of the primary path, and the flows that mattered most were shortened until they could be completed in a single sitting.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "Designing across iOS and Android without producing two unrelated products. The interface had to respect each platform's conventions — navigation, gestures, typography — while keeping a single recognisable character throughout.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "We built the interface from a small set of components with generous touch targets and predictable spacing, then let platform conventions vary only where users would notice their absence. Motion is used sparingly and only to explain a transition, never for decoration.",
          "The outcome is an app that feels quiet in the hand: fewer steps to complete the common tasks, and a consistent rhythm that makes the uncommon ones easier to find.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/hero/billie-phones.png",
        alt: "Dotarion app screens shown across several phones",
        caption: "Each screen asks for one decision at a time.",
        span: "full",
      },
      {
        src: "/images/hero/billie-desktop.png",
        alt: "The companion desktop view",
        caption: "The companion web view mirrors the app's structure.",
      },
      {
        src: "/images/projects/mobile-app.png",
        alt: "Detail of the Dotarion interface components",
        caption: "A small component set, reused throughout.",
      },
    ],
  },
  {
    slug: "browno-studio",
    name: "Browno",
    type: "Brand Experience",
    category: "brand-design",
    tags: ["Brand Design", "Art Direction", "Web", "+more"],
    summary:
      "We shape elegant, cohesive brand experiences that translate strategy into memorable digital products people love.",
    thumb: { src: "/images/projects/brand-elegant.png", alt: "Browno brand website concept" },
    featured: true,
    narrative: [
      {
        title: "Overview",
        body: [
          "Browno had a strong point of view and no consistent way of expressing it. Each touchpoint had been designed in isolation, so the studio looked like several different companies depending on where you met it.",
          "We built one system instead of another set of assets: a typographic scale, a restrained palette, and a small library of layouts that hold together whether they are applied to a landing page, a proposal, or a social post.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "Elegance is easy to describe and hard to specify. The brand needed to read as considered without becoming fragile — the rules had to survive being applied by people who were not in the room when they were written.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "We designed the constraints first. Type sizes, spacing, and contrast were fixed to a scale narrow enough to stay coherent and wide enough to handle real content, then we tested it against the messiest pages the studio actually produces rather than the tidiest.",
          "What ships is a system with fewer decisions left open. The identity holds its shape as the studio grows, and new material starts from a defensible default rather than a blank canvas.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/hero/shape-elegant.png",
        alt: "The Browno site showing the brand's typographic treatment",
        caption: "One typographic scale carries every page.",
        span: "full",
      },
      {
        src: "/images/services/brand-cybersabra.png",
        alt: "Brand applications across formats",
        caption: "The same rules applied across formats.",
      },
      {
        src: "/images/projects/brand-elegant.png",
        alt: "Browno layout and art direction detail",
        caption: "Art direction tested against real content, not ideal content.",
      },
    ],
  },
  {
    slug: "nova-commerce",
    name: "Nova",
    type: "E-commerce Platform",
    category: "web-development",
    tags: ["E-commerce", "Web Development", "CRO", "+more"],
    summary:
      "We build high-performing commerce experiences with seamless navigation, optimized conversions, and scalable foundations.",
    thumb: { src: "/images/projects/ecommerce-vr.png", alt: "Immersive e-commerce concept" },
    narrative: [
      {
        title: "Overview",
        body: [
          "Nova was selling well in spite of its storefront rather than because of it. Traffic was healthy and the catalogue was strong, but the path from landing to checkout asked for too much too early and lost people at predictable points.",
          "We rebuilt the journey around momentum. Product pages answer the obvious objections in the order shoppers raise them, and checkout collects the minimum needed at each step instead of presenting one long form.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "A catalogue that keeps growing. The design had to hold up whether a category contained six products or six hundred, and had to stay fast on the mid-range phones most of the traffic actually arrives on.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "Filtering and sorting were treated as primary navigation rather than an afterthought, so large categories stay browsable. Imagery is sized per breakpoint and loaded lazily, keeping the first view light without softening the product photography the brand depends on.",
          "The foundation is deliberately unglamorous: predictable templates, a shared component set, and room for the catalogue to double without a redesign.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/hero/lumio-tablets.png",
        alt: "Nova storefront shown across tablet screens",
        caption: "Category pages built to stay browsable as the catalogue grows.",
        span: "full",
      },
      {
        src: "/images/hero/pricing-green.png",
        alt: "Nova pricing and checkout step",
        caption: "Checkout asks for the minimum at each step.",
      },
      {
        src: "/images/hero/digital-presence.png",
        alt: "Nova campaign and content pages",
        caption: "Editorial pages reuse the same component set.",
      },
    ],
  },
];

/** Cards per page on /portfolio — the Figma grid is 2 columns x 4 rows. */
export const PROJECTS_PER_PAGE = 8;

export const featuredProjects = projects.filter((p) => p.featured);

export function projectHref(slug: string): string {
  return `/portfolio/${slug}`;
}

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


/**
 * Other work to show at the foot of a case study: same category first, topped
 * up with the most recent others so the rail is never empty or near-empty.
 */
export function relatedProjects(slug: string, limit = 3): Project[] {
  const current = projectBySlug(slug);
  if (!current) return [];
  const sameCategory = projects.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = projects.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
