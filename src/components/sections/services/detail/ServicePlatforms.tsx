import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-platforms-heading";

/**
 * The platforms the service ships to, as a row of square tiles.
 *
 * The comp's device: pure-black tiles that emerge from a soft indigo ambient
 * glowing *behind* the whole row — so the squares blend into the ground and are
 * read by contrast against the lit gaps, rather than sitting in hard, per-tile
 * glowing boxes. The glow is one shared field, not a shadow on each card.
 *
 * Tile artwork is decorative: each image sits directly above its own visible
 * label, so alt text would only repeat it to a screen reader.
 */
export function ServicePlatforms({ detail }: { detail: ServiceDetail }) {
  const platforms = detail.platforms;
  if (!platforms || platforms.length === 0) return null;

  return (
    <Section padded={false} className="pb-section" aria-labelledby={headingId}>
      <h2 id={headingId} className="sr-only">
        Platforms we design for
      </h2>

      <div className="relative isolate">
        {/* One soft indigo field behind the row. The tiles are opaque black and
            block it, so they surface from the glow instead of carrying a hard
            edge — the blend the comp shows. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-8 -inset-y-16 -z-10 bg-[radial-gradient(60%_58%_at_50%_50%,rgba(54,49,191,0.20),transparent_72%)]"
        />

        <Stagger className="grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4 lg:gap-20">
          {platforms.map((platform) => (
            <StaggerItem key={platform.label}>
              <div className="flex aspect-square flex-col items-center justify-center gap-7 bg-ink p-6">
                <div className="relative aspect-square w-[54%]">
                  <Image
                    src={platform.image.src}
                    alt={platform.image.alt}
                    fill
                    sizes="(max-width: 1024px) 28vw, 130px"
                    className="object-contain"
                  />
                </div>
                <Title
                  as="h3"
                  size="md"
                  weight="normal"
                  className="flex min-h-[3.6rem] items-center justify-center text-center"
                >
                  {platform.label}
                </Title>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
