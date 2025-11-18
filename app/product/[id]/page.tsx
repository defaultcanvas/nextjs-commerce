"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import BlurCard from "@/components/ui/BlurCard";
import { useAdminStore } from "@/lib/use-admin-store";
import { useCart } from "@/lib/use-cart";

export default function ProductPage() {

  const params = useParams() as any;
  const id = decodeURIComponent(params.id ?? "");
  const { products } = useAdminStore();
  const product = products.find((item) => item.id === id);
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/cart");
  }, [router]);

  if (!product) {
    return <div className="text-white p-8">Not found</div>;
  }

  const isSampleProduct =
    typeof (product as any).description === "string" &&
    typeof (product as any).price === "number" &&
    Array.isArray((product as any).sizes) &&
    Array.isArray((product as any).images) &&
    typeof (product as any).status === "string" &&
    typeof (product as any).stock === "number";

  const addToCart = () => {
    if (window.Telegram?.WebApp?.HapticFeedback?.impactOccurred) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    // Only add if product has SampleProduct shape
    if (
      typeof (product as any).description === "string" &&
      typeof (product as any).price === "number" &&
      Array.isArray((product as any).sizes) &&
      Array.isArray((product as any).images) &&
      typeof (product as any).status === "string" &&
      typeof (product as any).stock === "number"
    ) {
      addItem(product as import("@/lib/sample-products").SampleProduct);
    }
  };

  const img = (product as any).images?.[0] || "/placeholder.svg";

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="relative w-full h-[380px]">
        <Image
          src={img}
          alt={product.title}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
      </div>

      <div className="px-5 mt-5 space-y-4">
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <div className="text-lg font-bold">
          £{isSampleProduct ? (product as any).price.toFixed(2) : "-"}
        </div>

        <BlurCard className="p-4 text-sm text-white/80">
          {isSampleProduct ? (product as any).description : "Premium item. Secure, verified supplier."}
        </BlurCard>

        <button
          onClick={addToCart}
          className="w-full mt-4 py-3 rounded-2xl bg-white text-black font-semibold active:scale-95 transition"
        >
          Add to cart
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
