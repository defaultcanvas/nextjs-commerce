"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/layout/BottomNav";
import BlurCard from "@/components/ui/BlurCard";
import { SAMPLE_PRODUCTS } from "@/lib/sample-products";
import { useCart } from "@/lib/use-cart";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = SAMPLE_PRODUCTS.find((item) => item.id === params.id);
  const { addItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/cart");
  }, [router]);

  if (!product) {
    return <div className="text-white p-8">Not found</div>;
  }

  const addToCart = () => {
    if (window.Telegram?.WebApp?.HapticFeedback?.impactOccurred) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred("light");
    }

    addItem(product);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="relative w-full h-[380px]">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
      </div>

      <div className="px-5 mt-5 space-y-4">
        <h1 className="text-xl font-semibold">{product.title}</h1>
        <div className="text-lg font-bold">£{product.price.toFixed(2)}</div>

        <BlurCard className="p-4 text-sm text-white/80">
          {product.description || "Premium item. Secure, verified supplier."}
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
