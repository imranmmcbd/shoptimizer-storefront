"use client";

import { useCart } from "@/lib/CartContext";
import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CartPageSummary() {
  const { totalAmount, totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl lg:sticky lg:top-24 h-fit">
      <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-50 border-b pb-4 border-zinc-100 dark:border-zinc-800 uppercase tracking-tighter">
        Cart Totals
      </h3>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-zinc-500 font-medium text-sm">
          <span>Subtotal ({totalItems} items)</span>
          <span className="text-zinc-900 dark:text-zinc-200">৳{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-zinc-500 font-medium text-sm">
          <span>Shipping Fee</span>
          <span className="text-zinc-400 italic">Calculated at checkout</span>
        </div>
        <div className="h-px bg-zinc-100 dark:bg-zinc-800 w-full my-2"></div>
        <div className="flex justify-between items-center text-2xl font-black text-zinc-900 dark:text-zinc-100">
          <span>Total</span>
          <span className="text-shopOrange">৳{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link 
          href="/checkout" 
          className="w-full bg-shopOrange hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-black text-lg shadow-lg hover:shadow-orange-200 dark:hover:shadow-none transition-all active:scale-[0.98] uppercase tracking-wider flex justify-center items-center gap-2 group"
        >
          Proceed to Checkout
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link 
          href="/" 
          className="w-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 py-3 px-6 rounded-lg font-bold text-sm transition-all text-center uppercase tracking-widest border border-zinc-200 dark:border-zinc-700"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="mt-8 flex flex-col gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-shopGreen/10 rounded-full">
            <ShieldCheck className="w-4 h-4 text-shopGreen" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Secure Payment Guaranteed</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-shopBlue/10 rounded-full">
            <CreditCard className="w-4 h-4 text-shopBlue" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 dark:text-zinc-400">Cash On Delivery Available</span>
        </div>
      </div>
    </div>
  );
}
