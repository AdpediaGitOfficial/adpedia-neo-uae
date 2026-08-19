/** Copy for the /contact page (Figma node 935-2513). */

export const contactHero = {
  title: "Get in Touch.",
  intro:
    "Tell us what you're building and where it's stuck. We'll reply with next steps, not a sales deck.",
};

export const contactForm = {
  fields: {
    name: { label: "Name", placeholder: "Name*" },
    email: { label: "Email", placeholder: "Email*" },
    company: { label: "Company", placeholder: "Company*" },
    service: { label: "Service", placeholder: "Select a service" },
    message: { label: "Message", placeholder: "Message*" },
  },
  submit: "Send message",
  success: "Thanks — your message is on its way. We'll be in touch shortly.",
  error: "Something went wrong sending your message. Please try again or email us directly.",
};

/** Options for the "Select a service" dropdown — mirrors the service mega menu. */
export const serviceOptions = [
  "UI/UX Design",
  "Web Development",
  "Mobile App Development",
  "AI & Data Science",
  "Product Development",
  "DevOps Services",
  "General Inquiry",
];

/** Copy for the quick-contact modal opened from the header's "Book a call" CTA. */
export const quickContactModal = {
  eyebrow: "Let's Talk.",
  title: "Tell us what you're building.",
  intro: "Share a few details and we'll get back to you within a day.",
  fields: {
    name: { label: "Name", placeholder: "Name*" },
    email: { label: "Email", placeholder: "Email*" },
    phone: { label: "Phone Number", placeholder: "Phone Number*" },
    service: { label: "Service", placeholder: "Select a service" },
    message: { label: "Message", placeholder: "Message*" },
  },
  submit: "Send message",
  success: "Thanks — your message is on its way. We'll be in touch shortly.",
  error: "Something went wrong sending your message. Please try again or email us directly.",
  footnote: "We typically reply within one business day.",
};
