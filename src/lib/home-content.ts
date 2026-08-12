/** All Home-page content, transcribed from the Figma design. */

import { projects } from "@/lib/projects";

export const heroContent = {
  title: ["We design brands that", "demand attention"],
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
  body: "Since 2012, we've been shaping meaningful digital solutions through strategy, design, and technology. From websites and mobile apps to enterprise platforms, we help brands grow with clarity, creativity, and purpose. Our approach blends smart thinking with strong execution to deliver experiences that drive real results.",
  cta: { label: "About us", href: "/about" },
};

export const stats = [
  {
    value: "12",
    suffix: "+",
    unit: "Years",
    title: "Industry Experience",
    body: "Over a decade of proven expertise delivering scalable, reliable, and performance-driven digital solutions across multiple industries, helping brands grow through strategy, creativity, and technology.",
  },
  {
    value: "200",
    suffix: "+",
    unit: "Projects",
    title: "Delivered Successfully",
    body: "Hundreds of projects completed with precision and consistency, meeting business goals through thoughtful design, strong execution, and reliable delivery across diverse digital platforms.",
  },
  {
    value: "50",
    suffix: "+",
    unit: "Brands",
    title: "Trusted Worldwide",
    body: "Partnered with brands and businesses across regions, earning trust through consistent quality, transparent collaboration, and results-driven digital solutions delivered to global standards.",
  },
  {
    value: "100",
    suffix: "%",
    unit: "Focus",
    title: "On Quality & Performance",
    body: "A relentless focus on quality and performance ensures every solution is crafted with precision, optimized for speed, scalability, and long-term impact across all digital touchpoints.",
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
  lead: "Real progress doesn't come from chasing tools or trends. It begins with understanding what's holding your brand back, what truly drives it forward, and where meaningful growth lives. We bring strategy, creativity, and technology together to create digital solutions that feel intuitive, purposeful, and built to move your brand with confidence and impact.",
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
    "From strategy to execution, we offer end-to-end digital services designed to create impact, drive growth, and deliver measurable results.",
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
    "Our expertise extends across multiple sectors, creating digital solutions that are relevant, scalable, and results-driven.",
};

export const industries = [
  { name: "EdTech", body: "Intuitive learning platforms designed to engage users and enhance digital education experiences." },
  { name: "IoT", body: "Connected digital ecosystems that enable real-time data, control, and seamless integration." },
  { name: "Fashion", body: "Scalable, secure digital systems built to support complex workflows and long-term growth." },
  { name: "Artificial Intelligence", body: "Intelligent solutions that unlock insights, automate processes, and drive smarter decisions." },
  { name: "Enterprise Technology", body: "Scalable, secure digital systems built to support complex workflows and long-term growth." },
  { name: "Real Estate", body: "Clean, UI-friendly platforms for each market—consistent tone, premium feel, and easy to scan." },
  {
    name: "Healthcare",
    body: "User-centered digital platforms designed to improve accessibility, enhance patient engagement, and ensure secure, compliant interactions across healthcare services and systems.",
    wide: true,
  },
  {
    name: "E-commerce",
    body: "High-performing digital commerce experiences focused on seamless navigation, optimized conversions, and scalable solutions that support growth across products, platforms, and markets.",
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
  name: "Polly Gray",
  role: "Marketing Manager",
  image: "/images/testimonials/featured-polly.png",
  videoLabel: "Play video testimonial from Polly Gray",
};

export const testimonials = [
  {
    quote: "From concept to execution, the process was smooth and collaborative. The final outcome exceeded our expectations.",
    name: "Joey Tribbiani",
    role: "Founder & CEO",
    avatar: "/images/testimonials/joey.png",
  },
  {
    quote: "They didn't just design a website—they created an experience that aligned perfectly with our brand and business goals.",
    name: "Rachel Green",
    role: "Brand Strategist",
    avatar: "/images/testimonials/rachel.png",
  },
  {
    quote: "Clear communication, strong creative thinking, and reliable delivery. A partner we'd gladly work with again.",
    name: "Chandler Bing",
    role: "Operations Head",
    avatar: "/images/testimonials/chandler.png",
  },
  {
    quote: "The attention to detail and user experience truly stood out. Every interaction feels thoughtful and well-crafted.",
    name: "Monica Geller",
    role: "Marketing Manager",
    avatar: "/images/testimonials/monica.png",
  },
];

export const closingCta = {
  title: ["Every Great Brand Begins", "with a Great Conversation."],
  subtitle: "We listen, collaborate, and uncover insights that turn ideas into meaningful brand experiences.",
  cta: { label: "Schedule a call", href: "/contact" },
};
