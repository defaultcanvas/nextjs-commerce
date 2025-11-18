"use client";
import CategoryCard from "@/components/category/CategoryCard";
import BottomNav from "@/components/layout/BottomNav";
import { useAdminStore } from "@/lib/use-admin-store";

export default function CategoriesPage() {
  const { categories } = useAdminStore();
  return (
    <div className="min-h-screen bg-black text-white px-5 pt-8 pb-24">
      <h1 className="text-lg font-semibold mb-4">Categories</h1>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat}
            name={cat.charAt(0).toUpperCase() + cat.slice(1)}
            href={`/categories/${cat}`}
            icon={"✨"}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
