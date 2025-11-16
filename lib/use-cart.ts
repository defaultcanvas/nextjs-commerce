"use client";

import { create } from "zustand";
import type { SampleProduct } from "@/lib/sample-products";

type CartState = {
  items: SampleProduct[];
  isOpen: boolean;
  addItem: (product: SampleProduct) => void;
  removeItem: (id: string) => void;
  open: () => void;
  close: () => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  addItem: (product) =>
    set((state) => ({
      items: [...state.items, product],
      isOpen: true,
    })),
  removeItem: (id) =>
    set((state) => {
      const nextItems = state.items.filter((item: SampleProduct) => item.id !== id);
      return {
        items: nextItems,
        isOpen: nextItems.length > 0 && state.isOpen,
      };
    }),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
