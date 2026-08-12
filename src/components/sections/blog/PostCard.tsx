import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Label, Title, Text } from "@/components/ui/typography";
import { formatPostDate, postHref, blogLabels, type Post } from "@/lib/blog-content";

/**
 * Grid card: square cover and an accent affordance on the top row, then date,
 * title, and excerpt pinned to the base — the comp leaves the space between
 * them open, so the text sits at the bottom regardless of title length.
 */
export function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <Card
      as={Link}
      href={postHref(post.slug)}
      tone="dark"
      padding="none"
      className={`group flex h-full flex-col p-3 transition-colors hover:border-white/25 ${className ?? ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="relative aspect-square w-1/2 shrink-0 overflow-hidden bg-ink">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            sizes="(max-width: 640px) 50vw, 220px"
            className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
          />
        </div>
        <span
          aria-hidden
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-600 text-white transition-colors group-hover:bg-accent-500"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-auto p-4 pt-10">
        <Label as="p" className="text-white/45">
          {formatPostDate(post.date)}
        </Label>
        <Title as="h3" size="sm" weight="normal" className="mt-4">
          {post.title}
        </Title>
        <Text size="body-sm" tone="muted" className="mt-4">
          {post.excerpt}
        </Text>
        <span className="sr-only">{blogLabels.readPost}</span>
      </div>
    </Card>
  );
}
