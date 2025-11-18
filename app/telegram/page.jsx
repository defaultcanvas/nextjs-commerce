"use client";
import { useEffect } from "react";

// Telegram Mini App entrypoint
export default function TelegramRoot() {
  useEffect(() => {
    // Telegram WebApp initialization
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      // Auto theme
      document.body.setAttribute(
        "data-theme",
        window.Telegram.WebApp.colorScheme === "dark" ? "dark" : "light"
      );
    }
  }, []);

  return <div id="drip-root" style={{ minHeight: "100vh", width: "100vw" }} />;
}
