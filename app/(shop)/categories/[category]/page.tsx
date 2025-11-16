import CategoryCard from "@/components/category/CategoryCard";
import BottomNav from "@/components/layout/BottomNav";
import { MAIN_CATEGORIES, SUBCATEGORIES } from "@/lib/categories";

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  const subs = SUBCATEGORIES[category as keyof typeof SUBCATEGORIES] ?? [];
  const categoryMeta = MAIN_CATEGORIES[category as keyof typeof MAIN_CATEGORIES];

  return (
    <div className="min-h-screen px-5 pt-8 pb-24 bg-black text-white">
      <h1 className="text-lg font-semibold mb-4 capitalize">
        {categoryMeta?.name ?? params.category}
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {subs.map((sub) => (
          <CategoryCard key={sub} name={sub} href={`/shop/${params.category}/${sub}`} icon="✨" />
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
