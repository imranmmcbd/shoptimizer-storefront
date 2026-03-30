"use client";

import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import { CreditCard, Truck, X } from "lucide-react";

interface OrderSummaryProps {
  shippingFee: number;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export default function OrderSummary({ shippingFee, onConfirm, isSubmitting }: OrderSummaryProps) {
  const { items, totalAmount, removeItem } = useCart();
  const grandTotal = totalAmount + shippingFee;

  return (
    <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg lg:sticky lg:top-24 h-fit">
      <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-zinc-50 border-b pb-4 border-zinc-100 dark:border-zinc-800">
        Order Summary
      </h3>

      {/* Cart Items List */}
      <div className="flex flex-col gap-4 mb-6 max-h-[250px] overflow-y-auto pr-2 no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 items-center border-b border-zinc-50 dark:border-zinc-800 pb-4 last:border-0 last:pb-0">
            <div className="relative w-16 h-16 shrink-0 bg-zinc-50 dark:bg-zinc-900 rounded-md overflow-hidden border border-zinc-100 dark:border-zinc-800 p-1">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-contain" 
              />
              <span className="absolute -top-1 -right-1 bg-shopOrange text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-1">
              <div className="flex justify-between items-start gap-2">
                <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 leading-tight line-clamp-1">
                  {item.name}
                </h4>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-zinc-400 hover:text-red-500 transition-colors p-1 -mr-1"
                  title="Remove item"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-shopOrange font-bold text-sm">৳{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery selection mockup */}
      <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4 mb-6 border border-zinc-100 dark:border-zinc-800">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input type="radio" name="payment" defaultChecked className="w-4 h-4 accent-shopOrange" />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-zinc-600" />
              <span className="text-sm font-bold text-zinc-800 dark:text-zinc-200 uppercase">Cash on Delivery</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium">Pay after receiving the products</p>
          </div>
        </label>
      </div>

      {/* Price Calculations */}
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400 text-sm font-medium">
          <span>Subtotal</span>
          <span>৳{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400 text-sm font-medium">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-zinc-500" />
             <span>Shipping Fee</span>
          </div>
          <span>৳{shippingFee === 0 ? "Free" : shippingFee.toLocaleString()}</span>
        </div>
        <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full my-2"></div>
        <div className="flex justify-between items-center text-xl font-black text-zinc-900 dark:text-zinc-50">
          <span>Total</span>
          <span className="text-shopOrange">৳{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={onConfirm}
        disabled={isSubmitting}
        className="w-full bg-shopOrange hover:bg-orange-600 disabled:bg-zinc-400 text-white py-4 px-6 rounded-lg font-black text-lg shadow-lg hover:shadow-orange-200 dark:hover:shadow-none transition-all active:scale-[0.98] uppercase tracking-wider flex items-center justify-center gap-2"
      >
        {isSubmitting && <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>}
        {isSubmitting ? "Processing..." : "Confirm Order"}
      </button>
      
      <p className="text-center text-[10px] text-zinc-400 mt-4 font-medium uppercase tracking-widest">
        100% Secure Checkout Guaranteed
      </p>
    </div>
  );
}
