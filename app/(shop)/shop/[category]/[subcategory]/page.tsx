import Image from "next/image";
import Link from "next/link";
import BlurCard from "@/components/ui/BlurCard";
import BottomNav from "@/components/layout/BottomNav";
import { SAMPLE_PRODUCTS } from "@/lib/sample-products";

export default async function ProductList({ params }: { params: { category: string; subcategory: string } }) {
  const { category, subcategory } = await params;
  const normSub = subcategory?.toLowerCase() ?? "";
  const products = SAMPLE_PRODUCTS.filter(
    (product) =>
      product.category === category &&
      product.subcategory?.toLowerCase() === normSub
  );

  return (
    <div className="min-h-screen bg-black text-white px-5 pt-8 pb-24">
      <h1 className="text-lg font-semibold mb-4 capitalize">
        {subcategory} ({products.length})
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <BlurCard className="p-2">
              <div className="relative w-full h-36 mb-2">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(min-width: 768px) 25vw, 45vw"
                />
              </div>
              <div className="text-xs">{product.title}</div>
              <div className="text-sm font-semibold mt-1">£{product.price.toFixed(2)}</div>
            </BlurCard>
          </Link>
        ))}
      </div>

      {products.length === 0 && (
        <p className="text-sm text-white/60 mt-6">No products found in this category yet.</p>
      )}

      <BottomNav />
    </div>
  );
}
