import Link from "next/link";
import { cn } from "@/lib/utils";

type TagTone = "dark" | "light";
type TagSize = "sm" | "md";
/**
 * `outline` — bordered chip; the active one fills with accent.
 * `ghost` — borderless label that only becomes a raised chip when active
 *   (the /portfolio filter row, where inactive filters are plain text).
 */
type TagVariant = "outline" | "ghost";

const base = "inline-block transition-colors";
const sizes: Record<TagSize, string> = {
  sm: "px-3 py-1.5 text-caption",
  md: "px-3.5 py-1.5 text-body-sm",
};
const tones: Record<TagTone, string> = {
  dark: "border border-white/15 text-white/70 hover:border-white/40 hover:text-white",
  light: "border border-ink/15 text-ink/75 hover:border-ink/40 hover:text-ink",
};
const activeClass =
  "border border-accent-600 bg-accent-600 text-white hover:border-accent-600 hover:text-white";

const ghostTones: Record<TagTone, string> = {
  dark: "text-white/60 hover:text-white",
  light: "text-ink/60 hover:text-ink",
};
const ghostActive: Record<TagTone, string> = {
  dark: "border border-white/10 bg-ink-700 text-white",
  light: "border border-ink/10 bg-paper-200 text-ink",
};

function tagClass(variant: TagVariant, tone: TagTone, active: boolean): string {
  if (variant === "ghost") return active ? ghostActive[tone] : ghostTones[tone];
  return active ? activeClass : tones[tone];
}

type CommonProps = {
  tone?: TagTone;
  size?: TagSize;
  variant?: TagVariant;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Pill/chip used for service tags, project filters, and category labels. Non-interactive by default. */
export function Tag({
  tone = "dark",
  size = "sm",
  variant = "outline",
  active = false,
  className,
  children,
}: CommonProps) {
  return (
    <span className={cn(base, sizes[size], tagClass(variant, tone, active), className)}>{children}</span>
  );
}

/**
 * Button variant of Tag, for filters held in local state rather than the URL.
 * Prefer `TagLink` when the filtered view should be shareable; use this when
 * the surrounding content must stay server-rendered (reading the query with
 * `useSearchParams` opts the subtree out of prerendering).
 */
export function TagButton({
  tone = "dark",
  size = "sm",
  variant = "outline",
  active = false,
  className,
  children,
  ...rest
}: CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(base, sizes[size], tagClass(variant, tone, active), className)}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Link variant of Tag (e.g. portfolio filters in the mega menu). */
export function TagLink({
  href,
  tone = "dark",
  size = "sm",
  variant = "outline",
  active = false,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(base, sizes[size], tagClass(variant, tone, active), className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
