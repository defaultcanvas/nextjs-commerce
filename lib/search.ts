import { PRODUCTS } from "./products";
import type { Product } from "./products";

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];

  const lower = query.toLowerCase();

  return PRODUCTS.filter((product) => {
    const title = product.title.toLowerCase();
    const subtitle = product.subtitle.toLowerCase();
    const category = product.category.toLowerCase();
    const subcategory = product.subcategory.toLowerCase();
    const variantMatch = product.variants.some((variant) => variant.color.toLowerCase().includes(lower));

    return (
      title.includes(lower) ||
      subtitle.includes(lower) ||
      category.includes(lower) ||
      subcategory.includes(lower) ||
      variantMatch
    );
  });
}
