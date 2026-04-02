"use client";

import { useCart } from "@/lib/CartContext";
import { ArrowRight, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CartPageSummary() {
  const { totalAmount, totalItems } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="bg-white p-5 rounded-xl border border-shopBorder lg:sticky lg:top-24 h-fit">
      
      <h3 className="text-sm font-bold text-shopDark uppercase tracking-wider mb-4 pb-3 border-b border-shopBorder">
        Cart Totals
      </h3>

      {/* Totals */}
      <div className="space-y-3 mb-5">
        <div className="flex justify-between items-center text-sm">
          <span className="text-shopMuted">Subtotal ({totalItems} items)</span>
          <span className="text-shopDark font-medium">৳{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-shopMuted">Shipping Fee</span>
          <span className="text-shopMuted italic text-xs">Calculated at checkout</span>
        </div>
        <div className="h-px bg-shopBorder w-full"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-shopDark">Total</span>
          <span className="text-lg font-bold text-shopOrange">৳{totalAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <Link
          href="/checkout"
          className="w-full bg-shopOrange hover:bg-orange-600 text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-all active:scale-[0.98] flex justify-center items-center gap-2 group"
        >
          Proceed to Checkout
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link
          href="/"
          className="w-full bg-shopGray hover:bg-gray-200 text-shopDark py-2.5 px-4 rounded-lg font-semibold text-sm transition-all text-center border border-shopBorder"
        >
          Continue Shopping
        </Link>
      </div>

      {/* Trust Badges */}
      <div className="mt-4 flex flex-col gap-2.5 border-t border-shopBorder pt-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-green-50 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-shopGreen" />
          </div>
          <span className="text-xs text-shopMuted">Secure Payment Guaranteed</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-blue-50 rounded-full">
            <CreditCard className="w-3.5 h-3.5 text-shopBlue" />
          </div>
          <span className="text-xs text-shopMuted">Cash On Delivery Available</span>
        </div>
      </div>

    </div>
  );
}