import Image from "next/image";
import { Star } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text, Title } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import type { Capability, ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-capabilities-heading";

type Caps = NonNullable<ServiceDetail["capabilities"]>;

/**
 * The light "Services" bento. Four columns, each a light-grey frame holding two
 * stacked cards, with the social-proof column (stat + testimonial) interleaved
 * between the capability columns — the arrangement from Figma `935:6509`.
 *
 * Three capability card treatments, mirroring the comp:
 * - `overlay`: photo fills the card, title/body over a dark scrim (dark card).
 * - `banner`: photo banner on top, title/body below (light card).
 * - `icon`: glyph on a light surface, title/body below (light card).
 *
 * The columns are a real grid (4 → 2 → 1 as the viewport narrows), so it
 * reflows instead of overflowing. On `lg` the columns are equal height and each
 * is `justify-between`, so the top cards top-align and the bottom cards
 * bottom-align across all four. The overlay (photo) card is `flex-1` so it grows
 * to fill its column — that packs the capability columns tight (hairline gap,
 * like the comp) and leaves the big middle gap only in the proof column, where
 * both cards are fixed-size. Non-overlay cards are `shrink-0` so the stretch
 * can't squash them; the overlay keeps a `min-h` for when there's nothing to
 * fill (a single stacked column on mobile).
 */
export function ServiceCapabilities({ detail }: { detail: ServiceDetail }) {
  const caps = detail.capabilities;
  if (!caps) return null;

  const items = caps.items;
  // Column composition follows the comp. Item order in the content file is:
  // 0 Website (overlay), 1 Web App (icon), 2 E-commerce (banner),
  // 3 API (overlay), 4 Performance (banner), 5 Custom CMS (icon).
  const columns: React.ReactNode[][] = [
    [<CapabilityCard key="website" item={items[0]} />, <CapabilityCard key="webapp" item={items[1]} />],
    [<StatCard key="stat" stat={caps.stat} />, <TestimonialCard key="quote" testimonial={caps.testimonial} />],
    [<CapabilityCard key="ecom" item={items[2]} />, <CapabilityCard key="perf" item={items[4]} />],
    [<CapabilityCard key="api" item={items[3]} />, <CapabilityCard key="cms" item={items[5]} />],
  ];

  return (
    <Section tone="light" aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{caps.eyebrow}</Eyebrow>
          <Heading as="h2" id={headingId} size="lg" weight="light" surface="light" className="mt-5 max-w-3xl">
            {caps.title}
          </Heading>
        </div>
        <Text size="body-sm" surface="light" className="max-w-md lg:pb-2 lg:text-right">
          {caps.intro}
        </Text>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((cards, i) => (
          <Reveal key={i} className="flex flex-col justify-between gap-2 bg-paper-200 p-2">
            {cards}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/** One capability, rendered per its variant. */
function CapabilityCard({ item }: { item: Capability }) {
  if (item.variant === "overlay" && item.image) {
    return (
      <article className="group relative flex min-h-[16rem] flex-1 flex-col overflow-hidden bg-ink">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
        />
        {/* Scrim so the top-set copy stays legible over any photo — a long fade
            that fully covers the title/body band before easing to clear. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-3/4 bg-gradient-to-b from-black/90 via-black/50 to-transparent"
        />
        <div className="relative p-6">
          <Title as="h3" size="md" weight="medium">
            {item.title}
          </Title>
          <Text size="body-sm" className="mt-2 max-w-[16rem]">
            {item.body}
          </Text>
        </div>
      </article>
    );
  }

  if (item.variant === "banner" && item.image) {
    return (
      <article className="group flex shrink-0 flex-col overflow-hidden bg-white">
        <div className="relative aspect-[398/150] overflow-hidden bg-ink">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <Title as="h3" size="md" weight="medium" surface="light">
            {item.title}
          </Title>
          <Text size="body-sm" surface="light" className="mt-2">
            {item.body}
          </Text>
        </div>
      </article>
    );
  }

  // icon
  return (
    <article className="group flex shrink-0 flex-col bg-white p-6">
      {item.icon ? (
        <div className="relative h-14 w-14">
          <Image
            src={item.icon.src}
            alt={item.icon.alt}
            fill
            sizes="56px"
            className="object-contain transition-transform duration-500 ease-out-expo group-hover:scale-105"
          />
        </div>
      ) : null}
      <Title as="h3" size="md" weight="medium" surface="light" className="mt-6">
        {item.title}
      </Title>
      <Text size="body-sm" surface="light" className="mt-2">
        {item.body}
      </Text>
    </article>
  );
}

/** Client-count + rating card. */
function StatCard({ stat }: { stat: Caps["stat"] }) {
  return (
    <div className="flex shrink-0 flex-col gap-5 bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex">
          {stat.avatars.map((avatar, i) => (
            <span
              key={avatar.src}
              className={
                "relative h-10 w-10 overflow-hidden rounded-full bg-paper-200 ring-2 ring-white" +
                (i > 0 ? " -ml-2.5" : "")
              }
            >
              <Image src={avatar.src} alt={avatar.alt} fill sizes="40px" className="object-cover" />
            </span>
          ))}
        </div>
        <span className="flex items-center gap-1.5">
          <Text as="span" tone="primary" surface="light" className="font-medium">
            {stat.rating}
          </Text>
          <Star className="h-4 w-4 fill-accent-600 text-accent-600" aria-hidden />
        </span>
      </div>
      <Text size="body-sm" surface="light">
        <span className="font-medium text-ink">{stat.value}</span> {stat.label}
      </Text>
    </div>
  );
}

/** Pull-quote card. */
function TestimonialCard({ testimonial }: { testimonial: Caps["testimonial"] }) {
  return (
    <figure className="flex shrink-0 flex-col gap-6 bg-white p-6">
      <div className="flex gap-1" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-ink text-ink" />
        ))}
      </div>
      <blockquote className="flex-1">
        <Text size="body" surface="light">
          &ldquo;{testimonial.quote}&rdquo;
        </Text>
      </blockquote>
      <figcaption className="flex items-center gap-4">
        <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-paper-200">
          <Image
            src={testimonial.avatar.src}
            alt={testimonial.avatar.alt}
            fill
            sizes="48px"
            className="object-cover"
          />
        </span>
        <span className="flex flex-col">
          <Text as="span" size="body" tone="primary" surface="light" className="font-medium">
            {testimonial.author}
          </Text>
          <Text as="span" size="caption" tone="muted" surface="light" className="mt-1">
            {testimonial.role}
          </Text>
        </span>
      </figcaption>
    </figure>
  );
}
