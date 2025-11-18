"use client";

import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  images?: string[];
}

export default function ProductCard({ id, title, price, images }: ProductCardProps) {
  const img = images?.[0] || "/placeholder.svg";

  return (
    <Link
      href={`/product/${id}`}
      className="relative group rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-200 active:scale-95"
    >
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-3">
        <p className="text-sm font-medium tracking-tight">{title}</p>
        <p className="text-drip-gold text-base font-semibold mt-1">£{price}</p>
      </div>
    </Link>
  );
}
