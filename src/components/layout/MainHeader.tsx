"use client";

import { Search, User, Layers, ShoppingCart, Activity } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function MainHeader() {
  const { totalItems, totalAmount } = useCart();

  return (
    <div className="bg-white dark:bg-[#121212] border-b border-gray-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Activity className="w-8 h-8 text-shopOrange" />
            <span className="text-2xl font-black tracking-tight uppercase text-zinc-900 dark:text-white">Shoptimizer</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl w-full">
            <div className="flex border-2 border-shopOrange rounded-full overflow-hidden bg-white dark:bg-zinc-800 focus-within:ring-2 ring-shopOrange/50 transition-all">
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="flex-1 px-5 py-2.5 outline-none bg-transparent dark:text-white"
              />
              <button className="bg-shopOrange px-6 text-white hover:bg-orange-600 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <Link href="/account" className="flex flex-col items-center gap-1 group text-sm font-medium text-gray-700 dark:text-gray-200">
              <div className="relative p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-zinc-800 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <span className="hidden lg:block text-xs">My Account</span>
            </Link>

            <Link href="/compare" className="flex flex-col items-center gap-1 group text-sm font-medium text-gray-700 dark:text-gray-200">
              <div className="relative p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-zinc-800 transition-colors">
                <Layers className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-shopBlue text-white text-[10px] items-center justify-center flex rounded-full border-2 border-white dark:border-[#121212]">0</span>
              </div>
              <span className="hidden lg:block text-xs">Compare items</span>
            </Link>

            <Link href="/cart" className="flex flex-col items-center gap-1 group text-sm font-medium text-gray-700 dark:text-gray-200">
              <div className="relative p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-zinc-800 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-shopGreen text-white text-[10px] items-center justify-center flex rounded-full border-2 border-white dark:border-[#121212]">{totalItems}</span>
              </div>
              <span className="hidden lg:block text-xs font-bold text-zinc-900 dark:text-white">
                ৳{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
