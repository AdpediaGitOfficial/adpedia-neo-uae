/** Copy for the /services page (Figma node 935-5485). */

export const servicesHero = {
  title: "Services.",
  intro:
    "We simplify complex challenges into user-friendly, scalable, and trustworthy solutions that drive measurable business growth.",
  photo: { src: "/images/services/hero.png", alt: "Adpedia work in progress" },
};

export const servicesStatement = {
  headline:
    "We Design and Build Solutions That Are Easy to Use, Technically Sound, and Ready to Scale—Backed by a Process Our Clients Rely On.",
  body: "We welcome the opportunities of digitization for your organization's digital transformation to reach business goals. We create your brand by integrating digital and physical activities across channels in all possible formats.",
};

/** The three-step process band. Each step has its own artwork in the comp. */
export const buildBrands = {
  title: "We Build Brands That Perform",
  intro:
    "From strategy and design to development and digital transformation, we create scalable solutions that help brands grow with confidence.",
  steps: [
    {
      id: "designing",
      label: "Designing",
      image: {
        src: "/images/services/step-designing.png",
        alt: "Tablet showing a dark fintech website interface with trading and liquidity dashboards",
      },
      body: "We craft your brand story with influential designs that engage your audience. Our talented designers create a radiant profile for your company online, helping you stand out with superior user experience and website design. We reflect your brand values in every detail.",
    },
    {
      id: "develop",
      label: "Develop",
      image: {
        src: "/images/services/step-develop.png",
        alt: "Magnifying glass zoomed in on colorful lines of code on a screen",
      },
      body: "Our expert developers create impactful digital solutions for web, mobile, e-commerce, and enterprise applications. We employ best practices to develop cutting-edge technology solutions. Contact us for dedicated developers and top-notch services.",
    },
    {
      id: "digitalise",
      label: "Digitalise",
      image: {
        src: "/images/services/step-digitalise.png",
        alt: "Glowing abstract app interface panel with navigation icons on a dark background",
      },
      body: "We welcome digitization opportunities for your organization's transformation to achieve goals. We integrate digital and physical activities across channels. Our experts help you deliver a quick, safe, and lasting experience to customers.",
    },
  ],
};

/**
 * The services list. This is a dark section on /services with its own layout —
 * eyebrow left, list centre, one image right — not the light numbered accordion
 * the home page uses.
 */
export const whatWeDo = {
  eyebrow: "What We Do",
  title: "Everything You Need to Build Digitally",
  intro:
    "From UI/UX design to web, mobile, AI, and data solutions, we cover the entire product lifecycle with clarity and confidence.",
  /**
   * One image per service, shown beside the active accordion row and keyed by
   * the service `id` from `serviceItems`. Add an entry as each service's art
   * arrives; any service without one falls back to `fallbackImage`, so the slot
   * is never empty while the set is being filled in.
   *
   * The frame is portrait `aspect-[556/682]` (~0.815), so supply portrait art at
   * roughly that ratio and it fills without cropping.
   */
  images: {
    "ui-ux-design": {
      src: "/images/services/what-we-do.png",
      alt: "AVIS chauffeur-booking app shown on a phone",
    },
    "web-development": {
      src: "/images/services/website-what-we-do.jpg",
      alt: "Real-estate website shown on a laptop",
    },
    "mobile-app-development": {
      src: "/images/services/mob-app.jpg",
      alt: "Voice-assistant app shown on a phone",
    },
    "product-development": {
      src: "/images/services/product-dev.jpg",
      alt: "Analytics dashboard shown on a tablet",
    },
    "ai-data-science": {
      src: "/images/services/ai-datasceince.jpg",
      alt: "AI health-assistant app shown on a phone",
    },
  } as Record<string, { src: string; alt: string }>,
  /** Shown for any service that has no entry in `images` yet. */
  fallbackImage: {
    src: "/images/services/what-we-do.png",
    alt: "A recent Adpedia interface design",
  },
};
