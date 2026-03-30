import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-zinc-50 dark:bg-zinc-950`}>
        <Header />
        <main className="flex-1 w-full relative z-10 flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
