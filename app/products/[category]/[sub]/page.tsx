import ProductCard from "@/components/product/product-card";
import { getProductsBySub } from "@/lib/products";

interface SubcategoryPageProps {
  params: {
    category: string;
    sub: string;
  };
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category, sub } = params;
  const products = await getProductsBySub(category, sub);

  return (
    <div className="px-5 py-6 grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
        />
      ))}
    </div>
  );
}
