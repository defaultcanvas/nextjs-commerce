"use client";
import CategoryCard from "@/components/category/CategoryCard";
import BottomNav from "@/components/layout/BottomNav";
import { MAIN_CATEGORIES } from "@/lib/categories";
import { useAdminStore } from "@/lib/use-admin-store";
import React from "react";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = React.use(params as any) as { category: string };
  const { subcategories } = useAdminStore();
  const subs = subcategories[category] ?? [];
  const categoryMeta = MAIN_CATEGORIES[category as keyof typeof MAIN_CATEGORIES];

  return (
    <div className="min-h-screen px-5 pt-8 pb-24 bg-black text-white">
      <h1 className="text-lg font-semibold mb-4 capitalize">
        {categoryMeta?.name ?? category}
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {subs.map((sub) => (
          <CategoryCard key={sub} name={sub} href={`/shop/${category}/${sub}`} icon="✨" />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
