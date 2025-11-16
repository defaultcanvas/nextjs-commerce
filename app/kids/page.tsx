"use client";

import Link from "next/link";

const KIDS_SUBCATEGORIES = [
  { name: "Hoodies", slug: "hoodies" },
  { name: "T-Shirts", slug: "tshirts" },
  { name: "Jackets", slug: "jackets" },
  { name: "Tracksuits", slug: "tracksuits" },
  { name: "Bottoms", slug: "bottoms" },
  { name: "Footwear", slug: "footwear" },
];

export default function KidsPage() {
  return (
    <div className="min-h-screen w-full px-6 py-10 text-drip-white">
      <h1 className="text-2xl font-bold mb-6">KIDS</h1>

      <div className="grid grid-cols-2 gap-4">
        {KIDS_SUBCATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/search?subcategory=${c.slug}&collection=kids`}
            className="bg-[#0f0f11] border border-white/10 p-4 rounded-xl text-center 
                       active:scale-95 transition-all"
          >
            <div className="font-semibold text-sm">{c.name}</div>
          </Link>
        ))}
      </div>

      <Link
        href="/search?collection=kids"
        className="mt-10 block text-center bg-drip-gold text-drip-black 
                   font-semibold py-3 rounded-xl active:scale-95"
      >
        View All Kids Products
      </Link>
    </div>
  );
}
