"use client";

import { Search, User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function MainHeader() {
  const { totalItems, totalAmount } = useCart();

  return (
    <div className="bg-white border-b border-shopBorder sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-shopDark tracking-tight">
              Shoptimizer
            </span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="flex border border-shopBorder overflow-hidden hover:border-gray-400 transition-colors">
              <input
                type="text"
                placeholder="Search for products..."
                className="flex-1 px-4 py-2.5 outline-none text-sm text-shopText placeholder:text-shopMuted bg-white"
              />
              <button className="bg-shopOrange px-5 text-white hover:bg-orange-600 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6 flex-shrink-0">

            {/* My Account */}
            <Link
              href="/account"
              className="flex items-center gap-2 text-shopText hover:text-shopOrange transition-colors text-sm"
            >
              <User className="w-5 h-5" />
              <span className="hidden lg:block">My Account</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center gap-2 text-shopText hover:text-shopOrange transition-colors"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-shopOrange text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-sm font-semibold">
                ৳{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}