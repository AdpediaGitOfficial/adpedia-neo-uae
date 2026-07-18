import Link from "next/link";
import { cn } from "@/lib/utils";

type TagTone = "dark" | "light";
type TagSize = "sm" | "md";

const base = "inline-block border transition-colors";
const sizes: Record<TagSize, string> = {
  sm: "px-3 py-1.5 text-caption",
  md: "px-3.5 py-1.5 text-body-sm",
};
const tones: Record<TagTone, string> = {
  dark: "border-white/15 text-white/70 hover:border-white/40 hover:text-white",
  light: "border-ink/15 text-ink/75 hover:border-ink/40 hover:text-ink",
};
const activeClass = "border-accent-600 bg-accent-600 text-white hover:border-accent-600 hover:text-white";

type CommonProps = {
  tone?: TagTone;
  size?: TagSize;
  active?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Pill/chip used for service tags, project filters, and category labels. Non-interactive by default. */
export function Tag({ tone = "dark", size = "sm", active = false, className, children }: CommonProps) {
  return <span className={cn(base, sizes[size], active ? activeClass : tones[tone], className)}>{children}</span>;
}

/** Link variant of Tag (e.g. portfolio filters in the mega menu). */
export function TagLink({
  href,
  tone = "dark",
  size = "sm",
  active = false,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link href={href} className={cn(base, sizes[size], active ? activeClass : tones[tone], className)} {...rest}>
      {children}
    </Link>
  );
}
