import { cn } from "@/lib/utils";

type CardTone = "dark" | "light" | "raised";
type CardPadding = "none" | "sm" | "md" | "lg";

const toneClass: Record<CardTone, string> = {
  // Standardized surfaces + hairline borders (snapped to the token scale).
  dark: "border border-white/10 bg-ink-800",
  raised: "border border-white/10 bg-ink-700",
  light: "border border-ink/10 bg-white",
};

const paddingClass: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

type CardProps<T extends React.ElementType> = {
  as?: T;
  tone?: CardTone;
  padding?: CardPadding;
  className?: string;
  children: React.ReactNode;
};

/** Standard surface card: bordered panel with tone + padding. Sharp corners by design. */
export function Card<T extends React.ElementType = "div">({
  as,
  tone = "dark",
  padding = "md",
  className,
  children,
  ...rest
}: CardProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof CardProps<T>>) {
  const Tag = as ?? "div";
  return (
    <Tag className={cn(toneClass[tone], paddingClass[padding], className)} {...rest}>
      {children}
    </Tag>
  );
}
