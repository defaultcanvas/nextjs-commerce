"use client";
import Image from "next/image";
import Link from "next/link";
import BlurCard from "@/components/ui/BlurCard";
import BottomNav from "@/components/layout/BottomNav";
import { useAdminStore } from "@/lib/use-admin-store";
import { getDemoProducts } from "@/lib/catalog-demo";
import { useEffect, useState } from "react";
import React from "react";
import { useParams } from "next/navigation";


export default function ProductList() {
  const params = useParams();
  const categoryRaw = params?.category;
  const subcategoryRaw = params?.subcategory;
  const category = decodeURIComponent(Array.isArray(categoryRaw) ? categoryRaw[0] : (categoryRaw ?? ""));
  const subcategory = decodeURIComponent(Array.isArray(subcategoryRaw) ? subcategoryRaw[0] : (subcategoryRaw ?? ""));
  const normSub = subcategory.toLowerCase();
  const { products } = useAdminStore();
  const demoProducts = getDemoProducts();
  const source = products.length ? products : demoProducts;
  const filtered = source.filter(
    (product) =>
      product.category === category &&
      product.subcategory?.toLowerCase() === normSub
  );

  return (
    <div className="min-h-screen bg-black text-white px-5 pt-8 pb-24">
      <h1 className="text-lg font-semibold mb-4 capitalize">
        {subcategory} ({filtered.length})
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <BlurCard className="p-2">
              <div className="relative w-full h-36 mb-2">
                {/* You may want to add image support to admin products */}
                <div className="flex items-center justify-center h-full text-white/40 text-xs">No image</div>
              </div>
              <div className="text-xs">{product.title}</div>
              <div className="text-sm font-semibold mt-1">
                £{product.price ? product.price : "-"}
              </div>
            </BlurCard>
          </Link>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-white/60 mt-6">No products found in this category yet.</p>
      )}
      <BottomNav />
    </div>
  );
}
