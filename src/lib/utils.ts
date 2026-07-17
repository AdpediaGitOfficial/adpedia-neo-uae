/**
 * Minimal className combiner — joins truthy class fragments.
 * Kept dependency-free; later dedupe conflicts can be added with tailwind-merge.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
