/** Global site configuration: metadata, navigation, footer, contact. */

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

export type MegaKey = "service" | "portfolio";

export type NavLink = {
  label: string;
  href: string;
  /** When set, this item opens a full-width mega menu instead of a simple dropdown. */
  mega?: MegaKey;
  children?: { label: string; href: string; description?: string }[];
};

export const serviceLinks = [
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile App Development", href: "/services/mobile-app-development" },
  { label: "AI & Data Science", href: "/services/ai-data-science" },
  { label: "Product Development", href: "/services/product-development" },
  { label: "DevOps Services", href: "/services/devops" },
];

export const portfolioLinks = [
  { label: "All Projects", href: "/portfolio" },
  { label: "Brand Design", href: "/portfolio?filter=brand-design" },
  { label: "Web Development", href: "/portfolio?filter=web-development" },
  { label: "App Development", href: "/portfolio?filter=app-development" },
];

export const mainNav: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio", mega: "portfolio", children: portfolioLinks },
  { label: "Service", href: "/services", mega: "service", children: serviceLinks },
  { label: "Career", href: "/careers" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Rich content for the Service mega menu (icon keys map to lucide-react icons). */
export const serviceMenu = {
  eyebrow: "Service",
  title: "What we do best",
  description: "End-to-end digital services designed to create impact and drive growth.",
  viewAll: { label: "View all services", href: "/services" },
  items: [
    { label: "UI/UX Design", href: "/services/ui-ux-design", icon: "PenTool", description: "Intuitive, accessible interfaces and design systems." },
    { label: "Web Development", href: "/services/web-development", icon: "Code2", description: "Fast, scalable, secure websites and web apps." },
    { label: "Mobile App Development", href: "/services/mobile-app-development", icon: "Smartphone", description: "iOS & Android apps built for growth." },
    { label: "AI & Data Science", href: "/services/ai-data-science", icon: "Sparkles", description: "Intelligent systems that unlock insight." },
    { label: "Product Development", href: "/services/product-development", icon: "Rocket", description: "Lean MVPs built to launch and scale fast." },
    { label: "DevOps Services", href: "/services/devops", icon: "Server", description: "Reliable delivery, cloud, and automation." },
  ],
} as const;

/** Rich content for the Portfolio mega menu. */
export const portfolioMenu = {
  eyebrow: "Selected work",
  title: "Stories we've built",
  description: "Projects designed to solve problems, create impact, and elevate brands.",
  viewAll: { label: "View all projects", href: "/portfolio" },
  filters: portfolioLinks,
  featured: [
    { category: "Web Development", title: "Orange Flex", href: "/portfolio", image: "/images/projects/website-design.png" },
    { category: "App Development", title: "Dotarion App", href: "/portfolio", image: "/images/projects/mobile-app.png" },
    { category: "Brand Design", title: "Browno Studio", href: "/portfolio", image: "/images/projects/brand-elegant.png" },
  ],
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
  {
    title: "Services",
    links: [
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Web Development", href: "/services/web-development" },
      { label: "Mobile App Development", href: "/services/mobile-app-development" },
      { label: "AI & Data Science", href: "/services/ai-data-science" },
      { label: "DevOps Services", href: "/services/devops" },
    ],
  },
];

export const offices = [
  {
    country: "India",
    address: "Chinnangath Complex, Room No: VIII/318, Ground Floor, Thommana, Irinjalakuda, Thrissur",
  },
  { country: "New Zealand", address: "G06/430 Queen Street, Auckland CBD, Auckland 1010, New Zealand" },
  { country: "Singapore", address: "Block 681a, Unit 02-11 Woodlands Drive 62, Singapore -731681" },
];
