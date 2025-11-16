"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function TelegramSplash() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-[9999] flex items-center justify-center
        bg-black transition-opacity duration-500
        ${hide ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
    >
      <div className="flex flex-col items-center">
        <Image
          src="/dripclub-gold.svg"
          alt="Drip Club Logo"
          width={88}
          height={88}
          className="animate-pulse"
        />
      </div>
    </div>
  );
}
