import { SAMPLE_PRODUCTS, type SampleProduct } from "./sample-products";
import { toSubcategorySlug } from "./categories";

export interface ProductVariant {
  color: string;
  sizes: { size: string; stock: number }[];
  images: string[];
}

export interface Product extends SampleProduct {
  image: string;
  sub: string;
  subtitle: string;
  subcategory: string;
  variants: ProductVariant[];
}

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalise = (value: string) => toSlug(value).replace(/-/g, "");

const FALLBACK_IMAGE = "/icons/men.svg";

const sampleProducts: Product[] = SAMPLE_PRODUCTS.map((item) => {
  const images = item.images.length > 0 ? item.images : [FALLBACK_IMAGE];
  const perSizeStock = item.sizes.length > 0 ? Math.max(1, Math.floor(item.stock / item.sizes.length) || 1) : item.stock;

  return {
    ...item,
    image: images[0],
    sub: item.subcategory,
    subtitle: "",
    subcategory: toSubcategorySlug(item.subcategory),
    variants: [
      {
        color: "Core",
        images,
        sizes: item.sizes.map((size) => ({ size, stock: perSizeStock || 5 })),
      },
    ],
  };
});

export const PRODUCTS: Product[] = sampleProducts;

export async function getProductsBySub(category: string, sub: string) {
  return sampleProducts.filter(
    (product) => normalise(product.category) === normalise(category) && normalise(product.sub) === normalise(sub)
  );
}

export function getBy(main: string, sub: string): Product[] {
  return PRODUCTS.filter(
    (product) => normalise(product.category) === normalise(main) && normalise(product.subcategory) === normalise(sub)
  );
}
