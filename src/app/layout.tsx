import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";
import FloatingCart from "@/components/cart/FloatingCart";

export const metadata: Metadata = {
  title: "Shoptimizer | E-Commerce",
  description: "A premium headless Next.js e-commerce storefront attached to a Laravel backend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen flex flex-col antialiased bg-white"
        suppressHydrationWarning
      >
        <CartProvider>
          <Header />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
          <FloatingCart />
        </CartProvider>
      </body>
    </html>
  );
}