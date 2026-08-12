import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { CtaBand } from "@/components/sections/CtaBand";
import { PortfolioHero } from "@/components/sections/portfolio/PortfolioHero";
import { PortfolioBrowser } from "@/components/sections/portfolio/PortfolioBrowser";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected work from Adpedia Neo — websites, mobile apps, brand experiences, and commerce platforms designed to solve problems and elevate brands.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <>
      <PortfolioHero />

      <Section padded={false} innerClassName="pb-section" aria-labelledby="projects-heading">
        {/* The comp has no visible heading above the grid. */}
        <h2 id="projects-heading" className="sr-only">
          Selected projects
        </h2>
        <PortfolioBrowser />
      </Section>

      <CtaBand />
    </>
  );
}
