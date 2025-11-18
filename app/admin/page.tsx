import React from 'react'
import { redirect } from 'next/navigation'

export default function AdminIndex() {
  // Redirect to the main products page for the new Admin Hub
  redirect('/admin/products')
}
"use client";
import { useAdminStore } from "@/lib/use-admin-store";
import ImageUploader from "@/components/admin/ImageUploader";
import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminPanel() {
  const {
    categories,
    subcategories,
    products,
    addCategory,
    removeCategory,
    addSubcategory,
    removeSubcategory,
    addProduct,
    updateProduct,
    removeProduct
  } = useAdminStore();

  const [newCat, setNewCat] = useState("");
  const [newSub, setNewSub] = useState("");
  const [selectedCat, setSelectedCat] = useState<string | null>(null);

  return (
    <div className="min-h-screen p-5 text-white bg-black">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-4"
      >
        Admin Control Panel
      </motion.h1>

      {/* Glass dashboard */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        <GlassStat label="Categories" value={categories.length} />
        <GlassStat label="Subcategories" value={
          Object.values(subcategories).reduce((a,b)=>a+b.length, 0)
        }/>
        <GlassStat label="Products" value={products.length} />
      </motion.div>

      {/* Category manager */}
      <Section title="Categories">

        <div className="flex gap-2 mb-3">
          <input
            className="flex-1 px-3 py-2 bg-white/10 rounded-xl outline-none"
            placeholder="Add category…"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 rounded-xl active:scale-95"
            onClick={() => {
              if (!newCat.trim()) return;
              addCategory(newCat.trim().toLowerCase());
              setNewCat("");
            }}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Tag
              key={cat}
              label={cat}
              active={selectedCat === cat}
              onClick={() => setSelectedCat(cat)}
              onRemove={() => removeCategory(cat)}
            />
          ))}
        </div>
      </Section>

      {/* Subcategories */}
      {selectedCat && (
        <Section title={`Subcategories • ${selectedCat}`}>
          <div className="flex gap-2 mb-3">
            <input
              className="flex-1 px-3 py-2 bg-white/10 rounded-xl outline-none"
              placeholder="Add subcategory…"
              value={newSub}
              onChange={(e) => setNewSub(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-600 rounded-xl active:scale-95"
              onClick={() => {
                if (!newSub.trim()) return;
                addSubcategory(selectedCat, newSub.trim().toLowerCase());
                setNewSub("");
              }}
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {(subcategories[selectedCat] ?? []).map((sub) => (
              <Tag
                key={sub}
                label={sub}
                active={false}
                onClick={() => {}}
                onRemove={() => removeSubcategory(selectedCat, sub)}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Products */}
      {selectedCat && (
        <Section title={`Products • ${selectedCat}`}>
          <button
            className="w-full py-3 bg-emerald-600 rounded-xl mb-3 active:scale-95"
            onClick={() =>
              addProduct({
                id: crypto.randomUUID(),
                title: "New Product",
                category: selectedCat,
                subcategory: subcategories[selectedCat][0] ?? "default",
                images: [],
              })
            }
          >
            + Add Product
          </button>

          <div className="flex flex-col gap-3">
            {products
              .filter((p) => p.category === selectedCat)
              .map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/10"
                >
                  <div className="flex justify-between">
                    <div>
                      <div className="font-semibold">{p.title}</div>
                      <div className="text-xs opacity-60">
                        {p.subcategory}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-sm text-white/80 px-2 py-1 bg-white/5 rounded-xl"
                        onClick={() => {
                          const id = p.id;
                          const node = document.getElementById(`product-editor-${id}`);
                          if (node) node.classList.toggle("hidden");
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="text-red-400 text-sm"
                        onClick={() => { void removeProduct(p.id); }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div id={`product-editor-${p.id}`} className="mt-3 hidden">
                    <ImageUploader
                      images={(p as any).images ?? []}
                      onChange={(newImages) => updateProduct(p.id, { images: newImages })}
                    />
                    <div className="mt-2 text-xs text-white/60">Drag to reorder. First image is primary.</div>
                  </div>
                </motion.div>
              ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/* UI COMPONENTS -------------------------------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}

function Tag({ label, active, onClick, onRemove }: { label: string; active: boolean; onClick: () => void; onRemove?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`px-3 py-1 rounded-xl flex items-center gap-2 cursor-pointer
      ${active ? "bg-blue-600" : "bg-white/10 backdrop-blur-sm"}
      `}
    >
      <span>{label}</span>
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="text-red-400 ml-1"
        >
          ×
        </span>
      )}
    </div>
  );
}

function GlassStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs opacity-60">{label}</div>
    </div>
  );
}
