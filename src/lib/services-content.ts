/** Copy for the /services page (Figma node 935-5485). */

export const servicesHero = {
  title: "Services.",
  intro:
    "Branding, UI/UX, web and app development, AI, and DevOps — the services we've built a genuine track record in, not a menu assembled to look complete.",
  photo: { src: "/images/services/hero.png", alt: "Adpedia work in progress" },
};

export const servicesStatement = {
  headline:
    "We Design and Build Solutions That Are Easy to Use, Technically Sound, and Ready to Scale—Backed by a Process Our Clients Rely On.",
  body: "The goal isn't digitization for its own sake — it's making sure your brand shows up consistently whether someone meets it online, in an app, or in person.",
};

/** The three-step process band. Each step has its own artwork in the comp. */
export const buildBrands = {
  title: "We Build Brands That Perform",
  intro:
    "Three steps, always in the same order — the design has to be right before we build, and the build has to be solid before it goes live everywhere at once.",
  steps: [
    {
      id: "designing",
      label: "Designing",
      image: {
        src: "/images/services/step-designing.png",
        alt: "Tablet showing a dark fintech website interface with trading and liquidity dashboards",
      },
      body: "We start with what your brand actually stands for, then design the visual identity and interfaces that carry it — not a template with your colours swapped in.",
    },
    {
      id: "develop",
      label: "Develop",
      image: {
        src: "/images/services/step-develop.png",
        alt: "Magnifying glass zoomed in on colorful lines of code on a screen",
      },
      body: "The design becomes a working product — web, mobile, e-commerce, or an internal tool — built by developers who stay on the project through launch, not handed off partway.",
    },
    {
      id: "digitalise",
      label: "Digitalise",
      image: {
        src: "/images/services/step-digitalise.png",
        alt: "Glowing abstract app interface panel with navigation icons on a dark background",
      },
      body: "Once it's built, we help it go live properly — integrated with the systems and channels your customers already use, not launched in isolation.",
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
    "Everything below is a service we practice regularly, not a list padded out to look complete.",
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
