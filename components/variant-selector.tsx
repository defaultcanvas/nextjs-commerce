"use client";

import { useEffect, useState } from "react";
import type { ProductVariant } from "@/lib/products";

type VariantSelectorProps = {
  variants: ProductVariant[];
  onChange: (selection: { variant: ProductVariant; size?: string }) => void;
};

export default function VariantSelector({ variants, onChange }: VariantSelectorProps) {
  const [current, setCurrent] = useState(0);
  const initialSize = variants[0]?.sizes.find((entry) => entry.stock > 0)?.size ?? variants[0]?.sizes[0]?.size;
  const [selectedSize, setSelectedSize] = useState<string | undefined>(initialSize);

  useEffect(() => {
    if (variants.length === 0) return;
    const variant = variants[0];
    const size = variant.sizes.find((entry) => entry.stock > 0)?.size ?? variant.sizes[0]?.size;
    if (!variant) return;
    onChange({ variant, size });
  }, [variants, onChange]);

  function emitChange(nextVariantIndex: number, sizeOverride?: string) {
    const variant = variants[nextVariantIndex];
    const size = sizeOverride ?? selectedSize;
    onChange({ variant, size });
  }

  function selectColor(index: number) {
    setCurrent(index);
    const fallbackSize = variants[index]?.sizes.find((entry) => entry.stock > 0)?.size ?? variants[index]?.sizes[0]?.size;
    setSelectedSize(fallbackSize);
    emitChange(index, fallbackSize);
  }

  function selectSize(size: string, stock: number) {
    if (stock === 0) return;
    setSelectedSize(size);
    emitChange(current, size);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm mb-2 text-white/60">Color</p>
        <div className="flex gap-3">
          {variants.map((variant, index) => (
            <button
              key={variant.color}
              type="button"
              onClick={() => selectColor(index)}
              className={`px-4 py-2 rounded-lg border text-sm transition ${
                index === current ? "border-drip-gold bg-drip-gold/10" : "border-white/10 bg-white/5 hover:border-white/20"
              }`}
            >
              {variant.color}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm mb-2 text-white/60">Size</p>
        <div className="flex flex-wrap gap-3">
          {variants[current]?.sizes.map((sizeEntry) => (
            <button
              key={sizeEntry.size}
              type="button"
              onClick={() => selectSize(sizeEntry.size, sizeEntry.stock)}
              disabled={sizeEntry.stock === 0}
              className={`px-4 py-2 rounded-lg border text-sm transition ${
                sizeEntry.stock === 0
                  ? "border-white/10 text-white/20 line-through"
                  : selectedSize === sizeEntry.size
                  ? "border-drip-gold bg-drip-gold/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 active:scale-95"
              }`}
            >
              {sizeEntry.size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
