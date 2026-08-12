import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Label, Title, Text } from "@/components/ui/typography";
import { formatPostDate, postHref, type Post } from "@/lib/blog-content";

/**
 * The lead post: double-width, cover filling the card with the copy laid over
 * a scrim at the base.
 */
export function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <Card
      as={Link}
      href={postHref(post.slug)}
      tone="dark"
      padding="none"
      className="group relative flex h-full min-h-[26rem] flex-col justify-end overflow-hidden transition-colors hover:border-white/25"
    >
      <Image
        src={post.cover.src}
        alt={post.cover.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 856px"
        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
      />

      <div className="relative p-8 sm:p-10">
        <Label as="p" className="text-white/45">
          {formatPostDate(post.date)}
        </Label>
        <Title as="h3" size="lg" weight="normal" className="mt-5 max-w-2xl">
          {post.title}
        </Title>
        <Text size="body-sm" tone="muted" className="mt-5 max-w-md">
          {post.excerpt}
        </Text>
      </div>
    </Card>
  );
}
