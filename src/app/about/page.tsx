import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { WhyHireUs } from "@/components/sections/about/WhyHireUs";

const description =
  "Adpedia Neo is a creative digital studio, building brands since 2012 through branding, UI/UX design, web and app development, and AI-driven digital experiences.";

export const metadata: Metadata = {
  title: "About us",
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", title: "About us", description },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <WhyHireUs />
      <CtaBand />
    </>
  );
}
