import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/typography";
import { CtaBand } from "@/components/sections/CtaBand";
import { BlogBrowser } from "@/components/sections/blog/BlogBrowser";
import { blogHero } from "@/lib/blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description: blogHero.lead,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <Section
        padded={false}
        className="pt-[calc(var(--header-height)+2rem)]"
        innerClassName="pb-10 pt-14 sm:pt-20 lg:pt-24"
        aria-labelledby="blog-heading"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <Heading as="h1" id="blog-heading" size="xl" weight="light" balance={false}>
            {blogHero.title}
          </Heading>
          <Text size="body-sm" className="max-w-sm lg:pt-4 lg:text-right">
            {blogHero.intro}
          </Text>
        </div>
        <Text size="body" className="mt-10 max-w-3xl lg:ml-auto lg:text-right">
          {blogHero.lead}
        </Text>
      </Section>

      <Section padded={false} innerClassName="pb-section" aria-labelledby="blog-posts-heading">
        {/* The comp has no visible heading above the grid. */}
        <h2 id="blog-posts-heading" className="sr-only">
          All posts
        </h2>
        <BlogBrowser />
      </Section>

      <CtaBand />
    </>
  );
}
