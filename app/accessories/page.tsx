"use client";

import Link from "next/link";

const ACCESSORIES_SUBCATEGORIES = [
  { name: "Hats", slug: "hats" },
  { name: "Bags", slug: "bags" },
  { name: "Belts", slug: "belts" },
  { name: "Fragrance", slug: "fragrance" },
  { name: "Wallets", slug: "wallets" },
  { name: "Sunglasses", slug: "sunglasses" },
];

export default function AccessoriesPage() {
  return (
    <div className="min-h-screen w-full px-6 py-10 text-drip-white">
      <h1 className="text-2xl font-bold mb-6">ACCESSORIES</h1>

      <div className="grid grid-cols-2 gap-4">
        {ACCESSORIES_SUBCATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/search?subcategory=${c.slug}&collection=accessories`}
            className="bg-[#0f0f11] border border-white/10 p-4 rounded-xl text-center 
                       active:scale-95 transition-all"
          >
            <div className="font-semibold text-sm">{c.name}</div>
          </Link>
        ))}
      </div>

      <Link
        href="/search?collection=accessories"
        className="mt-10 block text-center bg-drip-gold text-drip-black 
                   font-semibold py-3 rounded-xl active:scale-95"
      >
        View All Accessories
      </Link>
    </div>
  );
}
