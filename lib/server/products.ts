import { PRODUCTS } from "../products";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalise = (value: string) => toSlug(value).replace(/-/g, "");

export async function getProductsBySub(category: string, sub: string) {
  return PRODUCTS.filter(
    (product) => normalise(product.category) === normalise(category) && normalise(product.sub) === normalise(sub)
  );
}

export function getBy(main: string, sub: string) {
  return PRODUCTS.filter(
    (product) => normalise(product.category) === normalise(main) && normalise(product.subcategory) === normalise(sub)
  );
}
