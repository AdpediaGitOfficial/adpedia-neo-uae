import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersIntro } from "@/components/sections/careers/CareersIntro";
import { JobsSection } from "@/components/sections/careers/JobsSection";
import { careersIntro } from "@/lib/careers-content";

export const metadata: Metadata = {
  title: "Careers",
  description: careersIntro.body,
  alternates: { canonical: "/careers" },
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
