import { SAMPLE_PRODUCTS } from "./sample-products";
import type { AdminProduct } from "./use-admin-store";

export function getDemoProducts(): AdminProduct[] {
  // Map sample products to AdminProduct shape (id, title, category, subcategory)
  return SAMPLE_PRODUCTS.slice(0, 6).map((p) => ({
    id: p.id,
    title: p.title,
    category: p.category,
    subcategory: p.subcategory,
  }));
}
