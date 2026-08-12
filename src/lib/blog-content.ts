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
    excerpt:
      "How artificial intelligence is reshaping the way websites are built, experienced, and improved.",
    category: "development",
    date: "2026-01-22",
    cover: {
      src: "/images/blog/ai-web-development.png",
      alt: "Abstract visual representing AI-assisted web development",
    },
    author: { name: "Rohan Dev", role: "Client Success Manager" },
    lead: "The digital landscape is evolving faster than ever, and at the center of this transformation lies the powerful combination of web development and artificial intelligence (AI). Together, they are redefining how websites are built, how users interact with them, and how businesses deliver value online.",
    featured: true,
    body: [
      { type: "heading", level: 2, text: "The Evolution of Web Development" },
      {
        type: "paragraph",
        text: "Traditional web development focused on static pages, basic interactivity, and manual workflows. Today, modern web applications are dynamic, data-driven, and user-centric. Frameworks like React, Vue, and Next.js have made interfaces faster and more responsive—but AI is taking this evolution to the next level.",
      },
      { type: "heading", level: 2, text: "How AI Is Transforming Web Development" },
      { type: "heading", level: 3, text: "1. Smarter User Experiences" },
      {
        type: "paragraph",
        text: "AI enables websites to understand user behavior and adapt in real time. From personalized content recommendations to intelligent search and navigation, AI helps deliver experiences tailored to individual users.",
      },
      { type: "heading", level: 3, text: "2. Automation in Development" },
      {
        type: "paragraph",
        text: "AI-powered tools assist developers by generating code snippets, detecting bugs, optimizing performance, and even suggesting UI improvements. This reduces development time and allows teams to focus on strategy and creativity.",
      },
      { type: "heading", level: 3, text: "3. Intelligent Chatbots & Virtual Assistants" },
      {
        type: "paragraph",
        text: "AI-driven chatbots have become a standard feature in modern websites. They provide instant customer support, guide users through products or services, and operate 24/7—improving engagement and conversion rates.",
      },
      { type: "heading", level: 3, text: "4. Data-Driven Decision Making" },
      {
        type: "paragraph",
        text: "AI analyzes vast amounts of user data to uncover patterns and insights. These insights help businesses refine their web strategies, improve usability, and make informed design and content decisions.",
      },
      { type: "heading", level: 2, text: "AI and UI/UX Design: A Perfect Match" },
      {
        type: "paragraph",
        text: "AI doesn't replace designers—it empowers them. By analyzing user interactions, AI helps identify friction points, optimize layouts, and improve accessibility. Predictive analytics and A/B testing powered by AI ensure that design decisions are backed by real user behavior, not assumptions.",
      },
      { type: "heading", level: 2, text: "The Future of Web Development with AI" },
      {
        type: "paragraph",
        text: "As AI continues to evolve, websites will become more intuitive, conversational, and proactive. We can expect:",
      },
      {
        type: "list",
        items: [
          "Voice-enabled web interfaces",
          "Hyper-personalized user journeys",
          "Faster development cycles with AI-assisted tools",
          "Smarter accessibility and inclusive design solutions",
        ],
      },
      { type: "heading", level: 2, text: "Conclusion" },
      {
        type: "paragraph",
        text: "The integration of AI into web development is no longer optional—it's the future. Businesses that embrace this synergy can build smarter, faster, and more engaging digital products. By combining solid web development practices with AI-driven intelligence, brands can create experiences that truly connect with users and scale with technology.",
      },
    ],
  },
  {
    slug: "the-rise-of-edge-computing",
    title: "The Rise of Edge Computing: Bringing Data Processing Closer to the Source",
    excerpt: "Discover the latest design trends shaping the digital world and how they impact business.",
    category: "development",
    date: "2026-01-22",
    cover: {
      src: "/images/blog/edge-computing.png",
      alt: "Editorial layout exploring edge computing",
    },
    // Title, excerpt, and date come from the index comp; the article itself has
    // not been written. The detail page renders only the blocks that exist, so
    // this publishes as a stub rather than a broken page.
    body: [],
  },
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
