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
  /** Drives the /portfolio filter row. */
  category: CategoryId;
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
    slug: "orange-flex",
    name: "Flex",
    type: "Website Design",
    category: "web-development",
    tags: ["UI Design", "UX Design", "Responsive Layout", "+more"],
    summary:
      "We design modern, user-focused websites that blend aesthetics with usability to drive engagement and conversions.",
    thumb: { src: "/images/projects/website-design.png", alt: "Orange Flex website on a laptop" },
    featured: true,
    narrative: [
      {
        title: "Overview",
        body: [
          "Flex arrived with a product people already liked and a website that undersold it. The brand had outgrown its original identity, and the site had gained pages faster than it had gained structure — visitors turned up with clear intent and left without an obvious next step.",
          "We rebuilt the site around what people were actually trying to do. Every page now opens with a single legible proposition and resolves to one clear action, with the supporting detail arranged beneath it rather than competing for the same attention.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "The old site treated every section as equally important, so nothing read as important. Navigation had grown to accommodate internal teams rather than the people using it, and the mobile experience was a compressed desktop layout rather than a considered one.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "We started with the content rather than the layout — auditing every page, cutting what repeated, and grouping what remained into a structure that matched how customers describe the product themselves. Only then did we design, working from the smallest screen up so that constraints set the priorities.",
          "A tighter typographic system carries the long-form pages without extra decoration, which keeps the site quick to load and, more importantly, quick to read.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/hero/flex-laptop.png",
        alt: "The Flex homepage open on a laptop",
        caption: "The homepage leads with one proposition and one action.",
        span: "full",
      },
      {
        src: "/images/services/brand-flex.png",
        alt: "Flex brand and interface elements",
        caption: "Type and colour applied consistently across the system.",
      },
      {
        src: "/images/projects/website-design.png",
        alt: "Flex responsive layouts across screen sizes",
        caption: "Layouts designed from the smallest breakpoint up.",
      },
    ],
  },
  {
    slug: "dotarion-app",
    name: "Dotarion",
    type: "Mobile App Design",
    category: "app-development",
    tags: ["iOS", "Android", "UI/UX", "Responsive Layout", "+more"],
    summary:
      "We create intuitive mobile app experiences focused on clarity, usability, and seamless interaction across platforms.",
    thumb: { src: "/images/projects/mobile-app.png", alt: "Dotarion mobile app screens" },
    featured: true,
    narrative: [
      {
        title: "Overview",
        body: [
          "Dotarion needed an app that felt calm to use. The feature set was already decided; the problem was that everything competed for the same moment of attention, and people were abandoning tasks partway through rather than finishing them.",
          "We reduced each screen to the one decision it was asking for. Secondary actions moved out of the primary path, and the flows that mattered most were shortened until they could be completed in a single sitting.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "Designing across iOS and Android without producing two unrelated products. The interface had to respect each platform's conventions — navigation, gestures, typography — while keeping a single recognisable character throughout.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "We built the interface from a small set of components with generous touch targets and predictable spacing, then let platform conventions vary only where users would notice their absence. Motion is used sparingly and only to explain a transition, never for decoration.",
          "The outcome is an app that feels quiet in the hand: fewer steps to complete the common tasks, and a consistent rhythm that makes the uncommon ones easier to find.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/hero/billie-phones.png",
        alt: "Dotarion app screens shown across several phones",
        caption: "Each screen asks for one decision at a time.",
        span: "full",
      },
      {
        src: "/images/hero/billie-desktop.png",
        alt: "The companion desktop view",
        caption: "The companion web view mirrors the app's structure.",
      },
      {
        src: "/images/projects/mobile-app.png",
        alt: "Detail of the Dotarion interface components",
        caption: "A small component set, reused throughout.",
      },
    ],
  },
  {
    slug: "browno-studio",
    name: "Browno",
    type: "Brand Experience",
    category: "brand-design",
    tags: ["Brand Design", "Art Direction", "Web", "+more"],
    summary:
      "We shape elegant, cohesive brand experiences that translate strategy into memorable digital products people love.",
    thumb: { src: "/images/projects/brand-elegant.png", alt: "Browno brand website concept" },
    featured: true,
    narrative: [
      {
        title: "Overview",
        body: [
          "Browno had a strong point of view and no consistent way of expressing it. Each touchpoint had been designed in isolation, so the studio looked like several different companies depending on where you met it.",
          "We built one system instead of another set of assets: a typographic scale, a restrained palette, and a small library of layouts that hold together whether they are applied to a landing page, a proposal, or a social post.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "Elegance is easy to describe and hard to specify. The brand needed to read as considered without becoming fragile — the rules had to survive being applied by people who were not in the room when they were written.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "We designed the constraints first. Type sizes, spacing, and contrast were fixed to a scale narrow enough to stay coherent and wide enough to handle real content, then we tested it against the messiest pages the studio actually produces rather than the tidiest.",
          "What ships is a system with fewer decisions left open. The identity holds its shape as the studio grows, and new material starts from a defensible default rather than a blank canvas.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/hero/shape-elegant.png",
        alt: "The Browno site showing the brand's typographic treatment",
        caption: "One typographic scale carries every page.",
        span: "full",
      },
      {
        src: "/images/services/brand-cybersabra.png",
        alt: "Brand applications across formats",
        caption: "The same rules applied across formats.",
      },
      {
        src: "/images/projects/brand-elegant.png",
        alt: "Browno layout and art direction detail",
        caption: "Art direction tested against real content, not ideal content.",
      },
    ],
  },
  {
    slug: "nova-commerce",
    name: "Nova",
    type: "E-commerce Platform",
    category: "web-development",
    tags: ["E-commerce", "Web Development", "CRO", "+more"],
    summary:
      "We build high-performing commerce experiences with seamless navigation, optimized conversions, and scalable foundations.",
    thumb: { src: "/images/projects/ecommerce-vr.png", alt: "Immersive e-commerce concept" },
    narrative: [
      {
        title: "Overview",
        body: [
          "Nova was selling well in spite of its storefront rather than because of it. Traffic was healthy and the catalogue was strong, but the path from landing to checkout asked for too much too early and lost people at predictable points.",
          "We rebuilt the journey around momentum. Product pages answer the obvious objections in the order shoppers raise them, and checkout collects the minimum needed at each step instead of presenting one long form.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "A catalogue that keeps growing. The design had to hold up whether a category contained six products or six hundred, and had to stay fast on the mid-range phones most of the traffic actually arrives on.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "Filtering and sorting were treated as primary navigation rather than an afterthought, so large categories stay browsable. Imagery is sized per breakpoint and loaded lazily, keeping the first view light without softening the product photography the brand depends on.",
          "The foundation is deliberately unglamorous: predictable templates, a shared component set, and room for the catalogue to double without a redesign.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/hero/lumio-tablets.png",
        alt: "Nova storefront shown across tablet screens",
        caption: "Category pages built to stay browsable as the catalogue grows.",
        span: "full",
      },
      {
        src: "/images/hero/pricing-green.png",
        alt: "Nova pricing and checkout step",
        caption: "Checkout asks for the minimum at each step.",
      },
      {
        src: "/images/hero/digital-presence.png",
        alt: "Nova campaign and content pages",
        caption: "Editorial pages reuse the same component set.",
      },
    ],
  },
  {
    slug: "avis-chauffeur-app",
    name: "AVIS Chauffeur",
    type: "Mobile App Design",
    category: "ui-ux-design",
    tags: ["UI/UX Design", "Mobile App", "Booking Flow", "+more"],
    summary:
      "A chauffeur-booking app built to feel like the cars it reserves — one unhurried screen instead of a five-step form.",
    thumb: {
      src: "/images/projects/avis-chauffeur-hero.jpg",
      alt: "The AVIS chauffeur app home screen, lit against dark volcanic sand",
    },
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
    slug: "etern-learning-app",
    name: "Etern Learning",
    type: "Mobile App Design",
    category: "ui-ux-design",
    tags: ["UI/UX Design", "Mobile App", "Kids Edtech", "+more"],
    summary:
      "A learning app for ages 3–7, designed for a child navigating alone — streaks, a progress ring, and a mascot doing the explaining a paragraph of copy would otherwise have to do.",
    thumb: {
      src: "/images/projects/etern-mock.jpg",
      alt: "The Etern Learning home dashboard on a tablet, showing a streak tracker, progress ring, and a shelf of story and activity tiles",
    },
    narrative: [
      {
        title: "Overview",
        body: [
          "Etern Learning needed an app two completely different people would use minutes apart from each other — a parent filling in a signup form, then handing the phone to a child who can't fully read yet. Most edtech apps pick one audience and make the other tolerate it.",
          "We designed two distinct interaction languages inside one product: a calm, form-based flow for the parent — clear labels, a visible privacy note, nothing playful competing for attention while they're entering real information — and an icon-led, mascot-driven world for the child once the account exists, where a tiger named Tiggy does the explaining a paragraph of copy would otherwise have to do.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "A three-to-seven-year-old can't read a settings menu, and won't stay on a screen that doesn't reward them within a few taps of opening it. Every daily-use decision had to work for a child navigating alone: no destination more than one tap from the home screen, feedback that reads instantly — a filled star, a checkmark, a percentage ring — rather than as text, and a sense of progress visible before a single lesson is finished.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "The home screen leads with what changed since yesterday, not a menu — the streak, the day's progress ring, and one \"continue learning\" card picking up exactly where the last session stopped, so opening the app has an immediate, visible payoff. Below it, a content shelf mixes categories like Stories and Self Help into a single browsable row instead of separate tabs a child would have to understand first, and locking content behind a level number turns a limitation into an incentive instead of a wall.",
          "Onboarding runs in the opposite register on purpose: a linear form with real labels and a stated privacy commitment, then a lighter profile step — choosing an avatar, picking a learning buddy from a small set of characters — that eases a first-time child user into the app's tone before the gamified home screen arrives. The same tiger mascot appears throughout both modes, so the handoff from \"parent finishing setup\" to \"child starting to play\" never feels like switching apps.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/etern-mock.jpg",
        alt: "A tablet held by two hands, showing the Etern Learning home dashboard with a streak tracker, progress ring, and a content shelf",
        caption: "The home dashboard leads with streaks, today's progress, and one \"continue learning\" card — not a menu.",
        span: "full",
      },
      {
        src: "/images/projects/etern-learning-onboarding.jpg",
        alt: "Two phones showing profile selection and the child-information form during onboarding",
        caption: "Onboarding runs in a calmer register: a real form for the parent, then a lighter profile step for the child.",
      },
      {
        src: "/images/projects/etern-learning-buddy.jpg",
        alt: "A phone showing the learning buddy selection screen with several animal mascot characters",
        caption: "Picking a learning buddy turns the last onboarding step into the first moment of play.",
      },
    ],
  },
  {
    slug: "sifat-lms-app",
    name: "SIFAT",
    type: "Mobile App Design",
    category: "ui-ux-design",
    tags: ["UI/UX Design", "Mobile App", "EdTech", "+more"],
    summary:
      "An exam-prep LMS built around one habit: open the app, see exactly where you left off, and get back into it in one tap.",
    thumb: {
      src: "/images/projects/sifat-lms-hero.jpg",
      alt: "The SIFAT app home screen showing learning overview stats and four learning tool tiles",
    },
    narrative: [
      {
        title: "Overview",
        body: [
          "SIFAT is exam prep, and exam prep is a lot of material — subjects, textbooks, syllabi, practice sets, solved papers, question banks, all of it needing to be reachable without turning the app into a file browser. The habit that actually matters for a product like this isn't a single clever feature, it's whether a student opens the app again tomorrow.",
          "We built the home screen around three concrete numbers instead of a dashboard of charts — progress percentage, lessons completed, days on streak — and put resuming the last lesson one tap away, before any browsing is required at all.",
        ],
      },
      {
        title: "The Challenge",
        body: [
          "Every subject carries the same five-plus resource types — textbook, syllabus, practice, questions, question bank — and a student is usually working across several subjects at once. List every resource for every subject on one screen and the app stops feeling like a study companion and starts feeling like a directory. The interface had to scale to a full curriculum without dumping the full curriculum on screen at once.",
        ],
      },
      {
        title: "Our Approach",
        body: [
          "Subjects collapse to one line by default — name, resource count, a progress bar — and only expand into their full row of resource icons on tap. A student scanning for what to study next sees every subject at a glance; a student who already knows what they're doing gets straight to the specific tool without extra navigation in between.",
          "The four modes a student actually alternates between during a session — Study, Solved Papers, Prediction, Translator — sit as large tiles directly on the home screen rather than behind a menu, because these are moves made constantly through a study session, not settings configured once and forgotten. Everything else, including sign-in, stays in a plain, unhurried form so the app reads as a serious study tool from the first screen, not a game with a study mode attached.",
        ],
      },
    ],
    gallery: [
      {
        src: "/images/projects/sifat-lms-hero.jpg",
        alt: "The SIFAT app home screen on an orange desk background, showing progress, lessons, and streak stats",
        caption: "Three concrete numbers instead of a dashboard — progress, lessons completed, streak.",
        span: "full",
      },
      {
        src: "/images/projects/sifat-lms-auth.jpg",
        alt: "The SIFAT sign-in screen next to the home screen, showing the learning overview and four tool tiles",
        caption: "A plain, unhurried sign-in flow — the app reads as a study tool first.",
      },
      {
        src: "/images/projects/sifat-lms-study.jpg",
        alt: "The SIFAT study screen showing a continue card and a list of subjects with expandable resource icons",
        caption: "Subjects collapse to one line by default, expanding into resource icons only on tap.",
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
];

/** Cards per page on /portfolio — the Figma grid is 2 columns x 4 rows. */
export const PROJECTS_PER_PAGE = 8;

export const featuredProjects = projects.filter((p) => p.featured);

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
