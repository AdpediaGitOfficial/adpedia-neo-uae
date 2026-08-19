import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactOffices } from "@/components/sections/contact/ContactOffices";
import { ContactForm } from "@/components/sections/contact/ContactForm";

const description =
  "Have an idea? Share your vision with Adpedia Neo and we'll help turn it into a user-focused experience. Offices in India, the UAE, and Singapore.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", title: "Contact", description },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <Section
        aria-labelledby="contact-details-heading"
        innerClassName="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24"
      >
        {/* Names the section for assistive tech; the comp has no visible heading here. */}
        <h2 id="contact-details-heading" className="sr-only">
          Our offices and enquiry form
        </h2>
        <ContactOffices />
        <ContactForm />
      </Section>

      <CtaBand />
    </>
  );
}
