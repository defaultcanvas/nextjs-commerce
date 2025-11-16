"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function BlurCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg",
        "transition-all active:scale-95",
        className
      )}
    >
      {children}
    </div>
  );
}
