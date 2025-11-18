import "./globals.css";

export const metadata = {
  title: "DRIP CLUB",
  description: "Designer drops. Telegram-native shopping."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="tg-dark">
      <body className="bg-black text-white antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
