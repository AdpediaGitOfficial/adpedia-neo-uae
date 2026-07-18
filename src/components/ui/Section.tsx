import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  tone?: "dark" | "light";
  /** Apply the standard vertical rhythm (py-section). */
  padded?: boolean;
  /** Wrap children in the content Container. */
  container?: boolean;
  className?: string;
  /** Extra classes for the inner Container. */
  innerClassName?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "className" | "children">;

/** Standard page section: surface tone + vertical rhythm + content container. */
export function Section({
  tone = "dark",
  padded = true,
  container = true,
  className,
  innerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(tone === "light" ? "bg-paper text-ink" : "bg-ink", padded && "py-section", className)}
      {...rest}
    >
      {container ? <Container className={innerClassName}>{children}</Container> : children}
    </section>
  );
}
