import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "mono-label inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors duration-200 ease-out-expo focus-visible:outline-none disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent-600 text-white hover:bg-accent-500 active:bg-accent-700",
  outline: "border border-white/25 text-white hover:border-white hover:bg-white/5",
  ghost: "text-white hover:text-accent-300",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-[0.72rem]",
  lg: "px-8 py-4 text-label",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = StyleProps & { href: string } & Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >;
type ButtonAsButton = StyleProps & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", size = "md", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (rest.href !== undefined) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof StyleProps>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as Omit<ButtonAsButton, keyof StyleProps>)}>
      {children}
    </button>
  );
}
