"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={`fixed top-4 left-4 z-50 bg-white/10 text-white px-3 py-2 rounded-lg shadow hover:bg-white/20 transition ${className}`}
      onClick={() => router.back()}
      aria-label="Go back"
    >
      ← Back
    </button>
  );
}
