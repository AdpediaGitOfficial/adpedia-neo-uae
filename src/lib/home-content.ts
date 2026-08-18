/** All Home-page content, transcribed from the Figma design. */

import { projects } from "@/lib/projects";

export const heroContent = {
  title: ["Engineering the backbone", "of the digital age"],
  subtitle:
    "From strategy to stunning visuals, we craft digital experiences that connect, convert, and leave a lasting impact.",
  cta: { label: "Explore our work", href: "/portfolio" },
};

/** Marquee of showcase mockups beneath the hero. */
export const heroShowcase = [
  { src: "/images/hero/shape-elegant.png", alt: "Elegant fashion brand website concept" },
  { src: "/images/hero/lumio-tablets.png", alt: "Lumio product design shown on tablets" },
  { src: "/images/hero/billie-phones.png", alt: "Billie Duvalle mobile app screens" },
  { src: "/images/hero/digital-presence.png", alt: "Digital presence brand website" },
  { src: "/images/hero/billie-desktop.png", alt: "Billie Duvalle desktop showcase" },
  { src: "/images/hero/flex-laptop.png", alt: "Orange Flex website on a laptop" },
  { src: "/images/hero/pricing-green.png", alt: "Pricing plans product page" },
  { src: "/images/hero/lumio-tablets-2.png", alt: "Lumio dashboard mockups" },
];

export const trustedLogos = [
  { name: "Ahura International", src: "/images/logos/ahura.png" },
  { name: "Tyco", src: "/images/logos/tyco.png" },
  { name: "Ntigra", src: "/images/logos/ntigra.png" },
  { name: "Medsmart", src: "/images/logos/medsmart.png" },
  { name: "Relitix", src: "/images/logos/relitix.png" },
  { name: "Aerologic Systems", src: "/images/logos/aerologic.png" },
  { name: "KreativeSigns", src: "/images/logos/kreativesigns.png" },
];

export const statsIntro = {
  title: "Where Digital Experiences Perform",
  body: "Since 2012, we've built websites, apps, and platforms for clients who needed more than a vendor — strategy and execution from the same team, so nothing gets lost in a handoff.",
  cta: { label: "About us", href: "/about" },
};

export const stats = [
  {
    value: "12",
    suffix: "+",
    unit: "Years",
    title: "Industry Experience",
    body: "Twelve years in, across industries with genuinely different constraints — what a fintech launch needs looks nothing like what a retail brand does.",
  },
  {
    value: "200",
    suffix: "+",
    unit: "Projects",
    title: "Delivered Successfully",
    body: "200+ projects shipped, from single-page brand sites to multi-year platform builds — each one held to the same bar regardless of size.",
  },
  {
    value: "50",
    suffix: "+",
    unit: "Brands",
    title: "Trusted Worldwide",
    body: "Clients across India, the UAE, Singapore, and beyond — most come back for a second project once the first one ships.",
  },
  {
    value: "100",
    suffix: "%",
    unit: "Focus",
    title: "On Quality & Performance",
    body: "Every build gets the same scrutiny on load speed and code quality — not just the ones the client happens to be watching closely.",
  },
];

export const aiContent = {
  title: "Smarter Solutions with AI",
  subtitle:
    "Intelligent systems built to drive clarity, improve performance, and accelerate sustainable business growth through data-driven decisions.",
  cta: { label: "View AI capabilities", href: "/services/ai-data-science" },
};

export const clarityContent = {
  eyebrow: "Digital growth starts with clarity, not noise.",
  lead: "Progress doesn't come from chasing the newest tool or trend. It comes from being specific about what's actually holding a brand back, then bringing strategy, design, and engineering to bear on that one problem instead of a generic checklist.",
  leadSecondary:
    "That's why every project starts with a real conversation about what's actually broken, not a discovery deck. The work that follows gets scoped around that one answer, not a menu of services we'd like to sell you.",
  cta: { label: "Let's build something meaningful", href: "/contact" },
  // Card order top→bottom. The middle (Technology) is the anchor; Conversion spreads
  // up and Creativity spreads down from it on scroll.
  cards: [
    {
      title: "Conversion",
      body: "Results are intentional. Through thoughtful design and smart user journeys, we turn attention into action and experiences into measurable outcomes.",
      image: "/images/clarity/conversion.png",
    },
    {
      title: "Technology",
      body: "Technology should simplify, not complicate. We build scalable, future-ready digital foundations that work seamlessly, adapt quickly, and support long-term growth.",
      image: "/images/clarity/technology.png",
    },
    {
      title: "Creativity",
      body: "Creativity isn't decoration—it's direction. We turn ideas into compelling brand stories that communicate clearly, connect emotionally, and shape every experience that follows.",
      image: "/images/clarity/creativity.png",
    },
  ],
} as const;

export const servicesSection = {
  eyebrow: "Service",
  title: "What We Do Best",
  subtitle:
    "Seven services, one team — so a project doesn't lose momentum moving from strategy to design to build.",
  cta: { label: "Schedule a call", href: "/contact" },
};

export type ServiceItem = {
  id: string;
  title: string;
  body: string;
  tags: string[];
};

export const serviceItems: ServiceItem[] = [
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    body: "We turn complex ideas into intuitive, accessible interfaces — from wireframes and prototypes to polished, production-ready design systems.",
    tags: ["Wireframes", "Prototyping", "Design Systems"],
  },
  {
    id: "web-development",
    title: "Web Development",
    body: "We build fast, scalable, and secure websites and web apps engineered for performance, maintainability, and long-term growth.",
    tags: ["Next.js", "Headless CMS", "E-commerce"],
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    body: "We create scalable mobile apps focused on clarity, usability, and seamless interaction across iOS and Android platforms.",
    tags: ["iOS", "Android", "Cross-platform"],
  },
  {
    id: "product-development",
    title: "Product Development",
    body: "We help teams validate ideas fast with lean, research-driven MVPs — built to launch quickly and scale confidently.",
    tags: ["Discovery", "Rapid Build", "Iteration"],
  },
  {
    id: "ai-data-science",
    title: "AI & Data Science",
    body: "We build intelligent systems and data pipelines that unlock insights, automate processes, and drive smarter decisions.",
    tags: ["Machine Learning", "Analytics", "Automation"],
  },
  {
    id: "devops-services",
    title: "DevOps Services",
    body: "We set up reliable delivery pipelines, cloud infrastructure, and automation so your teams ship faster with confidence.",
    tags: ["CI/CD", "Cloud", "Monitoring"],
  },
];

export const storiesSection = {
  eyebrow: "Projects",
  title: "Stories We've Built",
  subtitle: "Every project is a collaboration—designed to solve problems, create impact, and elevate brands.",
  cta: { label: "Explore projects", href: "/portfolio" },
};

export type ProjectStory = {
  brand: string;
  title: string;
  body: string;
  tags: string[];
  image: { src: string; alt: string };
};

/**
 * Derived from the canonical list in `lib/projects.ts` — add or edit a project
 * there, not here. Shape is preserved for the Stories rail.
 */
export const projectStories: ProjectStory[] = projects.map((project) => ({
  brand: project.name,
  title: project.type,
  body: project.summary,
  tags: project.tags,
  image: project.thumb,
}));

export const industriesSection = {
  eyebrow: "Industries",
  title: "Impact Across Industries",
  subtitle:
    "Different sectors bring different constraints. Here's where we've built enough of a track record to know what actually matters in each.",
};

export const industries = [
  { name: "EdTech", body: "Intuitive learning platforms designed to engage users and enhance digital education experiences." },
  { name: "Fintech", body: "Compliance-heavy products where a single broken flow costs real trust, not just a bad review." },
  { name: "Fashion", body: "Fast-moving storefronts and lookbooks that keep pace with a season's release schedule without a redesign each time." },
  { name: "Logistics", body: "Tracking and fulfillment systems that stay accurate when order volume spikes without warning." },
  { name: "Hospitality", body: "Booking and guest experiences that hold up across every device, language, and time zone." },
  { name: "Real Estate", body: "Clean, UI-friendly platforms for each market—consistent tone, premium feel, and easy to scan." },
  {
    name: "Healthcare",
    body: "Patient-facing platforms built with accessibility and data compliance as requirements from day one, not an afterthought.",
    wide: true,
  },
  {
    name: "E-commerce",
    body: "Storefronts built to convert under real traffic — fast checkout, clean navigation, and infrastructure that holds during a sale.",
    wide: true,
  },
];

export const testimonialsSection = {
  eyebrow: "Testimonial",
  title: "Voices That Matter",
  subtitle:
    "Stories and experiences shared by clients who trusted us with their vision and partnered with us to turn ideas into meaningful results.",
};

export const featuredTestimonial = {
  quote:
    "Working with this team was effortless. They understood our vision clearly and delivered a design that felt modern, intuitive, and purpose-driven.",
  name: "Meera Anand",
  role: "Marketing Manager",
  image: "/images/testimonials/featured-polly.png",
  videoLabel: "Play video testimonial from Meera Anand",
};

export const testimonials = [
  {
    quote: "Shinelal and the team at Adpedia got what we needed right away, and didn't stop until it actually worked the way we wanted — not just the way it looked on paper. Every time we reached out, someone got back to us fast. We're looking forward to doing more with them.",
    name: "Gopidas Nair",
    role: "Founder & CEO, Eduplan UAE",
    avatar: "/images/testimonials/gopidas-nair.jpg",
  },
  {
    quote: "Adpedia built our corporate website, and it was a genuinely easy process from start to finish. They listened to what we actually wanted instead of pushing their own template, and were always around when we needed help. The site looks sharp and feels like it really represents Afrizon. Happy to recommend them to anyone.",
    name: "Tabi Samuel Olickal",
    role: "Director, Afrizon Pte Ltd",
    avatar: "/images/testimonials/tabi-samuel-olickal.jpg",
  },
  {
    quote: "Clear communication, strong creative thinking, and reliable delivery. A partner we'd gladly work with again.",
    name: "James Okafor",
    role: "Operations Head",
    avatar: "/images/testimonials/chandler.png",
  },
  {
    quote: "The attention to detail and user experience truly stood out. Every interaction feels thoughtful and well-crafted.",
    name: "Elena Rossi",
    role: "Marketing Manager",
    avatar: "/images/testimonials/monica.png",
  },
];

export const closingCta = {
  title: ["Every Great Brand Begins", "with a Great Conversation."],
  subtitle: "We listen, collaborate, and uncover insights that turn ideas into meaningful brand experiences.",
  cta: { label: "Schedule a call", href: "/contact" },
};
