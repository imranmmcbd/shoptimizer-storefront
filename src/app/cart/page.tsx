"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import CartItemList from "@/components/cart/CartItemList";
import CartPageSummary from "@/components/cart/CartPageSummary";
import { MoveLeft, Trash } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { totalItems, clearCart } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-12 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex flex-col gap-2">
           <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-shopOrange transition-colors text-sm font-bold uppercase tracking-widest group">
              <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Keep Shopping
           </Link>
           <h1 className="text-4xl lg:text-5xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase">
             Your <span className="text-shopOrange">Shopping Cart</span>
           </h1>
        </div>
        
        {totalItems > 0 && (
          <button 
            onClick={() => {
              if (window.confirm("Are you sure you want to clear your entire cart?")) {
                clearCart();
              }
            }}
            className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest"
          >
            <Trash className="w-4 h-4" />
            Clear Entire Cart
          </button>
        )}
      </div>

      {/* Main Grid Cart Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Items List */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <CartItemList />
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:col-span-4">
           <CartPageSummary />
        </div>

      </div>
    </div>
  );
}
