import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServiceDetailHero } from "@/components/sections/services/detail/ServiceDetailHero";
import { ServicePlatforms } from "@/components/sections/services/detail/ServicePlatforms";
import { ServicePlatformGrid } from "@/components/sections/services/detail/ServicePlatformGrid";
import { ServiceFeatureCards } from "@/components/sections/services/detail/ServiceFeatureCards";
import { ServiceCapabilities } from "@/components/sections/services/detail/ServiceCapabilities";
import { ServiceBento } from "@/components/sections/services/detail/ServiceBento";
import { ServicePrinciples } from "@/components/sections/services/detail/ServicePrinciples";
import { ServiceCapabilityTabs } from "@/components/sections/services/detail/ServiceCapabilityTabs";
import { ServiceProof } from "@/components/sections/services/detail/ServiceProof";
import { ServiceIndustries } from "@/components/sections/services/detail/ServiceIndustries";
import { ServiceToolStack } from "@/components/sections/services/detail/ServiceToolStack";
import { ServiceWhyUs } from "@/components/sections/services/detail/ServiceWhyUs";
import { ServiceEngagementModels } from "@/components/sections/services/detail/ServiceEngagementModels";
import { ServiceChallenges } from "@/components/sections/services/detail/ServiceChallenges";
import { ServiceDeliveryProcess } from "@/components/sections/services/detail/ServiceDeliveryProcess";
import { ServiceMvpBento } from "@/components/sections/services/detail/ServiceMvpBento";
import { ServiceOrbital } from "@/components/sections/services/detail/ServiceOrbital";
import { ServiceProcess } from "@/components/sections/services/detail/ServiceProcess";
import { ServiceCards } from "@/components/sections/services/detail/ServiceCards";
import { ServiceExpertise } from "@/components/sections/services/detail/ServiceExpertise";
import { ServiceWork } from "@/components/sections/services/detail/ServiceWork";
import { serviceDetail, serviceDetailSlugs } from "@/lib/service-detail-content";
import { services } from "@/lib/services";

type Params = { params: Promise<{ slug: string }> };

/**
 * Only services with written detail copy are enumerated, so the remaining
 * services 404 rather than rendering an empty shell. `dynamicParams = false`
 * makes that a build-time guarantee instead of a runtime check.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetailSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const detail = serviceDetail(slug);
  if (!detail) return {};

  // The nav label, not the display title — the latter carries a trailing period.
  const label = services.find((s) => s.slug === slug)?.label ?? detail.title;
  return {
    title: label,
    description: detail.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const detail = serviceDetail(slug);
  if (!detail) notFound();

  return (
    <>
      <ServiceDetailHero detail={detail} />
      {detail.platforms ? <ServicePlatforms detail={detail} /> : null}
      {detail.platformGrid ? <ServicePlatformGrid detail={detail} /> : null}
      {detail.capabilityTabs ? <ServiceCapabilityTabs detail={detail} /> : null}
      {detail.proof ? <ServiceProof detail={detail} /> : null}
      {detail.industries ? <ServiceIndustries detail={detail} /> : null}
      {detail.toolStack ? <ServiceToolStack detail={detail} /> : null}
      {detail.whyUs ? <ServiceWhyUs detail={detail} /> : null}
      {detail.engagementModels ? <ServiceEngagementModels detail={detail} /> : null}
      {detail.challenges ? <ServiceChallenges detail={detail} /> : null}
      {detail.deliveryProcess ? <ServiceDeliveryProcess detail={detail} /> : null}
      {detail.principles ? <ServicePrinciples detail={detail} /> : null}
      {detail.featureCards ? <ServiceFeatureCards detail={detail} /> : null}
      {detail.capabilities ? <ServiceCapabilities detail={detail} /> : null}
      {detail.bento ? <ServiceBento detail={detail} /> : null}
      {detail.mvpBento ? <ServiceMvpBento detail={detail} /> : null}
      {detail.orbital ? <ServiceOrbital detail={detail} /> : null}
      {detail.process ? <ServiceProcess detail={detail} /> : null}
      {detail.serviceCards ? <ServiceCards detail={detail} /> : null}
      {detail.expertise ? <ServiceExpertise detail={detail} /> : null}
      {detail.work ? <ServiceWork detail={detail} /> : null}
      <CtaBand />
    </>
  );
}
