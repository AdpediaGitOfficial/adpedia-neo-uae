import Link from "next/link";
import { cn } from "@/lib/utils";

type IconButtonSize = "sm" | "md" | "lg" | "xl";
type IconButtonVariant = "ghost" | "outline" | "soft" | "scrim" | "plain";

const base =
  "grid shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-none";
const sizes: Record<IconButtonSize, string> = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
  lg: "h-11 w-11",
  xl: "h-16 w-16",
};
const variants: Record<IconButtonVariant, string> = {
  ghost: "text-white/70 hover:bg-white/10 hover:text-white",
  outline: "border border-white/15 text-white hover:bg-white/5",
  soft: "bg-white/15 text-white backdrop-blur-sm hover:bg-white/25",
  scrim: "bg-black/50 text-white hover:bg-black/70",
  plain: "text-white",
};

type StyleProps = {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  label: string;
  className?: string;
  children: React.ReactNode;
};

type AsLink = StyleProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children" | "aria-label"
  >;
type AsButton = StyleProps & { href?: undefined; ref?: React.Ref<HTMLButtonElement> } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children" | "aria-label"
  >;

/** Circular icon control (nav arrows, social, modal close, play). `label` is required for a11y. */
export function IconButton(props: AsLink | AsButton) {
  const { size = "md", variant = "ghost", label, className, children, ...rest } = props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (rest.href !== undefined) {
    const { href, ...linkRest } = rest as Omit<AsLink, keyof StyleProps>;
    return (
      <Link href={href} aria-label={label} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} className={classes} {...(rest as Omit<AsButton, keyof StyleProps>)}>
      {children}
    </button>
  );
}
