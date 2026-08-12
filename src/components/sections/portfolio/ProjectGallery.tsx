import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Title, Text } from "@/components/ui/typography";
import { Reveal } from "@/components/ui/Reveal";
import { projectDetail } from "@/lib/portfolio-content";
import type { Project } from "@/lib/projects";

/**
 * Showcase imagery. Each entry is half-width by default and pairs two-up;
 * `span: "full"` gives an image the whole content column for wide shots, so a
 * case study can alternate rhythm instead of marching down a uniform grid.
 */
export function ProjectGallery({ gallery }: { gallery: NonNullable<Project["gallery"]> }) {
  if (gallery.length === 0) return null;

  return (
    <Section padded={false} innerClassName="pb-section" aria-labelledby="project-gallery-heading">
      <Title
        as="h2"
        id="project-gallery-heading"
        size="lg"
        weight="light"
        className="uppercase tracking-spaced"
      >
        {projectDetail.gallery}
      </Title>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {gallery.map((image) => {
          const isFull = image.span === "full";
          return (
            <figure key={image.src} className={isFull ? "sm:col-span-2" : undefined}>
              <Reveal>
                <div
                  className={`relative w-full overflow-hidden bg-ink-800 ${
                    isFull ? "aspect-[16/9]" : "aspect-[3/2]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes={isFull ? "(max-width: 640px) 100vw, 1720px" : "(max-width: 640px) 100vw, 50vw"}
                    className="object-cover"
                  />
                </div>
              </Reveal>
              {image.caption ? (
                <figcaption className="mt-3">
                  <Text size="body-sm" tone="muted">
                    {image.caption}
                  </Text>
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </Section>
  );
}
