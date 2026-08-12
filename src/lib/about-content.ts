/** Copy for the /about page (Figma node 935-1334). */

export const aboutHero = {
  title: "About Us.",
  intro: "We make the hard parts feel simple.",
};

/** Small badge pinned to the right of the stats marquee. */
export const aboutBadge = {
  range: "2012 - 2026",
  owner: "© Adpedia",
};

export const aboutIntro = {
  statement: "Art and Technology Converge for Stunning Designs.",
  body: "Adpedia started in 2012 as a small design studio and grew into a full digital partner — branding, UI/UX, web and app development, and the AI work our clients are asking for now. The services list has grown; what hasn't changed is working directly with the people building the product, not through layers of account management.",
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
    "Strategy, design, and execution under one roof, so a project doesn't stall waiting for a handoff between teams.",
  /** Order matches the comp: reading left-to-right, top-to-bottom. */
  advantages: [
    {
      id: "focus" as AdvantageId,
      title: "Focus",
      body: "Your project gets a team that isn't splitting attention across five other clients that week. That focus is what makes fast decisions possible without the usual back-and-forth.",
    },
    {
      id: "transparency" as AdvantageId,
      title: "Transparency",
      body: "Every two weeks you get a working build, not just a status update — so you're reacting to something real instead of a slide deck.",
    },
    {
      id: "quick-results" as AdvantageId,
      title: "Quick Results",
      body: "Agile sprints mean you're looking at a testable version early, giving feedback before assumptions get baked in too deep to change cheaply.",
    },
    {
      id: "partnership" as AdvantageId,
      title: "Partnership",
      body: "Most of our work comes from clients who came back for a second project, or referred us to someone who needed one — that's the track record we'd rather point to than a portfolio page.",
    },
  ],
};
