"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdminStore } from "@/lib/use-admin-store";
import { getDemoProducts } from "@/lib/catalog-demo";
import SearchBar from "@/components/search-bar";
export default function SearchPage() {
  const { products } = useAdminStore();
  const demoProducts = getDemoProducts();
  const source = products.length ? products : demoProducts;
  const [results, setResults] = useState<typeof source>([]);

  return (
    <div className="pb-24">
      <SearchBar
        onSearchAction={(query) => {
          setResults(
            source.filter((product) => {
              const title = (product.title || (product as any).name || "").toLowerCase();
              const category = (product.category || "").toLowerCase();
              const subcategory = (product.subcategory || "").toLowerCase();
              return (
                title.includes(query.toLowerCase()) ||
                category.includes(query.toLowerCase()) ||
                subcategory.includes(query.toLowerCase())
              );
            })
          );
        }}
      />
      <input
        type="text"
        placeholder="Search products…"
        aria-label="Search products"
        className="w-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-2 text-white placeholder-white/40"
        onChange={(e) => {
          const query = e.target.value;
          setResults(
            source.filter((product) => {
              const title = (product.title || (product as any).name || "").toLowerCase();
              const category = (product.category || "").toLowerCase();
              const subcategory = (product.subcategory || "").toLowerCase();
              return (
                title.includes(query.toLowerCase()) ||
                category.includes(query.toLowerCase()) ||
                subcategory.includes(query.toLowerCase())
              );
            })
          );
        }}
      />
      <div className="px-6 mt-4">
        {results.length === 0 ? (
          <p className="text-white/40 text-center mt-10 animate-pulse">
            Type to search…
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden"
              >
                <div className="relative h-40">
                  {(() => {
                    const img = (product as any).images?.[0] || "/placeholder.svg";
                    return (
                      <Image
                        fill
                        src={img}
                        alt={product.title || (product as any).name || "Product"}
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    );
                  })()}
                </div>
                <div className="p-3">
                  <p className="font-semibold">{product.title || (product as any).name}</p>
                  <p className="text-drip-gold mt-1">£{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
