/** Copy and posts for /blog and /blog/[slug] (Figma 935-4663 and 935-5114). */

export const blogHero = {
  title: "Expert Insights.",
  intro: "From design principles to technical optimizations—everything you need for digital success.",
  lead: "Expert insights on web design, branding, and digital strategy to help your business stand out.",
};

export const blogLabels = {
  search: "search...",
  category: "category",
  allCategories: "All categories",
  related: "Related blogs",
  empty: "No posts match that search yet.",
  readPost: "Read post",
};

export type PostCategoryId = "design" | "development" | "strategy";

export const postCategories: { id: PostCategoryId; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "development", label: "Development" },
  { id: "strategy", label: "Strategy" },
];

/**
 * Article body as typed blocks rather than a markdown string.
 *
 * This keeps the repo dependency-free and consistent with `projects.ts`, and
 * renders the exact structures the design uses — h2, h3, paragraphs, lists.
 * If posts start being written by someone who does not work in the codebase,
 * migrate to MDX: the block union maps onto it cleanly. See NOTES.md.
 */
export type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  /** Shorter <title>-tag variant for posts whose full title overflows ~60 chars once " | Adpedia Neo" is appended. Falls back to `title` when unset. */
  seoTitle?: string;
  excerpt: string;
  category: PostCategoryId;
  /** ISO date — formatted for display at render time. */
  date: string;
  cover: { src: string; alt: string };
  author?: { name: string; role: string };
  /** Standfirst under the title. */
  lead?: string;
  /** Empty until the article is written; the page renders what exists. */
  body: Block[];
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: "web-development-meets-ai",
    title: "Web Development Meets AI: Building Smarter Digital Experiences",
    seoTitle: "Web Development Meets AI: What's Changing",
    excerpt:
      "How artificial intelligence is reshaping the way websites are built, experienced, and improved.",
    category: "development",
    date: "2026-01-22",
    cover: {
      src: "/images/blog/ai-web-development.png",
      alt: "Abstract visual representing AI-assisted web development",
    },
    author: { name: "Rohan Dev", role: "Client Success Manager" },
    lead: "Most articles about AI in web development list the same five bullet points — chatbots, personalization, faster coding. Here's what we've actually noticed building with these tools day to day: some of it lives up to the hype, and some of it is still slower than doing it by hand.",
    featured: true,
    body: [
      { type: "heading", level: 2, text: "Where AI Genuinely Speeds Up Development" },
      {
        type: "paragraph",
        text: "Code-completion tools have changed the boring parts of the job — boilerplate, repetitive component structures, first-draft test cases. The gain isn't that AI writes better code than a senior developer; it's that it removes the friction of writing code a developer already knows how to write. That time goes back into the parts that actually need a person: architecture decisions, edge cases, the interface details a generated component always gets slightly wrong.",
      },
      { type: "heading", level: 2, text: "Where It Still Falls Short" },
      {
        type: "paragraph",
        text: "The same tools struggle with anything that depends on context outside the file they're looking at — a design system's actual conventions, a legacy API's undocumented quirks, the reason a piece of business logic exists in the first place. We've seen AI-generated code that's syntactically perfect and functionally wrong, because it optimised for the pattern it was trained on rather than the constraint that was actually in play. Treating AI output as a first draft, not a finished feature, is the difference between it saving time and costing it.",
      },
      { type: "heading", level: 2, text: "Personalisation Without the Uncanny Valley" },
      {
        type: "paragraph",
        text: "Recommendation engines and adaptive interfaces are real and useful, but the failure mode is obvious the moment a user notices they're being profiled. The sites that get this right personalise the small, useful things — remembering a filter, surfacing a relevant product — rather than trying to make the site feel like it \"knows\" the user. Subtlety is the actual hard part, not the machine learning.",
      },
      { type: "heading", level: 2, text: "Where We're Actually Using It on Client Projects" },
      {
        type: "list",
        items: [
          "Search and content discovery, where relevance genuinely improves the experience instead of just adding a feature",
          "Internal tooling that summarises or triages content, where speed matters more than polish",
          "Automated testing, where AI catches regressions a manual pass would miss",
          "Accessibility auditing, flagging issues before they reach a real user",
        ],
      },
      { type: "heading", level: 2, text: "What We'd Tell a Client Considering This" },
      {
        type: "paragraph",
        text: "Don't build \"an AI feature\" because the roadmap has a slot for one. Start with a workflow that's genuinely slow or error-prone today, and ask whether a model actually improves it — sometimes the honest answer is a better search index or a simpler form, not a chatbot. The projects that work are the ones where AI solves a real bottleneck, not the ones decorating a product with a feature that reads well in a pitch deck.",
      },
      { type: "heading", level: 2, text: "The Short Version" },
      {
        type: "paragraph",
        text: "AI in web development isn't one trend — it's several unrelated capabilities (code generation, personalisation, search, automation) that happen to share a name. Some of them will change how you build software. Others are still better solved the old way. Knowing which is which, for your specific product, is most of the actual work.",
      },
    ],
  },
  // "the-rise-of-edge-computing" — title, excerpt, and date came from the index
  // comp, but the article itself was never written (body: []). Publishing an
  // indexed, sitemap-listed page with no body is a thin-content SEO risk, so
  // the entry is removed rather than shipped empty. Re-add it here (with a
  // written body) once the article exists — everything that lists posts
  // (sitemap, blog index, the blog mega menu, related-posts) reads this array
  // directly, so restoring the entry is enough to bring the page back.
];

export const POSTS_PER_PAGE = 6;

export function postHref(slug: string): string {
  return `/blog/${slug}`;
}

export function postBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function relatedPosts(slug: string, limit = 4): Post[] {
  const current = postBySlug(slug);
  if (!current) return [];
  const sameCategory = posts.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = posts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Stable across server and client — avoids a locale-dependent hydration mismatch. */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
