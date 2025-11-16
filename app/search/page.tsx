"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { searchProducts } from "@/lib/search";
import type { Product } from "@/lib/products";
import SearchBar from "@/components/search-bar";

export default function SearchPage() {
  const [results, setResults] = useState<Product[]>([]);

  return (
    <div className="pb-24">
      <SearchBar onSearch={(query) => setResults(searchProducts(query))} />
      <input
        type="text"
        placeholder="Search products…"
        aria-label="Search products"
        className="w-full rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl px-4 py-2 text-white placeholder-white/40"
        onChange={(e) => setResults(searchProducts(e.target.value))}
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
                  {product.image ? (
                    <Image
                      fill
                      src={product.image}
                      alt={product.title}
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/40 text-sm">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-semibold">{product.title}</p>
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
