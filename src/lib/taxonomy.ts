/**
 * Portfolio categories — the filter row on /portfolio, taken from the Figma
 * frame (935:1725 → "Frame 558").
 *
 * These are deliberately NOT the service list in `serviceItems`. The two
 * taxonomies overlap but are not the same: Product Development / DevOps
 * Services are services but not portfolio categories. Keep them separate.
 *
 * Brand Strategy and Digital Marketing were dropped from this list at the
 * client's request — no project used either, so removing them just trims the
 * filter row instead of leaving two tabs that always returned nothing.
 */

export type CategoryId =
  | "ui-ux-design"
  | "brand-design"
  | "web-development"
  | "app-development"
  | "ai-data-solutions";

export type Category = { id: CategoryId; label: string };

export const categories: Category[] = [
  { id: "ui-ux-design", label: "UI/UX Design" },
  { id: "brand-design", label: "Brand Design" },
  { id: "web-development", label: "Web Development" },
  { id: "app-development", label: "App Development" },
  { id: "ai-data-solutions", label: "AI & Data Solutions" },
];

const byId = new Map(categories.map((c) => [c.id, c]));

export function categoryLabel(id: CategoryId): string {
  return byId.get(id)?.label ?? id;
}

export function isCategoryId(value: string | undefined): value is CategoryId {
  return !!value && byId.has(value as CategoryId);
}
