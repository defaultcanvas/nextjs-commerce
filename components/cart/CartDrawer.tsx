"use client";

import { useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import BlurCard from "@/components/ui/BlurCard";
import { useCart } from "@/lib/use-cart";

export default function CartDrawer() {
  const { items, isOpen, close, removeItem } = useCart();
  const total = useMemo(() => items.reduce((acc, item) => acc + item.price, 0), [items]);

  const handleTelegramCheckout = useCallback(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    const order = {
      items,
      total: total.toFixed(2),
      time: Date.now(),
    };

    tg.HapticFeedback?.impactOccurred?.("medium");
    tg.sendData?.(JSON.stringify(order));
    tg.showPopup?.({
      title: "Order Sent",
      message: "We received your order. Our team will confirm shortly.",
      buttons: [{ id: "ok", type: "close", text: "OK" }],
    });
  }, [items, total]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (isOpen && tg?.HapticFeedback?.selectionChanged) {
      tg.HapticFeedback.selectionChanged();
    }

    if (!tg) return undefined;

    if (isOpen) {
      tg.MainButton?.setText?.("Place Order");
      tg.MainButton?.show?.();
      tg.MainButton?.onClick?.(handleTelegramCheckout);
    } else {
      tg.MainButton?.offClick?.(handleTelegramCheckout);
      tg.MainButton?.hide?.();
    }

    return () => {
      tg.MainButton?.offClick?.(handleTelegramCheckout);
      tg.MainButton?.hide?.();
    };
  }, [isOpen, handleTelegramCheckout]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]" onClick={close}>
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute bottom-0 left-0 right-0 p-4" onClick={(event) => event.stopPropagation()}>
        <BlurCard className="p-4 max-h-[60vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Your Cart</h2>

          <div className="space-y-3 mb-5">
            {items.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-xl">
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                <div className="flex-1">
                  <div className="text-sm">{item.title}</div>
                  <div className="text-xs text-white/60">£{item.price.toFixed(2)}</div>
                </div>

                <button onClick={() => removeItem(item.id)} className="text-red-400 text-xs">
                  Remove
                </button>
              </div>
            ))}

            {items.length === 0 && <p className="text-sm text-white/60">Your cart is empty.</p>}
          </div>

          <div className="flex justify-between text-sm font-semibold mb-4">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleTelegramCheckout}
            className="w-full py-3 bg-white text-black rounded-2xl font-semibold active:scale-95"
          >
            Checkout via Telegram
          </button>
        </BlurCard>
      </div>
    </div>
  );
}
