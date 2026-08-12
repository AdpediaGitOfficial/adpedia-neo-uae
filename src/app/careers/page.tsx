import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersIntro } from "@/components/sections/careers/CareersIntro";
import { JobsSection } from "@/components/sections/careers/JobsSection";

const description =
  "Explore careers at Adpedia Neo — a creative digital studio building brands through branding, UI/UX design, and web and app development. See our open roles.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: { canonical: "/careers" },
  openGraph: { type: "website", title: "Careers", description },
};

export default function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersIntro />
      <JobsSection />
      <CtaBand />
    </>
  );
}
