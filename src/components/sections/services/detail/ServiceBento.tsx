import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Label, Text, Title } from "@/components/ui/typography";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "@/lib/service-detail-content";

const headingId = "service-bento-heading";

/**
 * The services bento on a dark band. The comp cascades the services in a zigzag:
 * each is an image beside its copy, and they alternate right / left going down
 * the page, the left column dropped below the right so they interleave.
 *
 * That's a two-column grid where each service sits on its own row, alternating
 * `col-start` — item 0 right, item 1 left, item 2 right … — so consecutive items
 * step down opposite sides. On a narrow screen the grid collapses and the list
 * reads straight down in order. The comp's yellow accent becomes the accent chip
 * (the palette is indigo-only).
 */
const ROW_START = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3", "lg:row-start-4", "lg:row-start-5", "lg:row-start-6"];

export function ServiceBento({ detail }: { detail: ServiceDetail }) {
  const bento = detail.bento;
  if (!bento) return null;

  return (
    <Section aria-labelledby={headingId}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div>
          <Eyebrow>{bento.eyebrow}</Eyebrow>
          <Heading as="h2" id={headingId} size="lg" weight="light" className="mt-5 max-w-3xl">
            {bento.title}
          </Heading>
        </div>
        <Text size="body-sm" className="max-w-md lg:pb-2 lg:text-right">
          {bento.intro}
        </Text>
      </div>

      <Stagger
        as="ul"
        className="mt-14 flex list-none flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10"
      >
        {bento.items.map((item, i) => (
          <StaggerItem
            as="li"
            key={item.title}
            className={cn(i % 2 === 0 ? "lg:col-start-2" : "lg:col-start-1", ROW_START[i])}
          >
            <article className="flex h-full flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
              <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-ink-800 sm:w-[46%]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 46vw, 23vw"
                  className="object-cover"
                />
                {item.tag ? (
                  <Label className="absolute bottom-3 left-3 bg-accent-600 px-2.5 py-1.5 text-white">
                    {item.tag}
                  </Label>
                ) : null}
              </div>
              <div className="flex-1">
                <Title as="h3" size="lg" weight="normal">
                  {item.title}
                </Title>
                <Text size="body-sm" className="mt-4">
                  {item.body}
                </Text>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
