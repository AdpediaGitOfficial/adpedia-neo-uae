import type { CategoryId } from "@/lib/taxonomy";

/**
 * Canonical project list — the single source for the home Stories rail, the
 * portfolio mega menu, the /portfolio index, and the /portfolio/[slug] case
 * studies.
 *
 * Card anatomy on /portfolio (Figma 935:1725): `name` is the headline,
 * `type` the line beneath it, with `year` and `location` set right. `category`
 * is separate from `type` — only `category` drives the filter row.
 *
 * `slug` is the /portfolio/<slug> URL segment and must stay stable; it is the
 * public link target from the menu, home, and the index.
 */

export type Project = {
  slug: string;
  /** Card headline — the project or client name (e.g. "KV Connect"). */
  name: string;
  /** Card sub-line — the kind of work (e.g. "MVP Development"). */
  type: string;
  /** Drives the /portfolio filter row, the case-study meta strip, and "same category" related work. */
  category: CategoryId;
  /**
   * Extra filter-tab categories this project should also appear under, beyond
   * `category` — e.g. a mobile app that's UI/UX-designed but is real
   * development work too, so it should surface under App Development as well.
   */
  filterCategories?: CategoryId[];
  /** Optional until the real project data lands — the card hides them when unset. */
  year?: number;
  location?: string;
  tags: string[];
  summary: string;
  thumb: { src: string; alt: string };
  /** Surfaced in the portfolio mega menu. */
  featured?: boolean;

  /* ---- case-study fields, all optional ----
   * The detail page renders each block only when it has content, so a project
   * with just a summary still produces a valid page. Fill these in as the real
   * project write-ups arrive. */

  /**
   * The write-up, as ordered blocks. Free-form rather than fixed
   * challenge/outcome slots so each project can tell its own story — one
   * project may want "The brief" and "Why it works", another a five-part
   * narrative. One string per paragraph.
   */
  narrative?: { title: string; body: string[] }[];

  /**
   * Showcase imagery. `span: "full"` runs the image across the content column
   * for hero-style shots; the default "half" pairs images two-up. `caption`
   * is rendered beneath when present.
   */
  gallery?: { src: string; alt: string; caption?: string; span?: "full" | "half" }[];

  /** Headline numbers, e.g. { value: "+38%", label: "Conversion rate" }. */
  results?: { value: string; label: string }[];

  /** Client words about the work. */
  quote?: { text: string; author: string; role?: string };

  /** How long the engagement ran, e.g. "12 weeks". */
  duration?: string;

  /** Live site, if it is public. */
  website?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "avis-chauffeur-app",
    name: "AVIS Chauffeur",
    type: "Mobile App Design",
    category: "ui-ux-design",
    filterCategories: ["app-development"],
    tags: ["UI/UX Design", "Mobile App", "Booking Flow", "+more"],
    summary:
      "A chauffeur-booking app built to feel like the cars it reserves — one unhurried screen instead of a five-step form.",
    thumb: {
      src: "/images/projects/avis-chauffeur-hero.jpg",
      alt: "The AVIS chauffeur app home screen, lit against dark volcanic sand",
    },
    featured: true,
    narrative: [
      {
        title: "Overview",
        body: [
          "AVIS came to us wanting a chauffeur-hire app that didn't read like ride-hailing. Someone booking a car by the hour isn't comparing ETAs against three competing drivers — they're expecting the same restraint they'd get from a concierge desk, just delivered from a phone instead of a phone call.",
          "We designed the booking flow around that expectation. One screen holds the entire reservation — trip type, pickup, drop-off, date and time — so a returning client gets from open to booked without a single screen change, and the interface around it carries the weight of the brand rather than a generic booking template.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "A dark, editorial interface photographs beautifully and reads poorly the moment real fields have to sit inside it. The brief needed the same near-black surface and the same car photography that makes AVIS's marketing work, but applied to a form people fill in under time pressure — at a gate, from a lobby, usually one-handed. Anything that made the booking fields harder to scan would have undone the reason for the dark treatment in the first place.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "We split the screen into two jobs and let each one do only that job. The top third carries the brand — full-bleed car photography, the AVIS mark, a greeting that makes the app feel like it recognizes the person opening it. Everything below is pure function: a segmented control for trip type, a pickup field that resolves itself from GPS by default, one swap icon between pickup and drop-off instead of two fields to re-key by hand, and date and time pickers that sit at the same visual weight as the rest of the form rather than interrupting it as a modal.",
          "Red is reserved for exactly one job — the primary action. Every other control stays within tones of the same near-black surface, so \"Search Chauffeur\" is the only thing competing for attention once the details are filled in. The vehicle-selection and preference screens that follow — chauffeur language, gender preference, child seat — carry the same restraint: one legible choice at a time, never a page of options presented at once.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/avis-chauffeur-hero.jpg",
        alt: "The AVIS chauffeur app home screen tilted against dark volcanic sand, hero car photography lit in red",
        caption: "The brand carries the top third of the screen; the booking form carries the rest.",
        span: "full",
      },
      {
        src: "/images/projects/avis-chauffeur-booking-1.jpg",
        alt: "A hand holding the AVIS app open to the booking flow, showing trip type, pickup, and drop-off fields",
        caption: "One screen holds the whole reservation — no multi-step flow to lose people partway through.",
      },
      {
        src: "/images/projects/avis-chauffeur-booking-2.jpg",
        alt: "Two hands holding a phone showing the same AVIS booking flow, pickup location detected via GPS",
        caption: "Pickup resolves from GPS by default; a single swap icon replaces re-keying both fields.",
      },
      {
        src: "/images/projects/avis-chauffeur-home.jpg",
        alt: "The AVIS app home screen showing a destination search, brand carousel, and service shortcuts",
        caption: "Brand and vehicle browsing sit above the fold, service shortcuts below it.",
      },
      {
        src: "/images/projects/avis-chauffeur-vehicle.jpg",
        alt: "The AVIS vehicle selection screen for a Rolls-Royce Phantom with chauffeur preference toggles",
        caption: "Vehicle detail and chauffeur preferences — language, gender, child seat — kept to one decision at a time.",
      },
    ],
  },
  {
    slug: "aibo-voice-ai-banking",
    name: "Aibo",
    type: "AI Voice Platform",
    category: "ai-data-solutions",
    tags: ["AI & Data Science", "Voice AI", "FinTech", "+more"],
    summary:
      "A voice-first banking assistant, built as an MVP for a financial institution — ask for a balance or a statement the way you'd ask a person, and get an answer instead of a menu.",
    thumb: {
      src: "/images/projects/aibo-voice-banking-hero.jpg",
      alt: "A man in a dark suit holding a phone showing a voice-call style account balance screen against a glass office building",
    },
    featured: true,
    narrative: [
      {
        title: "Overview",
        body: [
          "Aibo is a voice-first banking assistant we built as an MVP for a financial institution — checking a balance, reviewing a transaction summary, downloading a statement, or confirming a deposit detail, all handled through a natural spoken or typed request instead of a multi-screen menu.",
          "It's built on natural language processing, speech recognition, and conversational AI, not a voice command layer bolted onto the existing app — the goal was something a customer could genuinely talk to, the way they'd talk to a human banking assistant.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "Traditional mobile banking apps ask a lot of someone who just wants one number or one document — several screens, deep navigation, menus organized around how the bank structures its own products rather than what a customer is actually trying to do in the moment. The brief was to make routine banking genuinely hands-free and quick to access, not add a voice button on top of the same navigation underneath.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "Aibo opens by greeting the customer by name and listening, not with a menu, and it understands the request itself rather than a fixed list of commands — \"What's my current balance?\", \"Send my February statement,\" and \"Check my fixed deposit maturity date\" are all handled as natural language, not phrases the customer has to memorize.",
          "Every request resolves the same way: an instant spoken or on-screen summary, plus a secure link when there's a document to hand over, so voice never becomes a dead end that still sends the customer back into the full app to finish the task. Authentication runs through Face ID before any account detail is spoken aloud, so a hands-free interface doesn't become a hands-free security gap.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/aibo-voice-banking-hero.jpg",
        alt: "A man holding a phone showing a voice-call style account balance screen, ₹2,23,952.35, against a glass office building",
        caption: "The balance resolves like a call, not a dashboard — the number a customer actually asked for, front and center.",
        span: "full",
      },
      {
        src: "/images/projects/aibo-voice-banking-faceid.jpg",
        alt: "A phone showing a Face ID authentication screen with a red \"Authenticate Using Face ID\" button",
        caption: "Face ID gates every session before any account detail is spoken aloud.",
      },
      {
        src: "/images/projects/aibo-voice-banking-greeting.jpg",
        alt: "A phone showing a personalized \"Hello Harshika!\" greeting with a voice-input microphone button",
        caption: "Aibo opens by greeting the customer by name and listening — not with a menu.",
      },
    ],
  },
  {
    slug: "bedia-prive",
    name: "Bedia Privé",
    type: "Website Design",
    category: "web-development",
    location: "Dubai, UAE",
    tags: ["Web Development", "UI/UX Design", "Booking Engine", "+more"],
    summary:
      "An invitation-only pottery-and-dining concept in Dubai, built with a custom booking engine that never breaks character between the first cinematic frame and \"Confirm & Pay.\"",
    thumb: {
      src: "/images/projects/bedia-prive-hero.jpg",
      alt: "The Bedia Privé homepage on a laptop, showing pottery photography and a VIP-access-only invitation",
    },
    featured: true,
    narrative: [
      {
        title: "Overview",
        body: [
          "Bedia Privé sells an experience that only works if it feels genuinely exclusive — a pottery-and-fine-dining concept positioned as invitation-only. That positioning has to survive contact with the least glamorous part of any hospitality site: the booking form. Most luxury sites keep two visual languages, an editorial homepage and then a generic third-party widget bolted on at checkout that looks like it belongs to a different company.",
          "We built the booking engine as a continuation of the brand rather than a payment form attached to it — same serif type, same near-black palette, same restraint — so choosing a package and paying for it never breaks the mood the opening photography sets.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "Real-time reservations need real functionality — a date picker, time slots, a guest count, three package tiers, a price that updates as those choices change — and that functionality tends to force default form fields and dropdowns into a page, exactly the kind of visual noise the rest of the site had been built to avoid. The brief was to keep the invitation-only feeling intact through the one screen where a guest is making a real financial decision, not just admiring photography.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "The homepage establishes exclusivity before a single word of body copy loads — a \"VIP Access Only\" eyebrow, the wordmark set in the same restrained serif italic throughout the site, and a framed \"limited availability, invitation-only\" note sitting over cinematic pottery-throwing photography instead of the stock table shots most hospitality sites default to.",
          "Package tiers repeat the same visual pattern everywhere they appear — a photograph, a name, a starting price, a short inclusions list — first on the Curated Packages page, then again inside the reservation flow, so a guest recognizes \"Signature\" as the same product rather than re-learning a new interface mid-booking. The reservation screen itself carries the identical typography and palette as the marketing pages around it, and the total price recalculates live as guests and package change, so the cost is visible before a guest ever reaches \"Confirm & Pay\" — no separate step where the number changes on them.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/bedia-prive-hero.jpg",
        alt: "The Bedia Privé homepage showing cinematic pottery photography and a VIP-access-only invitation",
        caption: "VIP-only positioning starts on the first screen — eyebrow, wordmark, and a \"limited availability\" note before any navigation.",
        span: "full",
      },
      {
        src: "/images/projects/bedia-prive-packages.jpg",
        alt: "The Curated Packages page showing three package tiers with photography, pricing, and inclusions",
        caption: "Package tiers repeat the same pattern — photo, name, starting price, inclusions — so guests recognize them again inside the booking flow.",
      },
      {
        src: "/images/projects/bedia-prive-booking.jpg",
        alt: "The Reserve Your Experience booking engine showing date, time, guest count, package selection, and a live total price",
        caption: "The booking engine carries the same serif type and near-black palette as the rest of the site, with the total updating live as guests and package change.",
      },
    ],
  },
  {
    slug: "prime-promenade",
    name: "Prime Promenade",
    type: "Website & Booking Platform",
    category: "web-development",
    tags: ["Web Development", "UI/UX Design", "Booking Platform", "+more"],
    summary:
      "A mixed-use lifestyle destination — retail, business, and eight bookable amenities — presented as one address instead of a directory of separate offerings.",
    thumb: {
      src: "/images/projects/prime-promenade-hero.jpg",
      alt: "The Prime Promenade homepage showing visitors walking toward a glass-fronted lifestyle destination at dusk",
    },
    narrative: [
      {
        title: "Overview",
        body: [
          "Prime Promenade is genuinely several products sharing one address — a retail promenade, a commercial destination for business tenants, and eight separately bookable amenities including a pool and fitness facilities. The easy failure mode for a project like this is a stitched-together directory: one page per amenity, none of them feeling like they belong to the same place.",
          "We designed it as one destination with several rooms instead of several products sharing a logo. Every amenity landing moment carries the same photographic treatment and typographic system as the retail homepage, so a visitor exploring one experience recognizes the others as part of the same place rather than a separate microsite.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "A mixed-use development like this has two audiences reading at completely different speeds: a visitor scanning quickly for what's on-site and how to book it, and a prospective tenant or business partner reading slowly for credibility — architecture, positioning, the kind of language that signals a serious commercial address rather than a shopping mall. Design purely for one and the other reads as an afterthought.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "The homepage opens at the pace of the first audience — full-bleed lifestyle photography and two clearly separated actions, \"Explore Amenities\" for a visitor and \"Partner With Us\" for a business audience, so neither has to wade through the other's content to find their own path in. The About section deliberately slows down for the second audience: architecture-forward photography, a repositioned voice around modern commercial living, and none of the walk-in urgency of the page above it.",
          "Each of the eight amenities gets its own full-bleed landing moment — its own hero photograph and headline, like the underwater shot behind the pool's \"Dive into Luxury\" — but every one of them books through the same consistent flow, so learning to reserve one amenity means already knowing how to reserve the rest.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/prime-promenade-hero.jpg",
        alt: "The Prime Promenade homepage on a laptop, showing visitors walking toward the destination at dusk",
        caption: "Two clearly separated calls to action — one for a visitor, one for a business audience — from the very first screen.",
        span: "full",
      },
      {
        src: "/images/projects/prime-promenade-about.jpg",
        alt: "The Prime Promenade About section on a large display, reading \"Prime destination. Multiple experiences.\"",
        caption: "The About section slows down on purpose: architecture-forward photography and positioning language for a tenant or partner reading for credibility.",
      },
      {
        src: "/images/projects/prime-promenade-amenities.jpg",
        alt: "A laptop showing one of the eight amenity landing pages, an underwater swimming pool shot behind \"Dive into Luxury\"",
        caption: "Each of the eight amenities gets its own full-bleed landing moment, all booking through the same consistent flow.",
      },
    ],
  },
  {
    slug: "prime-promenade-brand-identity",
    name: "Prime Promenade",
    type: "Logo Design & Brand Identity",
    category: "brand-design",
    tags: ["Brand Design", "Logo Design", "Environmental Branding", "+more"],
    summary:
      "A colorful, faceted mark built to hold up everywhere the destination shows up — a corridor of digital screens, an indoor display, an illuminated sign after dark.",
    thumb: {
      src: "/images/projects/prime-promenade-brand-screen.jpg",
      alt: "A wide illuminated corridor leading to a large digital screen showing three women shopping, the Prime Promenade logo top left",
    },
    narrative: [
      {
        title: "Overview",
        body: [
          "Prime Promenade needed a mark that could do more than sit well on a business card — it had to survive filling a corridor-length digital screen, sit inside a smaller indoor display, and still read cleanly on an illuminated sign after dark. We designed the identity — mark, wordmark, and a single-line tagline — as a system built for that range of formats from the start, not a logo adapted to it afterward.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "A retail-and-lifestyle destination lives across dramatically different surfaces: a sequence of hallway screens seen up close while walking through, a smaller framed display inside one of its venues, and static signage that has to hold its own at night with no motion to carry it. A mark that only worked in one of those contexts — sharp at scale but muddy reduced down, or vivid lit up but flat in static form — would have undercut the destination everywhere else it appeared.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "The faceted, multi-color mark stays legible reduced onto a static sign or filling an entire corridor screen, because the geometry and color separation were built to hold at both extremes rather than optimized for one. The same lockup — mark, wordmark, tagline — repeats identically across the corridor screens, the indoor display, and the illuminated signage, so the brand reads as one consistent presence rather than a different logo treatment for every surface it happens to land on.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/prime-promenade-brand-screen.jpg",
        alt: "A wide illuminated corridor leading to a large digital screen showing three women shopping, the Prime Promenade logo top left",
        caption: "The mark filling a corridor-length screen, alive with movement rather than a static board.",
        span: "full",
      },
      {
        src: "/images/projects/prime-promenade-brand-gym.jpg",
        alt: "A framed indoor display showing the Prime Promenade logo above a woman resting during a workout",
        caption: "The same lockup, scaled down for a smaller indoor display — legible without the corridor screen's size to lean on.",
      },
      {
        src: "/images/projects/prime-promenade-brand-signage.jpg",
        alt: "An illuminated Prime Promenade sign mounted on a building corner at night, lit from below",
        caption: "And on static signage after dark — the identity has to hold up with no motion or screen sequence to carry it.",
      },
    ],
  },
  {
    slug: "eduplan-ecommerce-migration",
    name: "Eduplan",
    type: "E-commerce Migration",
    category: "web-development",
    location: "UAE",
    tags: ["Web Development", "E-commerce", "Platform Migration", "+more"],
    summary:
      "A 100,000-line-item, multi-vendor school-supplies marketplace, migrated off legacy PHP onto Shopify with zero downtime.",
    thumb: {
      src: "/images/projects/eduplan-hero.jpg",
      alt: "The Eduplan homepage on a laptop, showing the Classroom Resources banner and a Shop By Brand row",
    },
    narrative: [
      {
        title: "Overview",
        body: [
          "Eduplan supplies schools across the UAE, the UK, and the wider Middle East with everything from classroom furniture to coding kits — a multi-vendor catalogue running past 100,000 line items across dozens of brands. The site exists to do one job well: let a school's procurement team find and order the right SKU, at institutional pricing, without wading through a directory built for a fraction of that scale.",
          "Adpedia migrated Eduplan's entire storefront off a legacy PHP e-commerce platform onto Shopify, rebuilding the storefront and vendor-management layer around what Shopify actually does well rather than porting the old site's structure across unchanged.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "A migration at this scale carries a risk most redesigns don't: 100,000-plus SKUs across a multi-vendor catalogue, live institutional accounts placing recurring orders, and a business that couldn't afford to go dark — or even slow down — while the switch happened. The brief wasn't just moving the data across; it was doing it without a single day of downtime or a delayed order in transit.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "We treated the migration itself as the deliverable, not a footnote before a redesign. Every vendor, product, price tier, and institutional account was mapped and moved onto Shopify's multi-vendor infrastructure in a sequence built to keep the storefront live and orders flowing throughout — no maintenance-mode window, no gap where a school couldn't check out.",
          "The rebuilt storefront leans on what that infrastructure is actually good at: faceted brand and price filtering that holds up across a six-figure catalogue, a \"Shop By Brand\" and \"Shop By Collections\" structure schools can browse instead of search blindly through, and institutional pricing surfaced right on the homepage instead of buried behind an account login.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/eduplan-hero.jpg",
        alt: "The Eduplan homepage on a laptop, showing the Classroom Resources banner and a Shop By Brand row",
        caption: "Shop By Brand and Shop By Collections replace a flat category list — how a six-figure catalogue stays browsable.",
        span: "full",
      },
      {
        src: "/images/projects/eduplan-catalogue.jpg",
        alt: "A monitor showing the Eduplan Featured Products carousel and a row of vendor catalogue brand tiles",
        caption: "Institutional pricing and delivery windows sit directly on the product card, not behind a login.",
      },
      {
        src: "/images/projects/eduplan-filters.jpg",
        alt: "The Eduplan Coding Accessories category page on a laptop, showing brand and price filters over a large catalogue",
        caption: "Faceted brand and price filtering holds up at scale, whether a category has twenty products or two thousand.",
      },
    ],
  },
  // "etern-learning-app" — temporarily hidden from the portfolio at the
  // client's request. All copy and imagery are unchanged and still in the
  // repo (public/images/projects/etern-*.jpg); re-add the entry here (see
  // git history for the exact block) to bring the page, thumbnail, and mega
  // menu listing back — everything that lists projects reads this array
  // directly, so restoring the entry is enough.
  {
    slug: "sifat-lms-app",
    name: "SIFAT",
    type: "Mobile App Design",
    category: "ui-ux-design",
    filterCategories: ["app-development"],
    tags: ["UI/UX Design", "Mobile App", "EdTech", "+more"],
    summary:
      "A course marketplace built around an AI Mentor that proposes a learning path before a student ever has to browse for one.",
    thumb: {
      src: "/images/projects/sifat-lms-hero.jpg",
      alt: "A phone held against a purple sky, showing the SIFAT home screen with an AI Mentor prompt above course categories",
    },
    narrative: [
      {
        title: "Overview",
        body: [
          "SIFAT is a course marketplace built around one idea: the home screen should already know what a student is trying to learn, not wait for them to search for it. An AI Mentor prompt — \"Build a personalised learning path in seconds\" — sits above the fold before any course list, alongside a Continue Learning shelf and an AI-recommended row, so opening the app resumes a specific thread instead of dropping a student back into a generic catalogue.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "A marketplace spanning categories like Coding, Business, Design, and Finance has the same problem every large catalogue has: browsing scales badly. Left purely as a directory, the home screen becomes a wall of categories a student has to dig through every session, with nothing remembering what they were actually partway through last time.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "The AI Mentor sits at the very top of the home screen, ahead of categories or search, and does the one thing a static catalogue can't — ask what a student is trying to learn and propose a path, rather than handing over a full course list to filter through. Below it, Continue Learning resumes exactly where a student left off, whether that's a course partway through or a lesson mid-playback.",
          "Course discovery still works the traditional way when a student wants it — Browse Categories, and a full catalogue view per category with difficulty tabs (Beginner, Intermediate, Advanced) and per-course pricing and certificate details — but it sits below the personalised layer, not instead of it, so the AI Mentor and Continue Learning let a student skip browsing most of the time rather than replacing it entirely.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/sifat-lms-hero.jpg",
        alt: "A phone held against a purple sky, showing the SIFAT home screen with an AI Mentor prompt above course categories",
        caption: "The AI Mentor sits above the fold, ahead of any course list — the home screen opens with a question, not a catalogue.",
        span: "full",
      },
      {
        src: "/images/projects/sifat-lms-home.jpg",
        alt: "A hand holding a phone showing the SIFAT home screen, with Continue Learning and AI Recommended course rows",
        caption: "Continue Learning resumes exactly where a student left off, not at the course's landing page.",
      },
      {
        src: "/images/projects/sifat-lms-screens.jpg",
        alt: "Several SIFAT screens arranged together, showing a course catalogue with difficulty tabs, a video lesson in progress, and upcoming quizzes",
        caption: "Course discovery still works the traditional way when a student wants it — categories, difficulty tabs, pricing — just positioned below the personalised layer.",
      },
    ],
  },
];

/** Cards per page on /portfolio — the Figma grid is 2 columns x 4 rows. */
export const PROJECTS_PER_PAGE = 8;

export const featuredProjects = projects.filter((p) => p.featured);

/** All categories a project should surface under in the /portfolio filter — `category` plus any `filterCategories`. */
export function projectCategories(project: Project): CategoryId[] {
  return [project.category, ...(project.filterCategories ?? [])];
}

export function projectHref(slug: string): string {
  return `/portfolio/${slug}`;
}

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}


/**
 * Other work to show at the foot of a case study: same category first, topped
 * up with the most recent others so the rail is never empty or near-empty.
 */
export function relatedProjects(slug: string, limit = 3): Project[] {
  const current = projectBySlug(slug);
  if (!current) return [];
  const sameCategory = projects.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = projects.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
