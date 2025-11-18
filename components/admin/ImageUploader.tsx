"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import uploadImage from "@/lib/upload-image";
import deleteImage from "@/lib/delete-image";

type Props = {
  images?: string[];
  onChange: (newImages: string[]) => void;
};

export default function ImageUploader({ images = [], onChange }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    const next = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 3 * 1024 * 1024) {
        setError(`Rejected ${file.name}: file exceeds 3MB limit`);
        continue;
      }

      const url = await uploadImage(file);
      if (url) next.push(url);
      else setError((s) => s ?? `Failed to upload ${file.name}`);
    }

    onChange(next);
    setUploading(false);
  };

  const onSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const removeAt = async (index: number) => {
    const url = images[index];
    // attempt to delete from storage, but still remove locally even if deletion fails
    try {
      if (url) await deleteImage(url);
    } catch (err) {
      console.error(err);
    }
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  };

  const onDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", String(index));
  };

  const onDropReorder = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const src = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(src)) return;
    if (src === targetIndex) return;
    const next = [...images];
    const [item] = next.splice(src, 1);
    next.splice(targetIndex, 0, item);
    onChange(next);
  };

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="p-3 rounded-xl bg-white/5 border border-white/10"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => inputRef.current?.click()}
            className="px-3 py-2 bg-emerald-600 rounded-xl"
            disabled={uploading}
          >
            Add Images
          </button>
          <div className="text-sm text-white/60">Drag & drop or click to upload (3MB max each)</div>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={onSelect}
        />

        {error && <div className="text-red-400 text-sm mt-2">{error}</div>}

        <div className="mt-3 grid grid-cols-4 gap-2">
          {(images.length ? images : [undefined]).map((img, idx) => {
            const src = img ?? "/placeholder.svg";
            return (
              <div
                key={`${src}-${idx}`}
                draggable={!!img}
                onDragStart={(e) => onDragStart(e, idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => onDropReorder(e, idx)}
                className="relative h-24 w-24 rounded-md overflow-hidden border border-white/10 bg-black/10"
              >
                <Image src={src} alt={`img-${idx}`} fill className="object-cover" />
                {img && (
                  <button
                    onClick={() => removeAt(idx)}
                    className="absolute top-1 right-1 bg-black/60 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
