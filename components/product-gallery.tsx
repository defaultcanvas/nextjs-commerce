"use client";

import { useState } from "react";
import Image from "next/image";

type ProductGalleryProps = {
  images: string[];
};

export default function ProductGallery({ images }: ProductGalleryProps) {
  const hasImages = images.length > 0;
  const [active, setActive] = useState(0);
  const activeImage = hasImages ? images[Math.min(active, Math.max(images.length - 1, 0))] : undefined;

  return (
    <div>
      <div className="relative w-full h-80 rounded-xl overflow-hidden bg-black/20">
        {hasImages && activeImage ? (
          <Image
            fill
            src={activeImage}
            alt="Product image"
            className="object-cover transition-all duration-300"
            sizes="100vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/40 text-sm">
            No imagery available
          </div>
        )}
      </div>

      {hasImages && images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`h-16 w-16 rounded-lg overflow-hidden border transition ${
                index === active ? "border-drip-gold" : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img} alt="Variant thumbnail" width={64} height={64} className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
