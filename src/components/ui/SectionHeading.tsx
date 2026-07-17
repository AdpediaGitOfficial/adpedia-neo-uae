import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** Light heading uses the humanist sans (hero-style); display uses the geometric face. */
  face?: "display" | "sans";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  face = "display",
  tone = "dark",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <Tag
        className={cn(
          "text-balance",
          face === "display" ? "font-display text-display-md font-medium" : "font-sans text-display-md font-light",
          tone === "dark" ? "text-white" : "text-ink"
        )}
      >
        {title}
      </Tag>
      {subtitle ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed",
            isCenter ? "mx-auto" : "",
            tone === "dark" ? "text-white/60" : "text-ink/60"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
