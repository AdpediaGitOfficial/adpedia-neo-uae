import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/CtaBand";
import { Industries } from "@/components/sections/home/Industries";
import { ServicesHero } from "@/components/sections/services/ServicesHero";
import { BuildBrands } from "@/components/sections/services/BuildBrands";
import { WhatWeDo } from "@/components/sections/services/WhatWeDo";
import { servicesHero } from "@/lib/services-content";

export const metadata: Metadata = {
  title: "Services",
  description: servicesHero.intro,
  alternates: { canonical: "/services" },
  openGraph: { type: "website", title: "Services", description: servicesHero.intro },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <BuildBrands />
      <WhatWeDo />
      <Industries />
      <CtaBand />
    </>
  );
}
