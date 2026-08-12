import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Heading, Title, Label, Text } from "@/components/ui/typography";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArticleBody } from "@/components/sections/blog/ArticleBody";
import { PostCard } from "@/components/sections/blog/PostCard";
import {
  blogLabels,
  formatPostDate,
  postBySlug,
  posts,
  relatedPosts,
} from "@/lib/blog-content";

type Params = { params: Promise<{ slug: string }> };

/** Every post is prerendered at build time. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.cover.src }],
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const related = relatedPosts(post.slug);

  return (
    <>
      <Section
        padded={false}
        className="pt-[calc(var(--header-height)+2rem)]"
        innerClassName="pb-section pt-12 sm:pt-16"
        aria-labelledby="post-heading"
      >
        <article className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <div className="relative aspect-[734/949] w-full overflow-hidden bg-ink-800">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 734px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Label as="p" className="text-white/45">
              {formatPostDate(post.date)}
            </Label>

            <Heading as="h1" id="post-heading" size="xl" weight="light" className="mt-6">
              {post.title}
            </Heading>

            {post.lead ? (
              <Text size="body" className="mt-8">
                {post.lead}
              </Text>
            ) : null}

            {post.author ? (
              <div className="mt-12 flex items-center gap-4">
                <span
                  aria-hidden
                  className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink-700 text-white"
                >
                  {post.author.name.charAt(0)}
                </span>
                <span>
                  <Text as="span" size="body-sm" tone="primary" className="block">
                    {post.author.name}
                  </Text>
                  <Text as="span" size="caption" tone="muted" className="block">
                    {post.author.role}
                  </Text>
                </span>
              </div>
            ) : null}

            <hr className="mt-12 border-white/10" />

            <div className="mt-12">
              <ArticleBody blocks={post.body} />
            </div>
          </div>
        </article>
      </Section>

      {related.length > 0 ? (
        <Section padded={false} innerClassName="pb-section" aria-labelledby="related-posts-heading">
          <Title
            as="h2"
            id="related-posts-heading"
            size="lg"
            weight="light"
            className="uppercase tracking-spaced"
          >
            {blogLabels.related}
          </Title>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <StaggerItem key={item.slug} className="h-full">
                <PostCard post={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      ) : null}

      <CtaBand />
    </>
  );
}
