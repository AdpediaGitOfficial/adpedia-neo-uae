import { cn } from "@/lib/utils";

/**
 * Form primitives — sharp-cornered, dark-surface by default, on the design tokens.
 * Pair every control with <Field> so it gets a label, error wiring, and spacing.
 */

type Surface = "dark" | "light";

const controlBase =
  "w-full border bg-transparent px-4 py-3.5 text-body-sm transition-colors placeholder:text-white/35 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const surfaceClass: Record<Surface, string> = {
  dark: "border-white/10 bg-ink-700 text-white hover:border-white/25 focus-visible:border-accent-400",
  light:
    "border-ink/10 bg-paper-200 text-ink placeholder:text-ink/40 hover:border-ink/25 focus-visible:border-accent-600",
};

const invalidClass = "border-red-400/70 focus-visible:border-red-400";

/* ---- Field: label + control + error/hint ---- */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  surface = "dark",
  className,
  children,
}: {
  label?: string;
  htmlFor?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  surface?: Surface;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label ? (
        <label
          htmlFor={htmlFor}
          className={cn("text-body-sm", surface === "light" ? "text-ink/70" : "text-white/70")}
        >
          {label}
          {required ? (
            <span aria-hidden className="ml-1 text-accent-400">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p id={htmlFor ? `${htmlFor}-error` : undefined} role="alert" className="text-caption text-red-400">
          {error}
        </p>
      ) : hint ? (
        <p className={cn("text-caption", surface === "light" ? "text-ink/45" : "text-white/45")}>{hint}</p>
      ) : null}
    </div>
  );
}

/* ---- Input ---- */
export function Input({
  surface = "dark",
  invalid,
  className,
  ...rest
}: { surface?: Surface; invalid?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(controlBase, surfaceClass[surface], invalid && invalidClass, className)}
      {...rest}
    />
  );
}

/* ---- Textarea ---- */
export function Textarea({
  surface = "dark",
  invalid,
  rows = 5,
  className,
  ...rest
}: { surface?: Surface; invalid?: boolean } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid || undefined}
      className={cn(controlBase, surfaceClass[surface], "resize-y", invalid && invalidClass, className)}
      {...rest}
    />
  );
}

/* ---- Select ---- */
export function Select({
  surface = "dark",
  invalid,
  className,
  children,
  ...rest
}: { surface?: Surface; invalid?: boolean } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      aria-invalid={invalid || undefined}
      className={cn(controlBase, surfaceClass[surface], "appearance-none pr-10", invalid && invalidClass, className)}
      {...rest}
    >
      {children}
    </select>
  );
}
