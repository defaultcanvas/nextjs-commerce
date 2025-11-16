"use client";

import { useEffect } from "react";

type TelegramWebApp = {
  ready: () => void;
  expand: () => void;
  enableClosingConfirmation: () => void;
  setBackgroundColor: (color: string) => void;
  setHeaderColor: (color: string) => void;
  colorScheme: string;
  onEvent: (event: string, handler: () => void) => void;
};


export default function TelegramInit() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    tg.ready();
    tg.expand();
    tg.enableClosingConfirmation();
    tg.setBackgroundColor("#000000");
    tg.setHeaderColor("#000000");

    function applyTheme() {
      const scheme = tg.colorScheme;
      document.documentElement.classList.toggle("tg-light", scheme === "light");
      document.documentElement.classList.toggle("tg-dark", scheme !== "light");
    }

    applyTheme();
    tg.onEvent("themeChanged", applyTheme);
  }, []);

  return null;
}
