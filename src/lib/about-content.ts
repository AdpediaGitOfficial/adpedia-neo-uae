/** Copy for the /about page (Figma node 935-1334). */

export const aboutHero = {
  title: "About Us.",
  intro: "When you think about easiness, we make it easy.",
};

/** Small badge pinned to the right of the stats marquee. */
export const aboutBadge = {
  range: "2012 - 2026",
  owner: "© Adpedia",
};

export const aboutIntro = {
  statement: "Art and Technology Converge for Stunning Designs.",
  body: "We've been diving into the tech world since 2012, and we're all about helping our clients design, develop, and digitize their businesses. In just a short time, we've grown our network by offering awesome services like branding, UI/UX design, and creative content that our clients really love.",
  photo: {
    src: "/images/about/team.png",
    alt: "The Adpedia team together in the studio",
  },
};

export type AdvantageId = "focus" | "transparency" | "quick-results" | "partnership";

export const whyHireUs = {
  eyebrow: "Why hire us",
  title: "The Advantage of Working with Us",
  subtitle:
    "We simplify complexity with strategy, design, and execution. Our collaborative process delivers effective solutions that grow with your business.",
  /** Order matches the comp: reading left-to-right, top-to-bottom. */
  advantages: [
    {
      id: "focus" as AdvantageId,
      title: "Focus",
      body: "You get a dedicated team of experts fully committed to your project—working exclusively to understand your goals, challenges, and vision. This close collaboration enables clear communication, faster decision-making, and a more refined execution process. Together, we efficiently transform your ideas into a robust, scalable, and valuable digital product that delivers real impact.",
    },
    {
      id: "transparency" as AdvantageId,
      title: "Transparency",
      body: "Every two weeks, we share a detailed progress report along with a working prototype, keeping you closely connected to the development process from start to finish. Through regular calls, emails, daily updates, and onsite visits when needed, we ensure open communication, quick feedback resolution, and complete transparency at every stage.",
    },
    {
      id: "quick-results" as AdvantageId,
      title: "Quick Results",
      body: "You may promptly introduce your product to the market through the agile methodology. You will receive an updated version of the app to test, tweak, or provide feedback after each iteration.",
    },
    {
      id: "partnership" as AdvantageId,
      title: "Partnership",
      body: "Our valued clients and an extensive portfolio of successfully delivered projects stand as a true reflection of our expertise, consistency, and teamwork. The trust we build through quality execution and dependable collaboration has led many clients to work with us continuously since the company's inception, forming long-term partnerships rooted in shared growth and success.",
    },
  ],
};
