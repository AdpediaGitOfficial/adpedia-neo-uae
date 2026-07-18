import { cn } from "@/lib/utils";

/**
 * Centralized typography primitives — the single source for all text styling.
 * One family (Inter) with weight for emphasis; tone maps to the standardized
 * opacity scale (primary / secondary / muted / faint) on dark or light surfaces.
 */

type Surface = "dark" | "light";
type Tone = "primary" | "secondary" | "muted" | "faint";

const toneColor: Record<Surface, Record<Tone, string>> = {
  dark: {
    primary: "text-white",
    secondary: "text-white/60",
    muted: "text-white/45",
    faint: "text-white/25",
  },
  light: {
    primary: "text-ink",
    secondary: "text-ink/60",
    muted: "text-ink/45",
    faint: "text-ink/30",
  },
};

/* ---- Eyebrow: mono/accent kicker above headings ---- */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

/* ---- Label: mono uppercase (nav, attribution, footer headers) ---- */
export function Label({
  as: Tag = "span",
  children,
  className,
}: {
  as?: "span" | "p" | "h3";
  children: React.ReactNode;
  className?: string;
}) {
  return <Tag className={cn("mono-label", className)}>{children}</Tag>;
}

/* ---- Heading: the one display heading (h1–h3) ---- */
type HeadingSize = "xl" | "lg" | "md" | "sm";
type HeadingWeight = "light" | "normal" | "medium" | "semibold";

const displaySize: Record<HeadingSize, string> = {
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
};
const weightClass: Record<HeadingWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
};

export function Heading({
  as: Tag = "h2",
  size = "md",
  weight = "light",
  surface = "dark",
  balance = true,
  className,
  children,
  ...rest
}: {
  as?: "h1" | "h2" | "h3";
  size?: HeadingSize;
  weight?: HeadingWeight;
  surface?: Surface;
  balance?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <Tag
      className={cn(
        "font-sans",
        displaySize[size],
        weightClass[weight],
        surface === "light" ? "text-ink" : "text-white",
        balance && "text-balance",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ---- Title: card / sub-section titles (non-display) ---- */
type TitleSize = "lg" | "md" | "sm";
const titleSize: Record<TitleSize, string> = {
  lg: "text-title-lg", // 24→32 fluid (e.g. accordion rows)
  md: "text-title", // 24
  sm: "text-subtitle", // 18
};

export function Title({
  as: Tag = "h3",
  size = "md",
  weight = "medium",
  surface = "dark",
  className,
  children,
}: {
  as?: "h2" | "h3" | "h4";
  size?: TitleSize;
  weight?: HeadingWeight;
  surface?: Surface;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "font-sans",
        titleSize[size],
        weightClass[weight],
        surface === "light" ? "text-ink" : "text-white",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ---- Subtitle: the standard section-subtitle paragraph ---- */
export function Subtitle({
  surface = "dark",
  className,
  children,
}: {
  surface?: Surface;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-body leading-relaxed text-pretty", toneColor[surface].secondary, className)}>
      {children}
    </p>
  );
}

/* ---- Text / Paragraph: body copy with tone + size ---- */
type TextSize = "body" | "body-sm" | "caption";
const textSize: Record<TextSize, string> = {
  body: "text-body",
  "body-sm": "text-body-sm",
  caption: "text-caption",
};

export function Text({
  as: Tag = "p",
  size = "body-sm",
  tone = "secondary",
  surface = "dark",
  className,
  children,
}: {
  as?: "p" | "span" | "div";
  size?: TextSize;
  tone?: Tone;
  surface?: Surface;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag className={cn(textSize[size], "leading-relaxed", toneColor[surface][tone], className)}>
      {children}
    </Tag>
  );
}
