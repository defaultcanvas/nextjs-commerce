"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BlurCard from "@/components/ui/BlurCard";

const TABS = [
  { href: "/", icon: "🏠", name: "Home" },
  { href: "/categories", icon: "🗂️", name: "Categories" },
  { href: "/cart", icon: "🛒", name: "Cart" },
  { href: "/profile", icon: "👤", name: "Profile" },
] as const;

export default function BottomNav() {
  const path = usePathname();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] z-50">
      <BlurCard className="flex justify-around py-3 px-2">
        {TABS.map((tab) => {
          const active = path === tab.href;

          return (
            <Link key={tab.href} href={tab.href} className="flex flex-col items-center">
              <span className={active ? "text-white text-xl" : "text-white/60 text-xl"}>{tab.icon}</span>
              <span className="text-[10px] mt-1">{tab.name}</span>
            </Link>
          );
        })}
      </BlurCard>
    </div>
  );
}
