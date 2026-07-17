/** All Home-page content, transcribed from the Figma design. */

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
  title: "Smarter solutions with Ai",
  subtitle:
    "Intelligent systems built to drive clarity, improve performance, and accelerate sustainable business growth through data-driven decisions.",
  cta: { label: "View AI capabilities", href: "/services/ai-data-science" },
};

export const clarityContent = {
  eyebrow: "Digital growth starts with clarity, not noise.",
  leadStrong:
    "Real progress doesn't come from chasing tools or trends. It begins with understanding what's holding your brand back,",
  leadMuted:
    " what truly drives it forward, and where meaningful growth lives. We bring strategy, creativity, and technology together to create digital solutions that feel intuitive, purposeful, and built to move your brand with confidence and impact.",
  cta: { label: "Let's build something meaningful", href: "/contact" },
  cards: [
    {
      title: "Conversion",
      body: "Design that moves people to act. We shape journeys that guide, persuade emotionally, and shape every experience that follows.",
      image: "/images/clarity/conversion.png",
    },
    {
      title: "Technology",
      body: "Technology should simplify, not complicate. We build scalable, future-ready digital foundations that work seamlessly, adapt quickly, and support long-term growth.",
      image: "/images/clarity/technology.png",
    },
    {
      title: "Creativity",
      body: "Creativity with intent. Every idea is crafted to connect, differentiate your brand, and turn attention into lasting momentum.",
      image: "/images/clarity/creativity.jpeg",
    },
  ],
};

export const servicesSection = {
  eyebrow: "Service",
  title: "What we do best",
  subtitle:
    "From strategy to execution, we offer end-to-end digital services designed to create impact, drive growth, and deliver measurable results.",
  cta: { label: "Schedule a call", href: "/contact" },
};

export type ServiceItem = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  images: { src: string; alt: string }[];
};

export const serviceItems: ServiceItem[] = [
  {
    id: "brand-design",
    title: "Brand Design",
    body: "We craft distinctive visual identities that reflect your brand's essence and create lasting impressions across every touchpoint.",
    tags: ["Logo Design", "Brand Assets", "Social Media"],
    images: [
      { src: "/images/services/brand-v-icon.jpeg", alt: "Glowing brand app icon" },
      { src: "/images/services/brand-cybersabra.png", alt: "CyberSabra brand collateral" },
      { src: "/images/services/brand-flex.png", alt: "Flex brand website" },
    ],
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    body: "We define positioning, messaging, and brand architecture that align your business goals with what your audience truly values.",
    tags: ["Positioning", "Messaging", "Research"],
    images: [
      { src: "/images/services/brand-cybersabra.png", alt: "Brand strategy collateral" },
      { src: "/images/services/brand-flex.png", alt: "Brand strategy website" },
      { src: "/images/services/brand-v-icon.jpeg", alt: "Brand mark exploration" },
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    body: "We turn complex ideas into intuitive, accessible interfaces — from wireframes and prototypes to polished, production-ready design systems.",
    tags: ["Wireframes", "Prototyping", "Design Systems"],
    images: [
      { src: "/images/services/brand-flex.png", alt: "UI design showcase" },
      { src: "/images/services/brand-cybersabra.png", alt: "UX exploration" },
      { src: "/images/services/brand-v-icon.jpeg", alt: "App interface" },
    ],
  },
  {
    id: "web-development",
    title: "Web Development",
    body: "We build fast, scalable, and secure websites and web apps engineered for performance, maintainability, and long-term growth.",
    tags: ["Next.js", "Headless CMS", "E-commerce"],
    images: [
      { src: "/images/services/brand-flex.png", alt: "Web development project" },
      { src: "/images/services/brand-cybersabra.png", alt: "Web app interface" },
      { src: "/images/services/brand-v-icon.jpeg", alt: "Product website" },
    ],
  },
  {
    id: "app-development",
    title: "App Development",
    body: "We create scalable mobile apps focused on clarity, usability, and seamless interaction across iOS and Android platforms.",
    tags: ["iOS", "Android", "Cross-platform"],
    images: [
      { src: "/images/services/brand-v-icon.jpeg", alt: "Mobile app icon" },
      { src: "/images/services/brand-cybersabra.png", alt: "App collateral" },
      { src: "/images/services/brand-flex.png", alt: "App landing page" },
    ],
  },
  {
    id: "mvp-development",
    title: "MVP Development",
    body: "We help startups validate ideas fast with lean, research-driven MVPs — built to launch quickly and scale confidently.",
    tags: ["Discovery", "Rapid Build", "Iteration"],
    images: [
      { src: "/images/services/brand-cybersabra.png", alt: "MVP concept" },
      { src: "/images/services/brand-flex.png", alt: "MVP web app" },
      { src: "/images/services/brand-v-icon.jpeg", alt: "MVP brand" },
    ],
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    body: "We grow brands with performance marketing, SEO, and content strategy designed to reach the right audience and convert.",
    tags: ["SEO", "Performance", "Content"],
    images: [
      { src: "/images/services/brand-flex.png", alt: "Marketing campaign" },
      { src: "/images/services/brand-cybersabra.png", alt: "Campaign assets" },
      { src: "/images/services/brand-v-icon.jpeg", alt: "Ad creative" },
    ],
  },
  {
    id: "ai-data-solutions",
    title: "AI & Data Solutions",
    body: "We build intelligent systems and data pipelines that unlock insights, automate processes, and drive smarter decisions.",
    tags: ["Machine Learning", "Analytics", "Automation"],
    images: [
      { src: "/images/services/brand-cybersabra.png", alt: "AI dashboard" },
      { src: "/images/services/brand-v-icon.jpeg", alt: "Data product" },
      { src: "/images/services/brand-flex.png", alt: "Analytics platform" },
    ],
  },
];

export const storiesSection = {
  eyebrow: "Projects",
  title: "Stories we've built",
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

export const projectStories: ProjectStory[] = [
  {
    brand: "Flex",
    title: "Website Design",
    body: "We design modern, user-focused websites that blend aesthetics with usability to drive engagement and conversions.",
    tags: ["UI Design", "UX Design", "Responsive Layout", "+more"],
    image: { src: "/images/projects/website-design.png", alt: "Orange Flex website on a laptop" },
  },
  {
    brand: "Dotarion",
    title: "Mobile App Design",
    body: "We create intuitive mobile app experiences focused on clarity, usability, and seamless interaction across platforms.",
    tags: ["iOS", "Android", "UI/UX", "Responsive Layout", "+more"],
    image: { src: "/images/projects/mobile-app.png", alt: "Dotarion mobile app screens" },
  },
  {
    brand: "Browno",
    title: "Brand Experience",
    body: "We shape elegant, cohesive brand experiences that translate strategy into memorable digital products people love.",
    tags: ["Brand Design", "Art Direction", "Web", "+more"],
    image: { src: "/images/projects/brand-elegant.png", alt: "Browno brand website concept" },
  },
  {
    brand: "Nova",
    title: "E-commerce Platform",
    body: "We build high-performing commerce experiences with seamless navigation, optimized conversions, and scalable foundations.",
    tags: ["E-commerce", "Web Development", "CRO", "+more"],
    image: { src: "/images/projects/ecommerce-vr.png", alt: "Immersive e-commerce concept" },
  },
];

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
  title: ["Every great brand begins", "with a great conversation."],
  subtitle: "We listen, collaborate, and uncover insights that turn ideas into meaningful brand experiences.",
  cta: { label: "Schedule a call", href: "/contact" },
};
