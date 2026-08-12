/**
 * Portfolio categories — the filter row on /portfolio, taken from the Figma
 * frame (935:1725 → "Frame 558").
 *
 * These are deliberately NOT the service list in `serviceItems`. The two
 * taxonomies overlap but are not the same: Brand Strategy and Digital Marketing
 * have no service entry, and Product Development / DevOps Services are services
 * but not portfolio categories. Keep them separate.
 */

export type CategoryId =
  | "ui-ux-design"
  | "brand-strategy"
  | "brand-design"
  | "web-development"
  | "app-development"
  | "digital-marketing"
  | "ai-data-solutions";

export type Category = { id: CategoryId; label: string };

export const categories: Category[] = [
  { id: "ui-ux-design", label: "UI/UX Design" },
  { id: "brand-strategy", label: "Brand Strategy" },
  { id: "brand-design", label: "Brand Design" },
  { id: "web-development", label: "Web Development" },
  { id: "app-development", label: "App Development" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "ai-data-solutions", label: "AI & Data Solutions" },
];

const byId = new Map(categories.map((c) => [c.id, c]));

export function categoryLabel(id: CategoryId): string {
  return byId.get(id)?.label ?? id;
}

export function isCategoryId(value: string | undefined): value is CategoryId {
  return !!value && byId.has(value as CategoryId);
}
