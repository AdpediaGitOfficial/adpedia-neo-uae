import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Title, Text } from "@/components/ui/typography";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { ProjectDetailHero } from "@/components/sections/portfolio/ProjectDetailHero";
import { ProjectMeta } from "@/components/sections/portfolio/ProjectMeta";
import { ProjectGallery } from "@/components/sections/portfolio/ProjectGallery";
import { ProjectResults } from "@/components/sections/portfolio/ProjectResults";
import { ProjectQuote } from "@/components/sections/portfolio/ProjectQuote";
import { RelatedProjects } from "@/components/sections/portfolio/RelatedProjects";
import { projectDetail } from "@/lib/portfolio-content";
import { projectBySlug, projects } from "@/lib/projects";

type Params = { params: Promise<{ slug: string }> };

/** Every case study is prerendered at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.type}`,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.type}`,
      description: project.summary,
      images: [{ url: project.thumb.src }],
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const hasNarrative = Boolean(project.narrative?.length);
  const hasAside = project.tags.length > 0 || Boolean(project.website);

  /* Kept out of the JSX so it can sit either beside the write-up or, when a
     project has none yet, on its own — an empty first grid column would
     otherwise strand this block in the middle of the page. */
  const aside = (
    <div className="flex flex-col gap-10">
      {project.tags.length > 0 ? (
        <Block title={projectDetail.services}>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {project.website ? (
        <Button href={project.website.href} variant="outline" size="md" className="self-start">
          {project.website.label}
        </Button>
      ) : null}
    </div>
  );

  return (
    <>
      <ProjectDetailHero project={project} />

      <Section padded={false} innerClassName="pb-16" aria-labelledby="project-summary-heading">
        <h2 id="project-summary-heading" className="sr-only">
          Project details
        </h2>
        <Reveal>
          <div className="relative aspect-[3/2] w-full overflow-hidden bg-ink-800">
            <Image
              src={project.thumb.src}
              alt={project.thumb.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1720px"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="mt-12">
          <ProjectMeta project={project} />
        </div>
      </Section>

      {hasNarrative || hasAside ? (
        <Section padded={false} innerClassName="pb-section" aria-labelledby="project-about-heading">
          <h2 id="project-about-heading" className="sr-only">
            About this project
          </h2>

          {hasNarrative ? (
            <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-24">
              <div className="flex flex-col gap-10">
                {project.narrative?.map((section) => (
                  <Block key={section.title} title={section.title}>
                    {section.body.map((paragraph) => (
                      <Text key={paragraph} size="body" className="mt-4 first:mt-0">
                        {paragraph}
                      </Text>
                    ))}
                  </Block>
                ))}
              </div>

              {aside}
            </div>
          ) : (
            aside
          )}
        </Section>
      ) : null}

      {project.results?.length ? <ProjectResults results={project.results} /> : null}

      {project.gallery?.length ? <ProjectGallery gallery={project.gallery} /> : null}

      {project.quote ? <ProjectQuote quote={project.quote} /> : null}

      <RelatedProjects slug={project.slug} />

      <CtaBand />
    </>
  );
}

/** Small labelled block used down both columns of the body. */
function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Title as="h3" size="sm" weight="medium" className="uppercase tracking-spaced">
        {title}
      </Title>
      <div className="mt-5">{children}</div>
    </div>
  );
}
