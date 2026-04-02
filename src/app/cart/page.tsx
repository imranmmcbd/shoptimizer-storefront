"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import CartItemList from "@/components/cart/CartItemList";
import CartPageSummary from "@/components/cart/CartPageSummary";
import { MoveLeft, Trash2 } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { totalItems, clearCart } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="w-full bg-shopGray min-h-screen py-6">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-shopMuted hover:text-shopOrange transition-colors text-xs font-medium uppercase tracking-wider"
          >
            <MoveLeft className="w-3.5 h-3.5" />
            Keep Shopping
          </Link>

          {totalItems > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Clear entire cart?")) clearCart();
              }}
              className="flex items-center gap-1.5 text-shopMuted hover:text-red-500 transition-colors text-xs font-medium uppercase tracking-wider"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear Cart
            </button>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-shopDark mb-6">
          Your Cart
          {totalItems > 0 && (
            <span className="text-shopMuted font-normal text-sm ml-2">
              ({totalItems} {totalItems === 1 ? 'item' : 'items'})
            </span>
          )}
        </h1>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <CartItemList />
          </div>
          <div className="lg:col-span-4">
            <CartPageSummary />
          </div>
        </div>

      </div>
    </div>
  );
}