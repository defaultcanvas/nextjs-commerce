
"use client";
import ProductCard from "@/components/product/product-card";
import { useParams } from "next/navigation";
import React from "react";




export default function SubcategoryPage() {
  const params = useParams() as any;
  const category = decodeURIComponent(params.category ?? "");
  const sub = decodeURIComponent(params.sub ?? "");
  const [products, setProducts] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`/api/products?category=${encodeURIComponent(category)}&sub=${encodeURIComponent(sub)}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        setProducts([]);
      }
    }
    fetchProducts();
  }, [category, sub]);

  return (
    <div className="px-5 py-6 grid grid-cols-2 gap-4">
      {products.map((product) => {
        const imgs = (product as any).images ?? [];
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            images={imgs}
          />
        );
      })}
    </div>
  );
}
