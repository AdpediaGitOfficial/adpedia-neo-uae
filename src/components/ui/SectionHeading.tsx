import { cn } from "@/lib/utils";
import { Eyebrow, Heading, Subtitle } from "@/components/ui/typography";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** display → medium weight; sans → light weight (kept for back-compat). */
  face?: "display" | "sans";
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2";
};

/** Composed section header (eyebrow + heading + subtitle) built on the typography primitives. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  face = "display",
  tone = "dark",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const surface = tone === "light" ? "light" : "dark";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading as={as} size="md" weight={face === "display" ? "medium" : "light"} surface={surface}>
        {title}
      </Heading>
      {subtitle ? (
        <Subtitle surface={surface} className={cn("max-w-2xl", isCenter && "mx-auto")}>
          {subtitle}
        </Subtitle>
      ) : null}
    </div>
  );
}
