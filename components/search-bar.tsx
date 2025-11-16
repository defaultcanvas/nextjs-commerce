"use client";

import { useEffect, useState } from "react";

type SearchBarProps = {
  onSearchAction: (query: string) => void;
};

export default function SearchBar({ onSearchAction }: SearchBarProps) {
  const [value, setValue] = useState("");
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounce(value), 120);
    return () => window.clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    onSearchAction(debounce);
  }, [debounce, onSearchAction]);

  return (
    <div className="sticky top-0 z-50 bg-drip-black/80 backdrop-blur-xl p-3">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search products…"
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm outline-none"
      />
    </div>
  );
}
