import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Layers,
  PenTool,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { TagLink } from "@/components/ui/Tag";
import { serviceMenu, portfolioMenu, blogMenu } from "@/lib/site";

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  Code2,
  Layers,
  Smartphone,
  Rocket,
  Sparkles,
  Server,
};

function MegaIntro({
  eyebrow,
  title,
  description,
  viewAll,
  children,
  onNavigate,
}: {
  eyebrow: string;
  title: string;
  description: string;
  viewAll: { label: string; href: string };
  children?: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <div className="flex flex-col">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3.5 font-display text-2xl font-medium text-white">{title}</h2>
      <p className="mt-3 max-w-[15rem] text-sm leading-relaxed text-white/55">{description}</p>
      {children}
      <Link
        href={viewAll.href}
        onClick={onNavigate}
        className="mono-label mt-auto inline-flex items-center gap-2 pt-6 text-white transition-colors hover:text-accent-300"
      >
        {viewAll.label}
        <ArrowRight className="h-4 w-4 text-accent-400" aria-hidden />
      </Link>
    </div>
  );
}

/**
 * @param showMedia Defer the thumbnails until the menu has been opened once —
 * see the note on `PortfolioMegaPanel`. Before it flips, each row falls back to
 * the icon tile it already had, so the panel reads complete rather than
 * gap-toothed and the 56px slot never changes size (no shift when media lands).
 */
export function ServiceMegaPanel({
  onNavigate,
  showMedia = true,
}: {
  onNavigate: () => void;
  showMedia?: boolean;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr]">
      <MegaIntro {...serviceMenu} onNavigate={onNavigate} />
      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {serviceMenu.items.map((item) => {
          const Icon = iconMap[item.icon] ?? Sparkles;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="group flex h-full gap-3.5 border border-transparent p-4 transition-colors hover:border-white/10 hover:bg-ink-700"
              >
                {/* Thumbnail where the service has artwork; the icon tile
                    stands in until it does, so services can be upgraded one at
                    a time without a half-empty panel in between. */}
                {/* Both occupy the same 56px slot so the text column stays
                    aligned while services are still gaining artwork — a
                    smaller icon tile would indent its row differently from a
                    thumbnail row in the same column. */}
                {item.thumb && showMedia ? (
                  <span className="relative block h-14 w-14 shrink-0 overflow-hidden bg-ink">
                    <Image
                      src={item.thumb.src}
                      alt={item.thumb.alt}
                      fill
                      sizes="56px"
                      className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                    />
                  </span>
                ) : (
                  <span className="grid h-14 w-14 shrink-0 place-items-center bg-accent-600/15 text-accent-300">
                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                  </span>
                )}
                <span className="flex flex-col">
                  <span className="text-[0.95rem] font-semibold text-white">{item.label}</span>
                  {item.description ? (
                    <span className="mt-1 text-[0.8rem] leading-snug text-white/50">
                      {item.description}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param showMedia Defer the thumbnails until the menu has been opened once.
 * The panel stays mounted so its links remain in the initial HTML (crawlable),
 * but it sits inside the viewport at opacity 0, so its images would otherwise
 * be fetched and decoded on every page load even if the menu is never used.
 */
export function PortfolioMegaPanel({
  onNavigate,
  showMedia = true,
}: {
  onNavigate: () => void;
  showMedia?: boolean;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
      <MegaIntro
        eyebrow={portfolioMenu.eyebrow}
        title={portfolioMenu.title}
        description={portfolioMenu.description}
        viewAll={portfolioMenu.viewAll}
        onNavigate={onNavigate}
      >
        <ul className="mt-5 flex flex-wrap gap-2">
          {portfolioMenu.filters.map((filter, i) => (
            <li key={filter.href + filter.label}>
              <TagLink href={filter.href} onClick={onNavigate} active={i === 0}>
                {filter.label}
              </TagLink>
            </li>
          ))}
        </ul>
      </MegaIntro>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioMenu.featured.map((project) => (
          <li key={project.title}>
            <Link
              href={project.href}
              onClick={onNavigate}
              className="group flex h-full flex-col overflow-hidden border border-white/10 bg-ink-700 transition-colors hover:border-white/25"
            >
              <span className="relative block aspect-[16/10] overflow-hidden bg-ink">
                {showMedia ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 260px"
                    className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                  />
                ) : null}
              </span>
              <span className="flex flex-col p-4">
                <span className="mono-label text-[0.65rem] text-accent-300">{project.category}</span>
                <span className="mt-2 text-base font-medium text-white">{project.title}</span>
                <span className="mono-label mt-3 inline-flex items-center gap-2 text-[0.62rem] text-white/60">
                  See work
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The Blog panel, built to the same plan as `PortfolioMegaPanel`: intro and
 * category chips on the left, a row of cards on the right. Two differences the
 * content forces:
 *
 * - **Titles are clamped to two lines.** Post titles run far longer than project
 *   names ("Web Development Meets AI: Building Smarter Digital Experiences"), and
 *   unclamped they would set each card to a different height.
 * - **Each card carries its date.** Recency is the thing a reader judges a post
 *   by, and the cards are ordered by it.
 *
 * @param showMedia Same deferral as the other panels — the covers are held back
 * until the menu is opened once, so they are not fetched on every page load.
 */
export function BlogMegaPanel({
  onNavigate,
  showMedia = true,
}: {
  onNavigate: () => void;
  showMedia?: boolean;
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.7fr_2.3fr]">
      <MegaIntro
        eyebrow={blogMenu.eyebrow}
        title={blogMenu.title}
        description={blogMenu.description}
        viewAll={blogMenu.viewAll}
        onNavigate={onNavigate}
      >
        <ul className="mt-5 flex flex-wrap gap-2">
          {blogMenu.filters.map((filter, i) => (
            <li key={filter.href + filter.label}>
              <TagLink href={filter.href} onClick={onNavigate} active={i === 0}>
                {filter.label}
              </TagLink>
            </li>
          ))}
        </ul>
      </MegaIntro>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {blogMenu.featured.map((post) => (
          <li key={post.href}>
            <Link
              href={post.href}
              onClick={onNavigate}
              className="group flex h-full flex-col overflow-hidden border border-white/10 bg-ink-700 transition-colors hover:border-white/25"
            >
              <span className="relative block aspect-[16/10] overflow-hidden bg-ink">
                {showMedia ? (
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 50vw, 260px"
                    className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-105"
                  />
                ) : null}
              </span>
              <span className="flex flex-1 flex-col p-4">
                <span className="flex items-center gap-2">
                  <span className="mono-label text-[0.65rem] text-accent-300">{post.category}</span>
                  <span aria-hidden className="text-white/25">·</span>
                  <span className="text-caption text-white/50">{post.date}</span>
                </span>
                <span className="mt-2 line-clamp-2 text-base font-medium leading-snug text-white">
                  {post.title}
                </span>
                <span className="mono-label mt-auto inline-flex items-center gap-2 pt-3 text-[0.62rem] text-white/60">
                  Read post
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
