import { SAMPLE_PRODUCTS, type SampleProduct } from "./sample-products";
import { toSubcategorySlug } from "./categories";

export interface ProductVariant {
  color: string;
  sizes: { size: string; stock: number }[];
  images: string[];
}

export interface Product extends SampleProduct {
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

