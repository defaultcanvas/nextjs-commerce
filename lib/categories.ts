export const MAIN_CATEGORIES = {
  men: { icon: "👕", name: "Men" },
  women: { icon: "👗", name: "Women" },
  kids: { icon: "🧒", name: "Kids" },
  accessories: { icon: "🎒", name: "Accessories" },
} as const;

export const SUBCATEGORIES = {
  men: ["hoodies", "tees", "joggers", "trainers"],
  women: ["hoodies", "leggings", "trainers"],
  kids: ["hoodies", "jackets", "trainers"],
  accessories: ["bags", "caps", "fragrance"],
} as const;

export function toSubcategorySlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
