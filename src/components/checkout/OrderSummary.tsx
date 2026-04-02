"use client";

import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import { Truck, X } from "lucide-react";

interface OrderSummaryProps {
  shippingFee: number;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export default function OrderSummary({ shippingFee, onConfirm, isSubmitting }: OrderSummaryProps) {
  const { items, totalAmount, removeItem } = useCart();
  const grandTotal = totalAmount + shippingFee;

  return (
    <div className="bg-white p-5 rounded-xl border border-shopBorder lg:sticky lg:top-24 h-fit">

      <h3 className="text-base font-bold text-shopDark mb-4 pb-3 border-b border-shopBorder">
        Order Summary
      </h3>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-4 max-h-[220px] overflow-y-auto no-scrollbar">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3 items-center pb-3 border-b border-shopBorder last:border-0 last:pb-0">
            <div className="relative w-14 h-14 shrink-0 bg-shopGray rounded-lg overflow-hidden border border-shopBorder">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-1"
              />
              <span className="absolute -top-1 -right-1 bg-shopOrange text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-1">
                <p className="text-xs font-semibold text-shopDark leading-snug line-clamp-2">
                  {item.name}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <span className="text-shopOrange font-bold text-sm">
                ৳{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* COD Badge */}
      <div className="bg-shopGray rounded-lg p-3 mb-4 border border-shopBorder">
        <label className="flex items-center gap-3 cursor-pointer">
          <input type="radio" name="payment" defaultChecked className="w-3.5 h-3.5 accent-shopOrange" />
          <div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-shopOrange" />
              <span className="text-xs font-bold text-shopDark uppercase">Cash on Delivery</span>
            </div>
            <p className="text-[10px] text-shopMuted mt-0.5">Pay after receiving the products</p>
          </div>
        </label>
      </div>

      {/* Totals */}
      <div className="space-y-2.5 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-shopMuted">Subtotal</span>
          <span className="text-shopDark font-medium">৳{totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1.5 text-shopMuted">
            <Truck className="w-3.5 h-3.5" />
            <span>Shipping Fee</span>
          </div>
          <span className="text-shopDark font-medium">
            ৳{shippingFee === 0 ? "Free" : shippingFee.toLocaleString()}
          </span>
        </div>
        <div className="h-px bg-shopBorder w-full"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-bold text-shopDark">Total</span>
          <span className="text-lg font-bold text-shopOrange">৳{grandTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={onConfirm}
        disabled={isSubmitting}
        className="w-full bg-shopOrange hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        {isSubmitting && (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        )}
        {isSubmitting ? "Processing..." : "Confirm Order"}
      </button>

      <p className="text-center text-[10px] text-shopMuted mt-3 uppercase tracking-wider">
        100% Secure Checkout Guaranteed
      </p>

    </div>
  );
}