"use client";
import { create } from "zustand";

export type AdminProduct = {
  id: string;
  title: string;
  price?: number;
  cost_price?: number;
  category: string;
  subcategory: string;
  images?: string[];
  variants?: any[];
  status?: string;
};

export type AdminState = {
  categories: string[];
  subcategories: { [cat: string]: string[] };
  products: AdminProduct[];
  setProducts: (products: AdminProduct[]) => void;
  addCategory: (cat: string) => void;
  removeCategory: (cat: string) => void;
  addSubcategory: (cat: string, sub: string) => void;
  removeSubcategory: (cat: string, sub: string) => void;
  addProduct: (product: AdminProduct) => void;
  updateProduct: (id: string, product: Partial<AdminProduct>) => void;
  removeProduct: (id: string) => void;
};

export const useAdminStore = create<AdminState>((set, get) => ({
  categories: ["men", "women", "kids", "accessories"],
  subcategories: {
    men: ["hoodies", "tees", "joggers", "trainers"],
    women: ["hoodies", "leggings", "trainers"],
    kids: ["hoodies", "jackets", "trainers"],
    accessories: ["bags", "caps", "fragrance"],
  },
  products: [],
  setProducts: (products) => set({ products }),
  addCategory: (cat) =>
    set((state) =>
      state.categories.includes(cat) ? state : { ...state, categories: [...state.categories, cat] }
    ),
  removeCategory: (cat) =>
    set((state) => {
      const nextCats = state.categories.filter((c) => c !== cat);
      const nextSubs = { ...state.subcategories };
      delete nextSubs[cat];
      const nextProducts = state.products.filter((p) => p.category !== cat);
      return { categories: nextCats, subcategories: nextSubs, products: nextProducts } as any;
    }),
  addSubcategory: (cat, sub) =>
    set((state) => {
      const subs = state.subcategories[cat] || [];
      if (subs.includes(sub)) return state as any;
      return { ...state, subcategories: { ...state.subcategories, [cat]: [...subs, sub] } } as any;
    }),
  removeSubcategory: (cat, sub) =>
    set((state) => {
      const subs = state.subcategories[cat] || [];
      const nextSubs = subs.filter((s) => s !== sub);
      const nextProducts = state.products.filter((p) => !(p.category === cat && p.subcategory === sub));
      return { ...state, subcategories: { ...state.subcategories, [cat]: nextSubs }, products: nextProducts } as any;
    }),
  addProduct: (product) => set((state) => ({ ...state, products: [...state.products, { ...product, images: product.images ?? [] }] })),
  updateProduct: (id, patch) => set((state) => ({ ...state, products: state.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
  removeProduct: (id) => set((state) => ({ ...state, products: state.products.filter((p) => p.id !== id) })),
}));

export default useAdminStore;
