import { siteConfig } from "@/lib/site";

/** Copy and open roles for the /careers page (Figma node 935-2121). */

export const careersHero = {
  title: "Careers.",
  intro: "A great career is just around the corner, and you're closer than you think!",
  photo: {
    src: "/images/careers/team.png",
    alt: "A member of the Adpedia team working at a desk",
  },
};

export const careersIntro = {
  title: "We'd Love to Have You on Our Team!",
  body: "Since 2012, we've been all about the tech scene, helping our clients design, develop, and digitize their businesses. In no time, we've built a great network by providing cool services like branding, UI/UX design, and creative content that our clients totally dig.",
};

export type JobCategoryId = "design" | "development" | "management";

export const jobCategories: { id: JobCategoryId; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "development", label: "Development" },
  // Rendered capitalised; the comp shows it lowercase, which reads as a typo
  // next to the other two.
  { id: "management", label: "Management" },
];

export type Job = {
  slug: string;
  title: string;
  category: JobCategoryId;
  openings: number;
  experience: string;
  /** Kept as the comp's shortened string — see NOTES.md. */
  skills: string;
  location: string;
};

/**
 * Open roles. This is the edit point — add, remove, or re-count openings here
 * and the filters and counts follow. Every role currently sits under
 * "development"; Design and Management filter to the empty state until a role
 * exists for them.
 */
export const jobs: Job[] = [
  {
    slug: "flutter-developer",
    title: "Flutter Developer",
    category: "development",
    openings: 4,
    experience: "Minimum of 1 year",
    skills: "Provider, Riverpod or Bloc..",
    location: "Kochi, India",
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    category: "development",
    openings: 2,
    experience: "Minimum of 2 year",
    skills: "HTML, CSS, JavaScript...",
    location: "Kochi, India",
  },
  {
    slug: "machine-learning-intern",
    title: "Machine Learning Intern",
    category: "development",
    openings: 5,
    experience: "Minimum of 3 year",
    skills: "Machine Learning, Python, Data Ana....",
    location: "Kochi, India",
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    category: "development",
    openings: 2,
    experience: "Minimum of 2 year",
    skills: "HTML5, CSS3, JavaScript ....",
    location: "Kochi, India",
  },
];

export const jobsSection = {
  eyebrow: "jobs",
  title: "Where Talent Meets Opportunity",
  subtitle:
    "Join a team driven by creativity, collaboration, and growth. Explore opportunities to work on meaningful projects, build impactful solutions, and grow your career alongside passionate professionals.",
  allPositions: "All Positions",
  moreInfo: "More info",
  empty: "No open positions in this area right now.",
  labels: { openings: "Openings", experience: "Experience", skills: "Skills", location: "Location" },
};

/**
 * Applications go to the studio inbox with the role in the subject. There is no
 * job-detail frame in the design and no applicant tracking system wired up, so
 * this is the honest destination rather than a link to a page that cannot exist.
 */
export function applyHref(job: Job): string {
  const subject = encodeURIComponent(`Application: ${job.title}`);
  return `mailto:${siteConfig.email}?subject=${subject}`;
}
