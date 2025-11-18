"use client";
import CategoryCard from "@/components/category/CategoryCard";
import BottomNav from "@/components/layout/BottomNav";
import { useAdminStore } from "@/lib/use-admin-store";

export default function HomePage() {
  const { categories } = useAdminStore();
  return (
    <div className="min-h-screen w-full px-5 pt-8 pb-24 bg-black text-white">
      <h1 className="text-lg font-semibold mb-4">Shop by Category</h1>

      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <CategoryCard
            key={cat}
            name={cat.toUpperCase()}
            href={`/categories/${cat}`}
            icon={"✨"}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
