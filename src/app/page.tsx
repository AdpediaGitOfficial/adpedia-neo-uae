import { Hero } from "@/components/sections/home/Hero";
import { TrustedLogos } from "@/components/sections/home/TrustedLogos";
import { Stats } from "@/components/sections/home/Stats";
import { AiSection } from "@/components/sections/home/AiSection";
import { Clarity } from "@/components/sections/home/Clarity";
import { ServicesAccordion } from "@/components/sections/home/ServicesAccordion";
import { Stories } from "@/components/sections/home/Stories";
import { Industries } from "@/components/sections/home/Industries";
import { Testimonials } from "@/components/sections/home/Testimonials";
import { CtaBand } from "@/components/sections/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustedLogos />
      <Stats />
      <AiSection />
      <Clarity />
      <ServicesAccordion />
      <Stories />
      <Industries />
      <Testimonials />
      <CtaBand />
    </>
  );
}
