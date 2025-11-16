import CategoryCard from "@/components/category/CategoryCard";
import BottomNav from "@/components/layout/BottomNav";
import { MAIN_CATEGORIES } from "@/lib/categories";

const categoryKeys = Object.keys(MAIN_CATEGORIES) as Array<keyof typeof MAIN_CATEGORIES>;

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white px-5 pt-8 pb-24">
      <h1 className="text-lg font-semibold mb-4">Categories</h1>

      <div className="grid grid-cols-2 gap-4">
        {categoryKeys.map((key) => (
          <CategoryCard
            key={key}
            name={MAIN_CATEGORIES[key].name}
            href={`/categories/${key}`}
            icon={MAIN_CATEGORIES[key].icon}
          />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
