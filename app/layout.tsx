import "./globals.css";
import TelegramInit from "@/components/telegram/telegram-init";
import TelegramSplash from "@/components/telegram/telegram-splash";
import CartDrawer from "@/components/cart/CartDrawer";

export const metadata = {
  title: "DRIP CLUB",
  description: "Designer drops. Telegram-native shopping."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="tg-dark">
      <body className="bg-black text-white antialiased">
        <TelegramSplash />
        <TelegramInit />

        <main>{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
