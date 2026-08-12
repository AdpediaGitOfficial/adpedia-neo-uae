/**
 * Copy for the `/services/<slug>` detail pages.
 *
 * Keyed by the `slug` in `services.ts`, so a service and its detail page can
 * never drift apart. A service with no entry here has no detail page — the
 * route's `generateStaticParams` enumerates this map, not the service list, so
 * unwritten pages 404 rather than shipping a thin shell. Add an entry as each
 * comp and its copy arrive.
 *
 * The two pages built so far don't have the same shape: UI/UX has a platforms
 * row and a card-style process; Web Development has a capabilities grid and a
 * numbered-list process. So the section blocks are optional and `process`
 * carries a `variant` — the page renders whatever a given service provides.
 *
 * Sources: Figma `935:6100` (UI/UX) and `935:6509` (Web Development). Every
 * string below is taken from those frames; nothing here is invented.
 */

export type ProcessStep = {
  title: string;
  /** Optional: the list-variant comp only details the first step. */
  body?: string;
};

/** A media slot on a capability card: a framed photo, or a glyph on a tile. */
type CardMedia = { src: string; alt: string };

export type Capability = {
  title: string;
  body: string;
  /**
   * How the card renders in the bento:
   * - `overlay`: photo fills the card, title/body sit over a dark scrim.
   * - `banner`: photo banner on top, title/body below on a light surface.
   * - `icon`: glyph on a light surface, title/body below.
   */
  variant: "overlay" | "banner" | "icon";
  /** Photo for `overlay`/`banner`, OR the glyph for `icon`. */
  image?: CardMedia;
  icon?: CardMedia;
};

export type ServiceDetail = {
  /** Kicker above the page title. */
  eyebrow: string;
  /** Display title. The comp sets it with a trailing period. */
  title: string;
  /** Short intro, set right of the title in the comp. */
  intro: string;
  /**
   * Hero art. `src` is the poster image (also shown to reduced-motion users);
   * `video` is an autoplay/loop/muted MP4 that plays over it when present.
   */
  hero: { src: string; alt: string; video?: string };
  /** The large centred statement under the hero image. */
  statement: string;
  /** Supporting paragraph under the statement. */
  body: string;
  /** Platforms the service ships to, as a card row. Omitted when the comp has none. */
  platforms?: { label: string; image: { src: string; alt: string } }[];
  /**
   * Platforms grid: device platforms as icon + label tiles inside one light
   * panel (Mobile App Development). `icon` is a key into the section's lucide map.
   */
  platformGrid?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { label: string; icon: string }[];
  };
  /**
   * Services bento: image + copy per service on a dark band (Mobile App
   * Development). `tag` renders the small accent chip the comp puts on one card.
   */
  bento?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; body: string; image: { src: string; alt: string }; tag?: string }[];
  };
  /**
   * A light row of icon cards (Mobile App Development's "Our services"). No
   * eyebrow in the comp; `icon` is a key into the section's lucide map.
   */
  serviceCards?: {
    title: string;
    intro: string;
    items: { title: string; body: string; icon: string }[];
  };
  /**
   * Feature cards: icon-over-title-over-body, centred, on a light band (AI &
   * Data Science's "Transforming Data"). `icon` is a lucide key.
   */
  featureCards?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; body: string; icon: string }[];
  };
  /**
   * The orbital diagram (AI & Data Science): service nodes in a ring around a
   * central core on a dark band. Nodes are listed clockwise from the top. Reflows
   * to a plain grid below `lg`. `icon` is a lucide key.
   */
  orbital?: {
    eyebrow: string;
    title: string;
    intro: string;
    /** `src` is the poster (and reduced-motion still); `video` plays over it. */
    core: { src: string; alt: string; video?: string };
    items: { label: string; icon: string }[];
  };
  /**
   * A dark band of icon + label expertise chips (AI & Data Science's "We Apply").
   * No eyebrow in the comp; `icon` is a lucide key.
   */
  expertise?: {
    title: string;
    items: { label: string; icon: string }[];
  };
  /**
   * "Why choose us" principles on a light band (Product Development): the
   * eyebrow/title/intro sit in a left column beside a stack of compact cards on
   * the right, each an image tile plus a paragraph. The comp gives these cards
   * **no title** — the paragraph is the whole card — so `items` carries no
   * `title`, and the stack is staggered horizontally rather than stacked flush.
   */
  principles?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { body: string; image: { src: string; alt: string } }[];
  };
  /**
   * The MVP services bento on a dark band (Product Development): image + label +
   * description per service.
   *
   * Unlike every other image block, the artwork here is deliberately of mixed
   * proportions (a tall rocket render, two wide screenshots, a square graphic),
   * so each image carries its intrinsic `width`/`height` and renders at its own
   * aspect ratio instead of being cropped into a shared one.
   */
  mvpBento?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: {
      title: string;
      body: string;
      image: { src: string; alt: string; width: number; height: number };
    }[];
  };
  /** Capabilities grid + social proof. Omitted when the comp has none. */
  capabilities?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Capability[];
    testimonial: {
      quote: string;
      author: string;
      role: string;
      avatar: { src: string; alt: string };
    };
    stat: {
      value: string;
      label: string;
      rating: string;
      avatars: { src: string; alt: string }[];
    };
  };
  /** The process band. Omitted when the comp has none (Mobile App Development). */
  process?: {
    eyebrow: string;
    title: string;
    intro: string;
    /**
     * `cards`: steps as cards beside a tall image (UI/UX).
     * `list`: steps as a numbered vertical list (Web Development).
     * `grid`: numbered cards in a 2-up grid (AI & Data Science).
     */
    variant: "cards" | "list" | "grid";
    /** Only the card variant uses a side image. */
    image?: { src: string; alt: string };
    /** Rendered in order and numbered 01, 02, 03… — the order is the process. */
    steps: ProcessStep[];
  };
  /**
   * Capability tabs (DevOps): a tab bar over a panel that pairs an illustrated
   * summary card with a numbered accordion.
   *
   * The comp draws three tabs but only writes the panel for the first, so only
   * that one is here — copy is never invented in this file. `tabs` is a list, and
   * the bar renders itself only once a second entry exists, so filling in the
   * other two is a data change with no component change. Numbering ("01.", "02.")
   * is generated from position rather than stored.
   */
  capabilityTabs?: {
    eyebrow: string;
    title: string;
    intro: string;
    tabs: {
      label: string;
      /**
       * `icon` is a lucide key. The comp supplies a single 93×103 raster glyph,
       * reused across all three tabs — it renders soft on any retina display at
       * that size, and one icon for three different services says nothing. Per
       * the project's one-icon-family rule it maps to lucide, which is sharp at
       * any density and lets each tab carry its own mark.
       */
      summary: { title: string; body: string; icon: string };
      /** `body` is optional — the comp only expands the first row. */
      items: { title: string; body?: string }[];
    }[];
  };
  /**
   * Proof band (DevOps): a centred heading over three stats, a row of platform
   * partner logos, and a closing CTA. No eyebrow in the comp.
   *
   * Stat numerals use `display-lg` (64px) — the comp sets 63px, and the site's
   * other stat treatment (`Stats.tsx`) uses a bespoke `3.75rem` that the design
   * system carries as scoped legacy debt and forbids spreading to new files.
   */
  proof?: {
    title: string;
    intro: string;
    stats: { value: string; suffix: string; label: string; body: string }[];
    /**
     * `width`/`height` are the comp's *rendered* size for each mark, not the
     * file's. The four logos have very different aspect ratios (Huawei is 4.3:1,
     * AWS 1.7:1), so a shared box would size them inconsistently — the comp
     * balances them optically instead, and these numbers carry that judgement.
     */
    partners: { src: string; alt: string; width: number; height: number }[];
    cta: { label: string; href: string };
  };
  /**
   * Industries served (DevOps): two columns of compact rows inside one light
   * panel — icon, label, and a line of substance each.
   *
   * `icon` is a key into the section's lucide map; the comp draws small raster
   * glyphs, and per the project convention those map to the one icon family
   * rather than becoming eight more exports.
   *
   * `body` is optional, and **hidden below `sm`** — at two columns on a phone
   * each row is far too narrow for a sentence. Phones get a scannable list of
   * the industries; the substance appears from tablet up. See the note on
   * `ServiceIndustries` for why the grid never drops to one column.
   */
  industries?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { label: string; icon: string; body?: string }[];
  };
  /**
   * Technology stack (DevOps): an accordion of tool categories on a dark band,
   * the open one revealing a grid of tool chips.
   *
   * `logo` is optional: only the containerisation marks were in the comp, so the
   * other categories render name-only chips rather than blocking on artwork.
   * `tools` is optional too — a category without any still renders as a plain
   * row rather than a dead toggle, the same rule as everywhere else here.
   */
  toolStack?: {
    eyebrow: string;
    title: string;
    intro: string;
    categories: {
      label: string;
      tools?: { name: string; logo?: { src: string; alt: string } }[];
    }[];
  };
  /**
   * "Why choose us" (DevOps): numbered reason cards on a light band, followed by
   * a metrics panel with its own CTA. No eyebrow in the comp.
   */
  whyUs?: {
    title: string;
    intro: string;
    reasons: { title: string; body: string }[];
    metrics: {
      title: string;
      stats: { value: string; suffix: string; label: string }[];
      cta: { label: string; href: string };
    };
  };
  /**
   * Engagement models (DevOps): an accordion on a dark band, a dot beside each
   * label. `body` is optional — the comp writes only the first of five.
   */
  engagementModels?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { label: string; body?: string }[];
  };
  /**
   * Challenges and their answers (DevOps): four cards, two up, each pairing a
   * problem with a solution set in an inset panel.
   */
  challenges?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; body: string; solution: string }[];
  };
  /**
   * Delivery process (DevOps): steps down a rail with the selected step's detail
   * beside them. `body` is optional — the comp details only the first step, and
   * the rail stays static until a second one gains a body.
   */
  deliveryProcess?: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { title: string; body?: string }[];
  };
  /** Closing work grid. Omitted when the comp has none (AI & Data Science). */
  work?: { eyebrow: string; title: string };
  /** Meta description for the route. */
  description: string;
};

export const serviceDetails: Record<string, ServiceDetail> = {
  "ui-ux-design": {
    eyebrow: "Services.",
    title: "UI/UX Design.",
    intro:
      "We aim for simplicity, making things effortless. Our goal is to eliminate complexity for a seamless experience. Ease is key to navigating our platform.",
    hero: {
      src: "/images/services/uiux/hero.png",
      video: "/videos/services/ui-ux-design.mp4",
      alt: "Iridescent glass ribbon spiraling through darkness, rendered in three dimensions",
    },
    statement:
      "Outstanding Design, Rich in Meaning and Visually Appealing, Results from Exceptional Creative Thinking.",
    body: "Our team of professionals can respond to your requirements promptly and provide a design that compliments your company's ideals. We believe in creating an engaging solution by being unambiguous and adhering to timeframes.",
    platforms: [
      { label: "IOS Apps", image: { src: "/images/services/uiux/platform-ios.png", alt: "Apple logo icon representing iOS" } },
      { label: "Android Apps", image: { src: "/images/services/uiux/platform-android.png", alt: "Android robot mascot icon" } },
      { label: "Web Apps", image: { src: "/images/services/uiux/platform-web.png", alt: "Globe and browser window icon representing the web" } },
      { label: "Wearables", image: { src: "/images/services/uiux/platform-wearables.png", alt: "Smartwatch icon with a heart-rate graph" } },
    ],
    process: {
      eyebrow: "Our UI/UX design process",
      title: "How We Turn Ideas into Intuitive Experiences",
      intro:
        "Our design process blends strategy, creativity, and usability to deliver intuitive interfaces that solve real user problems and drive engagement.",
      variant: "cards",
      image: {
        src: "/images/services/uiux/process.png",
        alt: "Brand identity system laid out across screens, print, and environmental mockups",
      },
      steps: [
        {
          title: "Wireframes",
          body: "A solid wireframe is the foundation of your app and the key to better user experience, ease of navigation, and hierarchy. The schematic rendering of the app would show how it will look in the future.",
        },
        {
          title: "Prototype",
          body: "This clickable miniature version of your product that includes semantics, a variety of settings, and software programming is essential to assess and improve the precision of the product.",
        },
        {
          title: "Visual Design",
          body: "A solid wireframe is the foundation of your app and the key to better user experience, ease of navigation, and hierarchy. The schematic rendering of the app would show how it will look in the future.",
        },
      ],
    },
    work: { eyebrow: "see works", title: "Real Projects. Real User Experiences." },
    description:
      "Intuitive, accessible interfaces and design systems — wireframes, prototypes, and visual design for iOS, Android, web, and wearables.",
  },

  "web-development": {
    eyebrow: "Services.",
    title: "Web Development.",
    intro:
      "From responsive websites to complex web applications, we develop robust digital solutions using modern technologies and best practices.",
    hero: {
      src: "/images/services/web-development/hero.png",
      video: "/videos/services/ui-ux-design.mp4",
      alt: "Softly lit purple glass sphere rendered in three dimensions",
    },
    statement: "Your Business's Premier Website Development Partner",
    body: "We offer a vast array of web development solutions, namely, website creation, cybersecurity measures, UX/UI design, eCommerce solutions, website architecture, quality assurance testing, maintenance, consulting, and custom CMS development to help you achieve your business objectives.",
    capabilities: {
      eyebrow: "Services",
      title: "Powering Businesses Through Web Development",
      intro:
        "We offer end-to-end web development solutions designed to scale with your business and deliver measurable results.",
      items: [
        {
          title: "Website Development",
          body: "Custom websites built for performance, accessibility, and conversion.",
          variant: "overlay",
          image: {
            src: "/images/services/web-development/capability-website.png",
            alt: "Laptop displaying a website against a purple glow",
          },
        },
        {
          title: "Web Application Development",
          body: "Web apps with modern frameworks and seamless experiences.",
          variant: "icon",
          icon: {
            src: "/images/services/web-development/icon-webapp.png",
            alt: "Browser window with code brackets and a gear",
          },
        },
        {
          title: "E-commerce Development",
          body: "Secure, scalable online stores with payment integrations.",
          variant: "banner",
          image: {
            src: "/images/services/web-development/capability-ecommerce.png",
            alt: "Rocket launching from a laptop screen",
          },
        },
        {
          title: "API Integration",
          body: "Connect third-party services and build custom API solutions.",
          variant: "overlay",
          image: {
            src: "/images/services/web-development/capability-api.png",
            alt: "Abstract network of connected nodes",
          },
        },
        {
          title: "Performance Optimisation",
          body: "Speed improvements, Core Web Vitals optimization, and caching.",
          variant: "banner",
          image: {
            src: "/images/services/web-development/capability-performance.png",
            alt: "Dashboard visualising performance metrics",
          },
        },
        {
          title: "Custom CMS Development",
          body: "Tailored content management systems for easy content updates.",
          variant: "icon",
          icon: {
            src: "/images/services/web-development/icon-cms.png",
            alt: "Content management interface glyph",
          },
        },
      ],
      testimonial: {
        quote:
          "Working with the team was seamless. Their attention to detail and communication helped us deliver a product that reflects our vision. Highly recommended.",
        author: "Rohan Varma",
        role: "Founder & CEO",
        avatar: {
          src: "/images/services/web-development/testimonial-rohan.png",
          alt: "Rohan Varma",
        },
      },
      stat: {
        value: "100+",
        label: "happy clients worldwide",
        rating: "4.5/5",
        avatars: [
          { src: "/images/services/web-development/client-1.png", alt: "" },
          { src: "/images/services/web-development/client-2.png", alt: "" },
          { src: "/images/services/web-development/client-3.png", alt: "" },
          { src: "/images/services/web-development/client-4.png", alt: "" },
        ],
      },
    },
    process: {
      eyebrow: "How We Work",
      title: "How We Build High-Performance Web Solutions",
      intro:
        "We follow a structured, transparent, and user-focused process to deliver fast, scalable, and reliable web solutions—optimized for performance at every stage.",
      variant: "list",
      steps: [
        {
          title: "Discovery & Planning",
          body: "Understanding business goals, user needs, and technical requirements.",
        },
        { title: "Design & Architecture" },
        { title: "Development" },
        { title: "Testing & Optimisation" },
        { title: "Launch & Support" },
      ],
    },
    work: { eyebrow: "see works", title: "Real Projects. Real User Experiences." },
    description:
      "Robust websites and web applications built with modern technologies — website and e-commerce development, API integration, custom CMS, and performance optimisation.",
  },

  "mobile-app-development": {
    eyebrow: "Services.",
    title: "Mobile App Development.",
    intro:
      "We build intuitive, high-performance mobile apps designed for seamless user experiences across iOS and Android platforms.",
    hero: {
      src: "/images/services/mobile-app-development/hero.png",
      video: "/videos/services/ui-ux-design.mp4",
      alt: "Cluster of glossy purple spheres rendered in three dimensions",
    },
    statement: "We Create Scalable Apps That Make Your Brand Stand Out.",
    body: "A mobile app can elevate your business prospects. Innovative technologies make apps essential for firms to enhance customer experience and stay competitive. We offer on-demand services, white-label products, and tailored solutions.",
    platformGrid: {
      eyebrow: "Platforms We Build For",
      title: "Apps That Work Across Every Screen",
      intro:
        "We create high-quality mobile apps that adapt across devices. Our solutions ensure consistent performance and usability for all users.",
      items: [
        { label: "Wear OS", icon: "Watch" },
        { label: "Android OS", icon: "Smartphone" },
        { label: "Android TV", icon: "Tv" },
        { label: "Android Auto", icon: "Car" },
        { label: "Apple Watch App Development", icon: "Watch" },
        { label: "iPhone and iPad App Development", icon: "Tablet" },
        { label: "IoT App Development", icon: "Cpu" },
        { label: "Apple TV App Development", icon: "MonitorPlay" },
      ],
    },
    bento: {
      eyebrow: "Mobile App Development Services",
      title: "Custom Mobile Apps Designed for Growth",
      intro:
        "We help businesses create mobile apps that deliver exceptional user experiences and meaningful digital interactions. By combining design, technology, and strategy, we build apps that strengthen brands and fuel growth.",
      items: [
        {
          title: "App Development",
          body: "Building bespoke android applications catering to unique requirements using Kotlin, a trusted technology.",
          image: {
            src: "/images/services/mobile-app-development/bento-app-development.png",
            alt: "Mobile app home screen on a phone against a purple backdrop",
          },
        },
        {
          title: "Application Testing",
          body: "Comprehensive application testing to ensure the quality and performance of your app, and its compliance with industry standards.",
          image: {
            src: "/images/services/mobile-app-development/bento-application-testing.png",
            alt: "Phone displaying an app under test",
          },
          tag: "Mobile Application Testing",
        },
        {
          title: "UX/UI Design",
          body: "Creates UI/UX design that aligns with your business goals and incorporates the latest design trends and deliver user-first interfaces and mobile experiences.",
          image: {
            src: "/images/services/mobile-app-development/bento-ux-ui-design.png",
            alt: "Mobile interface design mockups",
          },
        },
        {
          title: "Maintenance and Support",
          body: "We provide post-release support and maintenance to ensure the long-term success of the application.",
          image: {
            src: "/images/services/mobile-app-development/bento-maintenance.png",
            alt: "Hand holding a phone showing app maintenance",
          },
        },
      ],
    },
    serviceCards: {
      title: "Our Mobile App Development Services",
      intro:
        "We deliver end-to-end mobile app solutions—from hybrid and native development to reliable post-launch support—built for scalability and long-term success.",
      items: [
        {
          title: "Maintenance & Support",
          body: "We provide proactive maintenance and timely issue resolution to ensure your app remains stable.",
          icon: "LifeBuoy",
        },
        {
          title: "Native App Development",
          body: "Our expert mobile app developers create highly efficient native apps that perform optimally.",
          icon: "Code2",
        },
        {
          title: "Hybrid App Development",
          body: "We design comprehensive hybrid apps that align with your business objectives and security needs.",
          icon: "Layers",
        },
      ],
    },
    work: { eyebrow: "see works", title: "Real Projects. Real User Experiences." },
    description:
      "Intuitive, high-performance iOS and Android apps — native, hybrid, and cross-device development for wearables, tablets, TV, and IoT, with testing, UX/UI, and long-term support.",
  },

  "ai-data-science": {
    eyebrow: "Services.",
    title: "AI & Data Science.",
    intro:
      "We help businesses turn data into intelligent solutions through advanced machine learning, analytics, and AI-driven strategies—delivering measurable impact and smarter decision-making.",
    hero: {
      src: "/images/services/ai-data-science/hero.png",
      video: "/videos/services/ui-ux-design.mp4",
      alt: "Ribbon of blue and green light trailing across darkness",
    },
    statement: "Advance Your Business with Our Data Science Consultants",
    body: "Our data science experts deliver AI and predictive analytics solutions that transform complex data into actionable insights, driving efficiency, performance optimization, and measurable business outcomes.",
    featureCards: {
      eyebrow: "AI & Data Science Services",
      title: "Transforming Data Into Actionable Intelligence",
      intro:
        "We help businesses use AI and data science to uncover insights, build models, and deploy solutions—enabling smarter decisions and growth.",
      items: [
        {
          title: "Strategy Planning",
          body: "Data-driven AI strategies aligned with your business objectives.",
          icon: "Target",
        },
        {
          title: "Model Development",
          body: "Custom machine learning models built for accuracy and scalability.",
          icon: "BrainCircuit",
        },
        {
          title: "Infrastructure Setup",
          body: "Set up secure, scalable infrastructure to support AI models and data workflows.",
          icon: "Server",
        },
      ],
    },
    orbital: {
      eyebrow: "Our AI & Data Science Services",
      title: "Build, Scale, and Optimise Intelligent Systems",
      intro:
        "We design, build, and deploy AI solutions across the full data lifecycle—supporting projects of any scale, from data engineering to intelligent optimization.",
      core: {
        src: "/images/services/ai-data-science/orbital-core.png",
        alt: "Iridescent glass knot rendered in three dimensions",
        video: "/videos/ai-in.mp4",
      },
      // Clockwise from the top.
      items: [
        { label: "Data Engineering & Architecture", icon: "Database" },
        { label: "AI Software Development", icon: "Code2" },
        { label: "Recommender Systems", icon: "Sparkles" },
        { label: "Optimisation", icon: "Gauge" },
        { label: "Data Engineering & Architecture", icon: "Database" },
        { label: "Data Strategy", icon: "Compass" },
        { label: "Business Intelligence", icon: "BarChart3" },
        { label: "Artificial Intelligence Consulting", icon: "BrainCircuit" },
      ],
    },
    process: {
      eyebrow: "Our Approach",
      title: "A Proven Process to Turn Data Into Impact",
      intro:
        "We follow a structured, iterative approach to solve complex data and AI challenges—ensuring clarity, validation, scalability, and continuous improvement at every stage.",
      variant: "grid",
      steps: [
        {
          title: "Discovery Session",
          body: "Reviewing your current capabilities and defining future goals to gain a better understanding and make relevant recommendations for tools, technology, and architecture.",
        },
        {
          title: "Proof of Concept",
          body: "Testing a small-scale system, and proving the viability of ML models for your problem.",
        },
        {
          title: "Improvement",
          body: "We focus on improving previously built models to continuously raise the quality of insights and stay ahead of the curve in the changing environment.",
        },
        {
          title: "Production",
          body: "Reviewing your current capabilities and defining future goals to make recommendations for tools, technology, and architecture.",
        },
      ],
    },
    expertise: {
      title: "We Apply Our Data Science Expertise",
      items: [
        { label: "Big Data Analytics", icon: "Database" },
        { label: "NLP & Text Analysis", icon: "MessageSquareText" },
        { label: "BI Implementation", icon: "PieChart" },
        { label: "Predictive Analytics", icon: "TrendingUp" },
        { label: "Data Capture & OCR", icon: "ScanText" },
        { label: "Computer Vision", icon: "Eye" },
      ],
    },
    description:
      "AI and data science that turns data into intelligent solutions — strategy, machine-learning models, data engineering, business intelligence, and predictive analytics, with a proven delivery process.",
  },

  // Figma `940:8180`. The frame is mislabeled "AI & data science" in the file,
  // but its content is Product Development (MVP-focused) throughout. This page
  // has no process band and no work grid — hero, principles, bento, then the
  // shared CtaBand.
  "product-development": {
    eyebrow: "Services.",
    title: "Product Development.",
    intro:
      "We build scalable, market-ready MVPs that validate ideas quickly, reduce risk, and accelerate time-to-market through strategic planning, user-focused design, and agile development practices.",
    hero: {
      src: "/images/services/product-development/hero.png",
      video: "/videos/services/ui-ux-design.mp4",
      alt: "Iridescent glass sphere rendered in three dimensions",
    },
    statement: "MVP Software Development for Winning Digital Products.",
    body: "Our MVP software development solutions help businesses launch digital products quickly and cost-effectively. Our iterative process focuses on informed guesses, minimal resources, and user feedback for timely deliveries while minimizing risks and optimizing costs through thorough research.",
    principles: {
      eyebrow: "Why Choose Us",
      title: "The Principles Behind Our Successful MVPs",
      intro:
        "We follow a proven, research-driven approach to MVP development—focusing on speed, clarity, and value. By minimizing waste, anticipating risks early, and prioritizing what truly matters, we deliver efficient, scalable products without unnecessary complexity or cost.",
      items: [
        {
          body: 'Our "build-measure-learn" approach makes informed decisions and tests them quickly, reducing turn-around time for fast implementation.',
          image: {
            src: "/images/services/product-development/principle-1.png",
            alt: "Iridescent glass folder rendered in three dimensions",
          },
        },
        {
          body: "We take full responsibility for our work and go the extra mile in research and planning to minimize potential losses.",
          image: {
            src: "/images/services/product-development/principle-2.png",
            alt: "Iridescent glass cursor rendered in three dimensions",
          },
        },
        {
          body: "Our top-notch products eliminate the need for additional costs or time to manage redundant features.",
          image: {
            src: "/images/services/product-development/principle-3.png",
            alt: "Iridescent glass building block rendered in three dimensions",
          },
        },
        {
          body: "We begin our process with a thorough business analysis which will, in turn, helps us to anticipate potential challenges and avoid delays in the development process.",
          image: {
            src: "/images/services/product-development/principle-4.png",
            alt: "Iridescent glass rocket rendered in three dimensions",
          },
        },
      ],
    },
    mvpBento: {
      eyebrow: "MVP Services",
      title: "End-to-End MVP Software Development",
      intro:
        "We help startups and businesses design, build, and validate MVPs efficiently—turning ideas into market-ready products through strategic design, scalable development, and expert consulting.",
      items: [
        {
          title: "MVP Design",
          body: "We'll review data from your MVP's launch to create an improvement strategy. We'll enhance the MVP, adapt it to the market, cut costs, set KPIs, and plan for expansion.",
          image: {
            src: "/images/services/product-development/mvp-design.png",
            alt: "Neon rocket launching from a rising bar chart",
            width: 596,
            height: 591,
          },
        },
        {
          title: "MVP Web Application",
          body: "We will improve the MVP based on initial launch data, refining it for better market fit. This includes optimizing costs, setting KPIs, and planning for product evolution.",
          image: {
            src: "/images/services/product-development/mvp-web.png",
            alt: "Web application dashboard screens arranged at an angle",
            width: 596,
            height: 379,
          },
        },
        {
          title: "MVP Mobile Application",
          body: "Data from your MVP Mobile App launch will help improve its performance and develop a full application quickly.",
          image: {
            src: "/images/services/product-development/mvp-mobile.png",
            alt: "Hand holding a phone showing a mobile app home screen",
            width: 596,
            height: 312,
          },
        },
        {
          title: "MVP Consulting",
          body: "Our experts provide consulting for businesses creating an MVP. We help enterprises understand and develop the right MVP.",
          image: {
            src: "/images/services/product-development/mvp-consulting.png",
            alt: "Metallic puzzle pieces fitting together above a purple disc",
            width: 461,
            height: 475,
          },
        },
      ],
    },
    description:
      "Lean MVP software development — strategy, design, web and mobile builds, and consulting that validate ideas quickly and get market-ready products launched fast.",
  },

  // Figma `940:8507` — mislabeled "AI & data science" in the file, like
  // `940:8180` before it. The frame is 12,907px tall across eight content
  // sections; this entry is being filled in stages. Built so far: hero,
  // `capabilityTabs`, `proof`.
  //
  // NOTE: the comp was drawn from Appinventiv's DevOps page — a real
  // competitor's live site — and most of its prose (not just the two strings
  // that named the agency directly) turned out to be copied near-verbatim,
  // confirmed by matching several passages word-for-word against
  // appinventiv.com/devops-services/. Every field below that wasn't already
  // marked [draft] has since been rewritten from scratch in Adpedia's own
  // voice. The proof/whyUs stat VALUES were also carried over from that
  // source; since they can't be independently verified as Adpedia's own
  // figures, they've been scaled down 20% from the original comp's numbers
  // (approved) rather than shipped as Appinventiv's own performance stats.
  "devops-services": {
    eyebrow: "Services.",
    title: "DevOps Services.",
    intro:
      "We build and run the delivery pipelines behind reliable software — automating the path from commit to production, hardening infrastructure as code, and keeping releases fast without making them risky.",
    hero: {
      src: "/images/services/devops-services/hero.png",
      video: "/videos/services/ui-ux-design.mp4",
      alt: "Iridescent glass knot looping through darkness, rendered in three dimensions",
    },
    statement: "Cloud Infrastructure Built to Move at Your Pace",
    body: "We design and manage cloud infrastructure that holds up under real traffic — migrating legacy systems, automating the operational load, and giving your team a platform that scales without needing to be rebuilt every time you grow.",
    capabilityTabs: {
      eyebrow: "Our Capabilities",
      title: "A Complete Suite of DevOps Services",
      intro:
        "Our DevOps work spans the full lifecycle — from the first roadmap conversation to the pipelines and platforms that run in production. Each engagement is scoped to what your delivery process actually needs, not a fixed package.",
      // DRAFT COPY — the comp labels all three tabs but writes the panel for
      // only the first. Everything below marked [draft] was written here to give
      // each tab minimal, service-appropriate content so the tab bar works; it
      // is not client copy and should be reviewed before launch. The first tab's
      // summary and its "DevOps Roadmap and Strategy" body were originally the
      // comp's own Appinventiv-sourced text — both have since been rewritten.
      tabs: [
        {
          label: "DevOps Consulting Service",
          summary: {
            title: "DevOps Consulting Service",
            body: "We start by understanding how your team ships software today — the tools in use, where releases stall, and what reliability actually costs you. From there we build a plan that fits your stack rather than a generic playbook, so the practices we recommend are ones your team can sustain after we hand it over.",
            icon: "MessagesSquare",
          },
          items: [
            {
              title: "DevOps Roadmap and Strategy",
              body: "A DevOps transformation tends to fail from a missing plan more often than a missing tool. We work with your team to lay out a phased roadmap with concrete milestones — whether you're setting up your first pipeline or untangling a delivery process that's grown faster than it's been maintained.",
            },
            {
              // [draft]
              title: "Implementation Consulting",
              body: "We turn the roadmap into working pipelines — selecting the toolchain, standing up environments, and automating build, test, and release so the first measurable wins land early rather than at the end of a long programme.",
            },
            {
              // [draft]
              title: "Tech Consulting",
              body: "Our engineers review your architecture, tooling, and delivery practices, then recommend the changes that will move reliability and release frequency the most — with the trade-offs stated plainly.",
            },
          ],
        },
        {
          // [draft] — entire tab
          label: "DevOps Professional Services",
          summary: {
            title: "DevOps Professional Services",
            body: "Our DevOps engineers work alongside your teams to build and run delivery infrastructure end to end. From pipelines and infrastructure as code through to release management and ongoing platform support, we handle the engineering so your developers stay focused on the product.",
            icon: "Workflow",
          },
          items: [
            {
              title: "CI/CD Pipeline Engineering",
              body: "We design and build pipelines that take a change from commit to production safely and repeatably, removing the manual steps that slow releases down and introduce risk.",
            },
            {
              title: "Infrastructure as Code",
              body: "Environments are defined in version control and provisioned the same way every time, so infrastructure is reviewable, reproducible, and quick to recover.",
            },
            {
              title: "Platform Support and Maintenance",
              body: "We monitor, patch, and tune the platform after launch, keeping pipelines healthy and resolving issues before they reach your users.",
            },
          ],
        },
        {
          // [draft] — entire tab
          label: "DevSecOps Service",
          summary: {
            title: "DevSecOps Service",
            body: "We shift security left, embedding automated checks into every stage of the pipeline so vulnerabilities surface while code is being written rather than after it ships. Security becomes a property of the delivery process instead of a gate at the end of it.",
            icon: "ShieldCheck",
          },
          items: [
            {
              title: "Security Automation",
              body: "Dependency, container, and code scanning run on every build, so issues are caught and triaged as part of normal delivery instead of a separate review cycle.",
            },
            {
              title: "Compliance and Governance",
              body: "We build the evidence trail into the pipeline — access controls, approvals, and audit logs — so compliance reporting draws on what the process already records.",
            },
            {
              title: "Threat Modelling",
              body: "We map how a system can be attacked before it is built, prioritising the mitigations that remove the most risk for the least delivery friction.",
            },
          ],
        },
      ],
    },
    proof: {
      title: "Work Shipped. Results Tracked.",
      intro:
        "These numbers come from work we've actually shipped — architectures we've designed, pipelines we've built, and teams we've supported long after launch day.",
      stats: [
        {
          value: "40",
          suffix: "+",
          label: "DevOps Professionals",
          body: "Every engineer on the team has run production pipelines before joining us — across CI/CD, cloud infrastructure, automation, and reliability work.",
        },
        {
          value: "120",
          suffix: "+",
          label: "Cloud Architectures Designed and Managed",
          body: "Architectures built to hold up under real traffic, not just pass a demo — across multi-cloud and hybrid setups, shaped by whatever the client already runs.",
        },
        {
          value: "200",
          suffix: "+",
          label: "DevOps Implementations Executed",
          body: "Delivery pipelines that ship faster and break less, measured in shorter release cycles and fewer late-night incidents rather than a slide in a deck.",
        },
      ],
      // Exported from the comp. Replace with official brand assets before
      // launch, and confirm we are entitled to display each partner mark.
      partners: [
        {
          src: "/images/services/devops-services/partners/google-cloud.png",
          alt: "Google Cloud",
          width: 130,
          height: 65,
        },
        {
          src: "/images/services/devops-services/partners/azure.png",
          alt: "Microsoft Azure",
          width: 118,
          height: 34,
        },
        {
          src: "/images/services/devops-services/partners/aws.png",
          alt: "Amazon Web Services",
          width: 85,
          height: 51,
        },
        {
          src: "/images/services/devops-services/partners/huawei.png",
          alt: "Huawei",
          width: 145,
          height: 34,
        },
      ],
      cta: { label: "Partner with us", href: "/contact" },
    },
    industries: {
      // Was "Our Capabilities" in the comp — the same eyebrow it uses on the
      // capabilities section above, which read as an oversight. Renamed
      // (approved) so the two sections are distinguishable.
      eyebrow: "Industries We Serve",
      title: "Custom DevOps Solutions for Various Industries",
      // [draft] The comp's intro named finance/healthcare/retail/manufacturing —
      // four industries, none matching the eight listed below it. Rewritten
      // (approved) to describe what the section actually shows.
      intro:
        "From regulated healthcare and public-sector systems to high-traffic retail, we adapt delivery pipelines to the constraints each sector actually operates under.",
      // [draft] The comp gives these tiles labels only. Each line below is a
      // capability claim, not decoration — review before launch.
      items: [
        {
          label: "Healthcare",
          icon: "HeartPulse",
          body: "Release pipelines that keep patient data compliant and auditable.",
        },
        {
          label: "E-Commerce",
          icon: "ShoppingCart",
          body: "Infrastructure that holds through peak traffic and flash sales.",
        },
        {
          label: "Government",
          icon: "Landmark",
          body: "Controlled, fully auditable delivery for public-sector systems.",
        },
        {
          label: "Education",
          icon: "GraduationCap",
          body: "Platforms that absorb term-start load without downtime.",
        },
        {
          label: "Logistics",
          icon: "Truck",
          body: "Real-time tracking systems kept reliable at scale.",
        },
        {
          label: "Fintech",
          icon: "Banknote",
          body: "Compliance-gated releases with security checks on every build.",
        },
        {
          label: "Automotive",
          icon: "Car",
          body: "Connected-vehicle and telematics platforms, continuously delivered.",
        },
        {
          label: "Agriculture",
          icon: "Sprout",
          body: "Sensor and IoT data pipelines built for remote environments.",
        },
      ],
    },
    toolStack: {
      eyebrow: "Our DevOps Technology Stack",
      title: "DevOps Tools and Platforms We Use",
      intro:
        "The right toolchain doesn't guarantee good delivery, but the wrong one guarantees friction. Here's what we reach for across containerisation, infrastructure automation, CI/CD, testing, and monitoring — swapped out when a client's environment calls for something else.",
      categories: [
        {
          label: "Containerisation Tools",
          // Product names corrected from the comp, which sets "Docket SWARM",
          // "Open Shift" and "Open VZ" — unambiguous misspellings of real
          // products, not stylings.
          tools: [
            {
              name: "Kubernetes",
              logo: { src: "/images/services/devops-services/tools/kubernetes.png", alt: "Kubernetes" },
            },
            {
              name: "Apache Mesos",
              logo: { src: "/images/services/devops-services/tools/apache-mesos.png", alt: "Apache Mesos" },
            },
            {
              name: "OpenShift",
              logo: { src: "/images/services/devops-services/tools/openshift.png", alt: "Red Hat OpenShift" },
            },
            {
              name: "Docker Swarm",
              logo: { src: "/images/services/devops-services/tools/docker-swarm.png", alt: "Docker Swarm" },
            },
            {
              name: "Docker",
              logo: { src: "/images/services/devops-services/tools/docker.png", alt: "Docker" },
            },
            {
              name: "Podman",
              logo: { src: "/images/services/devops-services/tools/podman.png", alt: "Podman" },
            },
            {
              name: "OpenVZ",
              logo: { src: "/images/services/devops-services/tools/openvz.png", alt: "OpenVZ" },
            },
            {
              name: "LXC",
              logo: { src: "/images/services/devops-services/tools/lxc.png", alt: "LXC" },
            },
          ],
        },
        // [draft] — the comp names these five categories but lists no tools in
        // any of them, and ships no logos. Filled with the standard tools for
        // each category, rendered as name-only chips. Confirm the list matches
        // what the team actually uses before launch.
        {
          label: "Infrastructure Automation Tools",
          tools: [
            { name: "Terraform" },
            { name: "Ansible" },
            { name: "Pulumi" },
            { name: "CloudFormation" },
          ],
        },
        {
          label: "CI/CD Tools",
          tools: [
            { name: "Jenkins" },
            { name: "GitHub Actions" },
            { name: "GitLab CI" },
            { name: "Argo CD" },
          ],
        },
        {
          label: "Test Automation Tools",
          tools: [
            { name: "Playwright" },
            { name: "Cypress" },
            { name: "Selenium" },
            { name: "JUnit" },
          ],
        },
        {
          label: "Monitoring Tools",
          tools: [
            { name: "Prometheus" },
            { name: "Grafana" },
            { name: "Datadog" },
            { name: "OpenTelemetry" },
          ],
        },
        {
          label: "Coding & Scripting",
          tools: [{ name: "Python" }, { name: "Go" }, { name: "Bash" }, { name: "YAML" }],
        },
      ],
    },
    whyUs: {
      // "Appinventiv" in the comp's heading and intro, rewritten to Adpedia.
      title: "Choose Adpedia for DevOps Excellence",
      intro:
        "Every team's delivery process is shaped by its own history — its stack, its constraints, its near-misses. We build DevOps solutions around that reality instead of asking you to adapt to ours.",
      reasons: [
        {
          title: "End-to-End Expertise",
          body: "We stay involved from the first architecture conversation through ongoing performance monitoring, so the handoffs between strategy, build, and operations don't lose context along the way.",
        },
        {
          title: "Commitment to Security and Quality",
          body: "Security and quality checks are built into the pipeline itself, not bolted on before release — code review, automated testing, and vulnerability scanning run as part of every deployment, not as a separate gate.",
        },
        {
          title: "Proven Expertise",
          body: "Our engineers have worked across industries with genuinely different constraints — regulated finance, high-traffic retail, early-stage products — and bring that range to how they approach your specific setup.",
        },
        {
          title: "Delivery Excellence",
          body: "We've spent years automating delivery pipelines and know where they tend to break, so we design for the failure modes upfront instead of discovering them after go-live.",
        },
        {
          title: "Accelerated Outcomes",
          body: "Shorter feedback loops mean problems surface while they're still cheap to fix. We set up delivery so your team sees the impact of a change within minutes, not at the end of a release cycle.",
        },
      ],
      metrics: {
        title: "What Working With Us Actually Moves",
        stats: [
          { value: "40", suffix: "+", label: "Faster go-to-market timeline" },
          { value: "32", suffix: "+", label: "Reduction in risks" },
          { value: "48", suffix: "+", label: "Higher business agility" },
        ],
        cta: { label: "Connect with us", href: "/contact" },
      },
    },
    engagementModels: {
      eyebrow: "Our DevOps Engagement Models",
      title: "Flexible Engagement Models for DevOps",
      intro:
        "Not every engagement should look the same. Depending on what you need — a second team, a focused review, or ongoing operational cover — we scope the model to match.",
      items: [
        {
          label: "DevOps Outsourcing",
          body: "We take on the DevOps process end to end — build, deployment, and ongoing maintenance — so your team can stay focused on the product while we keep the platform underneath it running.",
        },
        // [draft] — the comp writes only the first model.
        {
          label: "Staff Augmentation",
          body: "We place DevOps engineers directly into your existing teams, working to your process and reporting lines. You keep full ownership of direction and delivery while closing a specific skills gap quickly.",
        },
        {
          label: "Managed DevOps Services",
          body: "We take ongoing responsibility for your pipelines, environments, and monitoring under an agreed service level, handling routine operations and incident response so your team is not carrying the platform.",
        },
        {
          label: "Dedicated Team",
          body: "A standing team assigned solely to your product, with its own lead and consistent membership. Suited to long-running programmes where accumulated context is worth more than flexible headcount.",
        },
        {
          label: "Consulting",
          body: "Time-boxed engagements aimed at a specific question — an architecture review, a toolchain decision, a delivery assessment — ending in clear recommendations your team can act on independently.",
        },
      ],
    },
    challenges: {
      eyebrow: "DevOps Challenges, Solved",
      title: "Simplifying DevOps with Smart Solutions",
      intro:
        "From toolchain complexity to scalability hurdles, we design practical DevOps solutions that streamline workflows, improve reliability, and enable continuous growth.",
      // NOTE: the comp swaps two of these titles against their own copy. Its
      // "Security Issues" card is about scaling with organisational growth, and
      // its "Scalability" card is about shift-left security — both the problem
      // and the solution text prove the mapping backwards in each case. The
      // titles are restored to their bodies here. Same class of fix as the
      // "Docket SWARM" typo: the comp contradicts itself, so it is corrected
      // rather than reproduced.
      items: [
        {
          title: "Toolchain Complexity",
          body: "A deployment, automation, and monitoring toolchain that's grown one tool at a time gets hard to manage.",
          solution:
            "We consolidate the toolchain around a small set of well-integrated tools rather than adding another dashboard for every new need, cutting the manual handoffs between them.",
        },
        {
          title: "Scalability",
          body: "Practices that worked at ten engineers don't always hold at a hundred, as the organisation and its projects grow more complex.",
          solution:
            "We design infrastructure that scales with load automatically rather than manually, and revisit the architecture as the organisation and its traffic patterns grow — scaling is treated as an ongoing practice, not a one-time fix.",
        },
        {
          title: "Legacy Systems",
          body: "Legacy systems weren't built with modern DevOps techniques in mind, and connecting the two isn't always straightforward.",
          solution:
            "We modernise legacy systems incrementally rather than in one risky cutover, wrapping them with adapters that connect to the new delivery process while the underlying system is migrated at a pace the business can absorb.",
        },
        {
          title: "Security Issues",
          body: "Bolting security onto DevOps after the fact rarely works — it needs a shift-left approach from the start.",
          solution:
            "We bring security checks into the pipeline from day one — automated scanning and policy checks that catch risk while code is being written, instead of a manual review wedged in before release.",
        },
      ],
    },
    deliveryProcess: {
      eyebrow: "Our DevOps Process",
      title: "A Structured Approach to Seamless DevOps Delivery",
      intro:
        "Every engagement starts with understanding what you actually run today, then moves through a defined sequence — plan, build, integrate, secure — so nothing is skipped and nothing is guessed at.",
      steps: [
        {
          title: "Analyzing Existing IT Infrastructure",
          body: "We begin by mapping your current infrastructure and delivery process end to end, so the plan we build afterward is grounded in what will actually block a DevOps rollout — not a generic checklist.",
        },
        // [draft] — the comp details only the first step.
        {
          title: "Developing a Tailor-Made Solution",
          body: "Findings from the analysis become a concrete plan: the toolchain, the environment topology, and the sequence of changes. We design for the systems you actually run rather than a reference architecture, and agree the measures of success up front.",
        },
        {
          title: "Continuous Integration",
          body: "We automate build, test, and integration so every change is verified as it lands. Short feedback loops keep the mainline releasable and make problems cheap to fix, because they are found within minutes rather than weeks.",
        },
        {
          title: "Implementing Stringent Security Protocols",
          body: "Security controls are built into the pipeline itself — automated scanning, least-privilege access, and a complete audit trail — so protection holds continuously as the system changes instead of depending on a review before each release.",
        },
      ],
    },
    description:
      "DevOps services that streamline build and release pipelines — consulting, strategy and roadmapping, CI/CD automation, and scalable cloud infrastructure across AWS, Azure, and Google Cloud.",
  },
};

export function serviceDetail(slug: string): ServiceDetail | undefined {
  return serviceDetails[slug];
}

/** Slugs that have a detail page written. Drives static params and the sitemap. */
export function serviceDetailSlugs(): string[] {
  return Object.keys(serviceDetails);
}
