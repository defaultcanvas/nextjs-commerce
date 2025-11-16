"use client";

import Image from "next/image";
import BottomNav from "@/components/layout/BottomNav";
import BlurCard from "@/components/ui/BlurCard";
import { useCart } from "@/lib/use-cart";

export default function CartPage() {
  const { items, removeItem } = useCart();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-black text-white px-5 pt-8 pb-24">
      <h1 className="text-lg font-semibold mb-4">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-white/60 mt-6">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <BlurCard key={`${item.id}-${index}`} className="p-3 flex items-center gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              <div className="flex-1 text-sm">
                <div className="font-medium">{item.title}</div>
                <div className="text-white/60">£{item.price.toFixed(2)}</div>
              </div>

              <button onClick={() => removeItem(item.id)} className="text-red-400 text-xs">
                Remove
              </button>
            </BlurCard>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <BlurCard className="p-4 mt-6 flex items-center justify-between text-sm font-semibold">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </BlurCard>
      )}

      <BottomNav />
    </div>
  );
}
