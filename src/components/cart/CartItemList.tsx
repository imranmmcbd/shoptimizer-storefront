"use client";

import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartItemList() {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-zinc-950 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 animate-in fade-in zoom-in duration-500">
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-full mb-6">
          <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Your cart is empty</h3>
        <p className="text-zinc-500 mb-8 max-w-xs text-center font-medium">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          href="/" 
          className="bg-shopOrange hover:bg-orange-600 text-white px-8 py-3 rounded-md font-bold transition-all hover:shadow-lg active:scale-95 uppercase tracking-wider"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-500 italic">
        <div className="col-span-6">Product Details</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-right">Total</div>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all hover:border-shopOrange/30 hover:shadow-sm group"
          >
            {/* Product Column */}
            <div className="col-span-1 md:col-span-6 flex items-center gap-4">
              <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0 bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800 p-2 group-hover:scale-105 transition-transform">
                <Image 
                  src={item.image} 
                  alt={item.name} 
                  fill 
                  className="object-contain" 
                />
              </div>
              <div className="flex flex-col gap-1">
                <Link href={`/product/${item.id}`} className="text-lg font-bold text-zinc-900 dark:text-zinc-100 hover:text-shopOrange transition-colors leading-tight">
                  {item.name}
                </Link>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-wider mt-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove Item
                </button>
              </div>
            </div>

            {/* Price Column */}
            <div className="col-span-1 md:col-span-2 text-center flex md:block justify-between items-center">
              <span className="md:hidden text-xs font-bold text-zinc-400 uppercase">Unit Price</span>
              <span className="text-zinc-600 dark:text-zinc-400 font-bold">৳{item.price.toLocaleString()}</span>
            </div>

            {/* Quantity Column */}
            <div className="col-span-1 md:col-span-2 flex justify-center">
               <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-md bg-zinc-50 dark:bg-zinc-900 overflow-hidden h-10">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-full flex items-center justify-center text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <div className="w-10 text-center font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                  {item.quantity}
                </div>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-full flex items-center justify-center text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Total Column */}
            <div className="col-span-1 md:col-span-2 text-right flex md:block justify-between items-center">
              <span className="md:hidden text-xs font-bold text-zinc-400 uppercase">Total Amount</span>
              <span className="text-shopOrange font-black text-xl md:text-lg">৳{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
