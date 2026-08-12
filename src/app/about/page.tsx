import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { WhyHireUs } from "@/components/sections/about/WhyHireUs";
import { aboutIntro } from "@/lib/about-content";

export const metadata: Metadata = {
  title: "About us",
  description: aboutIntro.body,
  alternates: { canonical: "/about" },
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
