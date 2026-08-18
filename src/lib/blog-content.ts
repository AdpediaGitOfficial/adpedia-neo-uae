/** Copy and posts for /blog and /blog/[slug] (Figma 935-4663 and 935-5114). */

export const blogHero = {
  title: "Expert Insights.",
  intro: "From design principles to technical optimizations—everything you need for digital success.",
  lead: "Expert insights on web design, branding, and digital strategy to help your business stand out.",
};

export const blogLabels = {
  search: "search...",
  category: "category",
  allCategories: "All categories",
  related: "Related blogs",
  empty: "No posts match that search yet.",
  readPost: "Read post",
};

export type PostCategoryId = "design" | "development" | "strategy";

export const postCategories: { id: PostCategoryId; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "development", label: "Development" },
  { id: "strategy", label: "Strategy" },
];

/**
 * Article body as typed blocks rather than a markdown string.
 *
 * This keeps the repo dependency-free and consistent with `projects.ts`, and
 * renders the exact structures the design uses — h2, h3, paragraphs, lists.
 * If posts start being written by someone who does not work in the codebase,
 * migrate to MDX: the block union maps onto it cleanly. See NOTES.md.
 */
export type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  /** Shorter <title>-tag variant for posts whose full title overflows ~60 chars once " | Adpedia Neo" is appended. Falls back to `title` when unset. */
  seoTitle?: string;
  excerpt: string;
  category: PostCategoryId;
  /** ISO date — formatted for display at render time. */
  date: string;
  cover: { src: string; alt: string };
  author?: { name: string; role: string };
  /** Standfirst under the title. */
  lead?: string;
  /** Empty until the article is written; the page renders what exists. */
  body: Block[];
  featured?: boolean;
};

export const posts: Post[] = [
  {
    slug: "web-development-meets-ai",
    title: "Web Development Meets AI: Building Smarter Digital Experiences",
    seoTitle: "Web Development Meets AI: What's Changing",
    excerpt:
      "How artificial intelligence is reshaping the way websites are built, experienced, and improved.",
    category: "development",
    date: "2026-01-22",
    cover: {
      src: "/images/blog/ai-web-development.png",
      alt: "Abstract visual representing AI-assisted web development",
    },
    author: { name: "Rohan Dev", role: "Client Success Manager" },
    lead: "Most articles about AI in web development list the same five bullet points — chatbots, personalization, faster coding. Here's what we've actually noticed building with these tools day to day: some of it lives up to the hype, and some of it is still slower than doing it by hand.",
    featured: true,
    body: [
      { type: "heading", level: 2, text: "Where AI Genuinely Speeds Up Development" },
      {
        type: "paragraph",
        text: "Code-completion tools have changed the boring parts of the job — boilerplate, repetitive component structures, first-draft test cases. The gain isn't that AI writes better code than a senior developer; it's that it removes the friction of writing code a developer already knows how to write. That time goes back into the parts that actually need a person: architecture decisions, edge cases, the interface details a generated component always gets slightly wrong.",
      },
      { type: "heading", level: 2, text: "Where It Still Falls Short" },
      {
        type: "paragraph",
        text: "The same tools struggle with anything that depends on context outside the file they're looking at — a design system's actual conventions, a legacy API's undocumented quirks, the reason a piece of business logic exists in the first place. We've seen AI-generated code that's syntactically perfect and functionally wrong, because it optimised for the pattern it was trained on rather than the constraint that was actually in play. Treating AI output as a first draft, not a finished feature, is the difference between it saving time and costing it.",
      },
      { type: "heading", level: 2, text: "Personalisation Without the Uncanny Valley" },
      {
        type: "paragraph",
        text: "Recommendation engines and adaptive interfaces are real and useful, but the failure mode is obvious the moment a user notices they're being profiled. The sites that get this right personalise the small, useful things — remembering a filter, surfacing a relevant product — rather than trying to make the site feel like it \"knows\" the user. Subtlety is the actual hard part, not the machine learning.",
      },
      { type: "heading", level: 2, text: "Where We're Actually Using It on Client Projects" },
      {
        type: "list",
        items: [
          "Search and content discovery, where relevance genuinely improves the experience instead of just adding a feature",
          "Internal tooling that summarises or triages content, where speed matters more than polish",
          "Automated testing, where AI catches regressions a manual pass would miss",
          "Accessibility auditing, flagging issues before they reach a real user",
        ],
      },
      { type: "heading", level: 2, text: "What We'd Tell a Client Considering This" },
      {
        type: "paragraph",
        text: "Don't build \"an AI feature\" because the roadmap has a slot for one. Start with a workflow that's genuinely slow or error-prone today, and ask whether a model actually improves it — sometimes the honest answer is a better search index or a simpler form, not a chatbot. The projects that work are the ones where AI solves a real bottleneck, not the ones decorating a product with a feature that reads well in a pitch deck.",
      },
      { type: "heading", level: 2, text: "The Short Version" },
      {
        type: "paragraph",
        text: "AI in web development isn't one trend — it's several unrelated capabilities (code generation, personalisation, search, automation) that happen to share a name. Some of them will change how you build software. Others are still better solved the old way. Knowing which is which, for your specific product, is most of the actual work.",
      },
    ],
  },
  {
    slug: "dark-patterns-in-ux-design",
    title: "Dark Patterns in UX Design: Where Persuasion Turns Manipulative",
    seoTitle: "Dark Patterns in UX Design Explained",
    excerpt:
      "The line between persuasive design and manipulation, the patterns that cross it most often, and why ethical UX is the better business decision.",
    category: "design",
    date: "2026-08-12",
    cover: {
      src: "/images/blog/dark-patterns-ux.png",
      alt: "Grid of dark UI tiles with two highlighted in accent purple, standing out from the rest",
    },
    author: { name: "Priya Nair", role: "Lead UI/UX Designer" },
    lead: "Dark patterns aren't a design mistake — they're a design decision. Somewhere in every checkout flow that hides its fees or subscription that resists cancellation, someone chose conversion over honesty. Here's what that choice actually costs, and where the line sits.",
    body: [
      { type: "heading", level: 2, text: "What Actually Counts as a Dark Pattern" },
      {
        type: "paragraph",
        text: "Persuasive design and deceptive design get lumped together constantly, and they aren't the same thing. A well-placed testimonial or a genuinely limited launch discount is persuasion — it gives someone a real reason to act. A dark pattern is different: it steers someone toward an outcome they wouldn't choose if they had the full picture, and it usually works by hiding information, adding friction selectively, or borrowing urgency that isn't real. The test we use internally is simple: if the user noticed exactly what the interface just did, would they feel tricked? If yes, it doesn't ship, no matter what it does for the conversion number.",
      },
      { type: "heading", level: 2, text: "The Patterns We See Most Often" },
      {
        type: "paragraph",
        text: "A few of these show up in almost every audit we run, across industries that have nothing else in common:",
      },
      {
        type: "list",
        items: [
          "Confirmshaming — guilt-tripping the decline option instead of just offering it (\"No thanks, I don't want to save money\")",
          "Roach motel — a one-click signup paired with a cancellation flow that requires a phone call, a support ticket, or five extra screens",
          "Drip pricing — the real total only appears on the last step of checkout, after delivery fees, service charges, and taxes get added one at a time",
          "Forced continuity — a free trial that converts to a paid plan silently, with no reminder email before the first charge",
          "Pre-checked boxes — marketing consent or add-ons opted in by default, so declining takes active effort instead of being the neutral choice",
          "Fake urgency — countdown timers that reset on refresh, or \"12 people are viewing this\" counters with no real data behind them",
        ],
      },
      { type: "heading", level: 2, text: "Why They Work Short-Term and Fail Long-Term" },
      {
        type: "paragraph",
        text: "Dark patterns exploit the fact that most interface decisions get made fast and without much thought — that's exactly the moment they're designed for. Judged by a single session's conversion rate, they often work. Judged by anything longer, they don't: churn goes up once the trick is noticed, support tickets and refund disputes climb, and the brand takes the kind of reputational hit that's expensive to undo. It's not just a reputational risk anymore either — the FTC's 2022 enforcement report specifically targeted dark patterns in subscription cancellation flows, and the EU's Digital Services Act now prohibits manipulative interface design outright. What used to be a UX ethics debate is increasingly a compliance question with real penalties attached.",
      },
      { type: "heading", level: 2, text: "How We Draw the Line on Our Own Projects" },
      {
        type: "paragraph",
        text: "A cancellation flow should never take more steps than the signup flow that created the account — if signing up is one click, cancelling doesn't get to be four. A trial that's about to convert to paid gets an email before the charge, not after. Required fields look required; nothing is disguised as decorative to sneak past attention. None of this is about being nice for its own sake — it's that support tickets, chargebacks, and churn cost more than the extra conversion points a dark pattern buys, and we'd rather build something a client isn't quietly worried will get them a regulator's letter.",
      },
      { type: "heading", level: 2, text: "A Practical Checklist Before You Ship" },
      {
        type: "list",
        items: [
          "Can the user complete the \"no\" path in exactly as many steps as the \"yes\" path?",
          "Is every fee visible before the final step, not revealed there?",
          "Does cancelling take the same number of steps as signing up?",
          "Would the copy still make sense with the urgency or guilt language removed?",
          "Are opt-ins actually opt-in, rather than a pre-checked default?",
        ],
      },
      { type: "heading", level: 2, text: "The Short Version" },
      {
        type: "paragraph",
        text: "Ethical UX isn't a constraint on good design — it's a bet that trust compounds and deception doesn't. The interfaces that hold up over years are the ones that were honest on day one, not the ones that squeezed out an extra half-point of conversion by hiding what they were actually asking for.",
      },
    ],
  },
  {
    slug: "ai-agents-transforming-healthcare",
    title: "How AI Agents Are Transforming Healthcare and Improving Patient Outcomes",
    seoTitle: "AI Agents in Healthcare: Patient Outcomes",
    excerpt:
      "How AI agents actually change clinical workflows, where they genuinely help patient outcomes, and where human judgment still has to stay in the loop.",
    category: "strategy",
    date: "2026-08-17",
    cover: {
      src: "/images/blog/ai-agents-healthcare.png",
      alt: "A network of connected nodes on black, five highlighted in accent purple, representing coordinated AI agents",
    },
    author: { name: "Anand Menon", role: "AI & Data Science Lead" },
    lead: "Most \"AI in healthcare\" coverage still means a chatbot answering symptom questions. Agents are a different thing: software that takes a multi-step action across real systems — pulling a chart, cross-checking a drug list, drafting a note — instead of just answering one question and stopping. That distinction is where the actual patient-outcome case lives.",
    body: [
      { type: "heading", level: 2, text: "What \"Agent\" Actually Means in a Clinical Setting" },
      {
        type: "paragraph",
        text: "A chatbot answers a question. An agent completes a task that spans several steps and several systems on its own — checking a patient's history, cross-referencing it against a new prescription, flagging a conflict, and drafting the note that explains why, all before a clinician looks at it. The difference matters because the failure modes are different too: a chatbot that gets a fact wrong gives a bad answer, but an agent that acts on a wrong assumption can carry that error through several downstream steps before anyone notices. That's the real reason healthcare has been slower to adopt agentic AI than, say, retail or logistics — not caution for its own sake, but a correctly higher bar for what \"good enough\" means when the output touches a chart.",
      },
      { type: "heading", level: 2, text: "Where Agents Are Already Producing Real Outcomes" },
      {
        type: "paragraph",
        text: "The deployments that are actually working share a common shape: narrow scope, a clear point where a clinician reviews the output, and a task that was genuinely eating clinical time before automation touched it.",
      },
      {
        type: "list",
        items: [
          "Ambient documentation — an agent listens to a visit and drafts the clinical note, so the clinician edits and signs instead of typing from scratch after hours",
          "Intake and triage — symptom and history intake structured and prioritized before a clinician sees the patient, so the most urgent cases surface first",
          "Prior authorization and claims — the paperwork that used to take a staff member 20 minutes per request, filled and submitted correctly the first time",
          "Medication cross-checks — a full interaction check against a patient's actual current prescriptions, not just the one being written",
          "Remote monitoring — an agent watching a continuous stream of vitals or wearable data that only escalates when a pattern is genuinely abnormal, instead of alarm-fatiguing a nurse with every blip",
        ],
      },
      { type: "heading", level: 2, text: "The Outcome Case, Not Just the Efficiency Case" },
      {
        type: "paragraph",
        text: "It's easy to justify this purely on hours saved, but the outcome case is the stronger one. A clinician who isn't spending forty minutes a day on notes has more attention left for the patient in front of them. A triage system that surfaces the urgent case first means intervention happens sooner, not after a queue. A medication check that catches an interaction a busy shift might have missed prevents an adverse event, not just a delay. None of that shows up as a productivity metric — it shows up as fewer things going wrong.",
      },
      { type: "heading", level: 2, text: "Where Human Judgment Still Has to Stay in the Loop" },
      {
        type: "paragraph",
        text: "Every deployment worth trusting has a clinician reviewing the agent's output before it reaches a patient or becomes part of the permanent record — the agent drafts and flags, it doesn't decide. That's not overcaution; a model that's right 98% of the time is still wrong often enough to matter when the output is a diagnosis note or a medication change. There's a regulatory dimension too: anything that functions as clinical decision support usually needs to be built and documented with an actual approval pathway in mind (FDA clearance in the US, equivalent frameworks elsewhere), and patient data has to move through the same access controls and audit requirements as the rest of the clinical record — not a separate, looser pipeline because it's \"just the AI system.\"",
      },
      { type: "heading", level: 2, text: "What We Check Before Building One" },
      {
        type: "list",
        items: [
          "Is there a licensed clinician who reviews every output before it reaches a patient or a chart?",
          "Does the system log a complete, reviewable audit trail of what the agent did and why?",
          "Is patient data handled under the same access controls as the rest of the clinical record?",
          "Can the agent explain the reason it flagged something, not just that it flagged it?",
          "Does the task the agent is automating actually eat real clinical time today, or is this AI for its own sake?",
        ],
      },
      { type: "heading", level: 2, text: "The Short Version" },
      {
        type: "paragraph",
        text: "AI agents earn a place in healthcare by removing the repetitive burden that pulls attention away from patients, and by catching the pattern a busy shift can miss — not by replacing clinical judgment. The systems worth building are the ones a clinician would actually trust enough to leave turned on.",
      },
    ],
  },
  {
    slug: "conversational-ai-how-chatbots-understand-language",
    title: "Conversational AI: How Chatbots and Virtual Assistants Understand Language",
    seoTitle: "How Chatbots Understand Language",
    excerpt:
      "How tokenization, embeddings, and attention actually let a chatbot follow a conversation, and where that process still breaks down.",
    category: "development",
    date: "2026-08-18",
    cover: {
      src: "/images/blog/conversational-ai.png",
      alt: "Rows of variable-width bars resembling tokenized text, several highlighted in accent purple",
    },
    author: { name: "Divya Krishnan", role: "AI & Data Science Engineer" },
    lead: "\"Understand\" is doing a lot of work in that sentence. A chatbot doesn't read your message the way a person does — it breaks it into pieces, converts those pieces into numbers, and predicts what should come next based on patterns learned from an enormous amount of text. That process is genuinely clever. It is not comprehension, and the difference matters for what you should trust it to do.",
    body: [
      { type: "heading", level: 2, text: "It Starts by Breaking Your Sentence Apart" },
      {
        type: "paragraph",
        text: "Before a model can do anything with \"what's my order status,\" it splits that sentence into tokens — not always whole words, often word fragments, so \"status\" might become two or three pieces the model has seen thousands of times across its training data. Every token gets mapped to a vector: a long list of numbers that encodes how that piece of text tends to relate to others. Words that show up in similar contexts end up with similar vectors, which is why a model can treat \"cancel\" and \"refund\" as related concepts without ever being told they're related — it picked that up from how often those words appeared near each other across everything it read.",
      },
      { type: "heading", level: 2, text: "Attention Is Why It Remembers What You Said Three Messages Ago" },
      {
        type: "paragraph",
        text: "The mechanism that actually makes modern chatbots feel coherent across a conversation is attention — at each step, the model weighs every earlier token to decide which ones matter most for predicting the next one. That's how a reply can correctly reference something you mentioned several turns back: the model isn't \"remembering\" in the way a person does, it's re-weighing the entire visible conversation every single time it generates a new token. That also explains the limits: once a conversation runs past the model's context window, the earliest parts genuinely fall out of view, and it will confidently continue as though they were never said.",
      },
      { type: "heading", level: 2, text: "Two Different Tools Get Called \"Chatbots\"" },
      {
        type: "paragraph",
        text: "It's worth separating two approaches that get lumped under the same word, because the right choice depends entirely on the task:",
      },
      {
        type: "list",
        items: [
          "Intent classification — the message gets matched against a fixed set of known intents (\"check order status,\" \"reset password\"), each routed to a specific, predictable action. Narrow, boring, and reliable — the right tool for a structured, high-volume support flow.",
          "Generative response — the model produces open-ended text token by token, which handles genuinely novel questions well but is harder to constrain, because there's no fixed list of \"allowed\" answers to fall back on.",
        ],
      },
      {
        type: "paragraph",
        text: "Most systems worth building are a mix: intent classification for the handful of tasks that happen constantly and need to be exact, a generative layer for everything that doesn't fit a known pattern.",
      },
      { type: "heading", level: 2, text: "Where the Illusion of Understanding Breaks" },
      {
        type: "paragraph",
        text: "Fluency and accuracy are separate properties, and a model that's confidently wrong reads exactly the same as one that's confidently right — that's the core of the hallucination problem. Ambiguous or very short input (\"cancel it\" with no earlier context) forces the model to guess at what \"it\" refers to, and it will guess smoothly rather than ask for clarification unless it's specifically built to. And because the model has no persistent memory outside its context window, a long conversation can drift: it isn't tracking state the way a form or a database would, it's re-deriving its best guess from whatever text is currently in view.",
      },
      { type: "heading", level: 2, text: "What We Actually Build Around That" },
      {
        type: "paragraph",
        text: "We ground answers in real data instead of trusting the model's training knowledge alone — retrieving the actual order record or policy document and having the model summarize that, not recall it from memory. High-stakes actions (refunds, account changes) go through explicit confirmation steps or a rules layer, not a generative reply alone. And every conversation gets logged in a way a human can review, because the failure mode that matters isn't the assistant sounding robotic — it's the assistant sounding confident while being wrong, unnoticed.",
      },
      { type: "heading", level: 2, text: "The Short Version" },
      {
        type: "paragraph",
        text: "A chatbot is a very capable pattern-matcher operating at enormous scale, not a system that comprehends what you're asking. Built with that distinction in mind — grounded in real data, scoped to what it can actually get right, reviewed rather than trusted blindly — it's a genuinely useful tool. Built on the assumption that it \"understands,\" it's a liability wearing a friendly interface.",
      },
    ],
  },
  {
    slug: "myths-about-developing-your-startups-mvp",
    title: "Myths About Developing Your Startup's MVP",
    seoTitle: "MVP Myths Every Startup Believes",
    excerpt:
      "Why 'cheaper,' 'rougher,' and 'build it all so we're ready to scale' are the three ideas about MVPs that waste the most founder runway.",
    category: "strategy",
    date: "2026-08-18",
    cover: {
      src: "/images/blog/mvp-myths.png",
      alt: "A pyramid of stacked outlined rectangles narrowing to one solid filled block at the top, representing a small validated core beneath a larger hollow scope",
    },
    author: { name: "Karthik Iyer", role: "Product Strategy Lead" },
    lead: "Most founders who tell us their MVP \"failed\" didn't actually test anything — they built a smaller, buggier version of their full product and were surprised when a small, buggy product didn't convert. An MVP isn't a discount version of the real thing. It's a specific question, built just far enough to get a real answer. Here's what gets that confused most often.",
    body: [
      { type: "heading", level: 2, text: "Myth: MVP Means \"Fewer Features, Same Product\"" },
      {
        type: "paragraph",
        text: "The most common failure mode is treating the MVP as the full product with items removed from a checklist — same number of user flows, same ambition, just thinner. That isn't minimal, it's incomplete, and users can tell the difference. A real MVP starts from the other direction: pick the one assumption your business actually depends on — that people will pay for this, that this workflow saves real time, that this audience wants it at all — and build only enough to test that assumption honestly. Everything else, including features you're confident about, waits. The scope question isn't \"what can we cut,\" it's \"what's the smallest thing that would prove or kill this idea.\"",
      },
      { type: "heading", level: 2, text: "Myth: It's Supposed to Look Rough" },
      {
        type: "paragraph",
        text: "\"Minimal\" gets read as permission to skip design and usability, and that reasoning backfires specifically because of what an MVP is for. You're not asking people to tolerate a rough interface out of goodwill — you're trying to measure whether they'd actually use and pay for this, and a confusing flow or a broken-feeling interaction contaminates that measurement. A user who bounces because the checkout looked untrustworthy isn't telling you your idea is wrong; they're telling you your prototype looked unfinished, which is a different and much less useful signal. Minimal scope and careless execution are not the same decision — you can and should ship a narrow MVP that still feels considered.",
      },
      { type: "heading", level: 2, text: "Myth: Build for Scale Now So You Don't Have to Rebuild Later" },
      {
        type: "paragraph",
        text: "We get asked to architect for a million users before there's a validated reason to expect a thousand. That instinct is understandable and almost always wrong at MVP stage — infrastructure sized for hypothetical scale is budget and calendar time spent on a problem you don't have yet, taken directly from the budget and time you need to find out if you have a product at all. The teams that scale smoothly aren't the ones who over-built early; they're the ones who kept the early system simple enough to move fast, then rebuilt the specific piece that actually hit a real limit, with real usage data telling them exactly what to fix.",
      },
      { type: "heading", level: 2, text: "Myth: More Features Give You a Better Read on the Market" },
      {
        type: "paragraph",
        text: "It feels safer to ship five features than to bet everything on one, but a five-feature MVP doesn't give you five times the signal — it gives you a blurred average. When usage is mixed, you can't tell whether people came for feature two and tolerated the rest, or whether nothing landed and the numbers are just noise. A narrow MVP produces a sharp result: people either did the one thing you built it for, or they didn't. That's a founder decision you can actually act on, which a spread-thin dashboard usually isn't.",
      },
      { type: "heading", level: 2, text: "Myth: You Ship the MVP Once, Then Move on to \"the Real Product\"" },
      {
        type: "paragraph",
        text: "An MVP isn't a milestone you pass through on the way to the actual build — it's the first iteration of a loop you should stay in. Ship the narrow version, watch what real users actually do with it (not what they said they'd do in a discovery call), and let that behavior decide what gets built next. Teams that treat the MVP as a one-time gate tend to disband the fast, cheap testing process right when it would matter most — for the second and third features, which need exactly the same validation the first one did.",
      },
      { type: "heading", level: 2, text: "Myth: Skipping Discovery Gets You to Market Faster" },
      {
        type: "paragraph",
        text: "Cutting research to save a week or two at the start is the most expensive shortcut on this list, because it doesn't remove the work — it moves it later and adds interest. A week of talking to prospective users and mapping the actual workflow you're replacing usually changes what gets built. Skip it, and that same correction happens after launch, as a rebuild, informed by users who already formed a first impression and churned before you got the chance to fix it.",
      },
      { type: "heading", level: 2, text: "What We Check Before Scoping an MVP" },
      {
        type: "list",
        items: [
          "Is there one specific assumption this version is meant to test — not a general sense that \"we'll learn a lot\"?",
          "Would a clear no from real users actually change what we build next, or are we planning to ship it regardless?",
          "Does the scope fit inside weeks, not a quarter — if not, it's not minimal yet?",
          "Is the core flow polished enough that a bad result reflects the idea, not a broken interaction?",
          "Have we talked to the people we're building for before writing any code, not just after?",
        ],
      },
      { type: "heading", level: 2, text: "The Short Version" },
      {
        type: "paragraph",
        text: "An MVP is a test, not a smaller product — built to answer one real question as cheaply and honestly as possible, then iterated based on what actual users do with it. Treat it like a stripped-down version of your final vision and you'll spend your runway building the wrong thing more slowly. Treat it like an experiment and you'll spend that same runway finding out what's actually worth building.",
      },
    ],
  },
  // "the-rise-of-edge-computing" — title, excerpt, and date came from the index
  // comp, but the article itself was never written (body: []). Publishing an
  // indexed, sitemap-listed page with no body is a thin-content SEO risk, so
  // the entry is removed rather than shipped empty. Re-add it here (with a
  // written body) once the article exists — everything that lists posts
  // (sitemap, blog index, the blog mega menu, related-posts) reads this array
  // directly, so restoring the entry is enough to bring the page back.
];

export const POSTS_PER_PAGE = 6;

export function postHref(slug: string): string {
  return `/blog/${slug}`;
}

export function postBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function relatedPosts(slug: string, limit = 4): Post[] {
  const current = postBySlug(slug);
  if (!current) return [];
  const sameCategory = posts.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = posts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

/** Stable across server and client — avoids a locale-dependent hydration mismatch. */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
