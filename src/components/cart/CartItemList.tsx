"use client";

import { useCart } from "@/lib/CartContext";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartItemList() {
  const { items, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl border border-shopBorder">
        <div className="p-5 bg-shopGray rounded-full mb-4">
          <ShoppingBag className="w-8 h-8 text-gray-300" />
        </div>
        <h3 className="text-base font-bold text-shopDark mb-1">Your cart is empty</h3>
        <p className="text-shopMuted text-sm mb-6 text-center max-w-xs">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/"
          className="bg-shopOrange hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl border border-shopBorder p-4"
        >
          {/* Top Row: Image + Name + Remove */}
          <div className="flex items-start gap-3 mb-3">
            <div className="relative w-16 h-16 shrink-0 bg-shopGray rounded-lg overflow-hidden border border-shopBorder">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain p-1"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Link
                href={`/product/${item.id}`}
                className="text-sm font-bold text-shopDark hover:text-shopOrange transition-colors leading-snug line-clamp-2"
              >
                {item.name}
              </Link>
              <button
                onClick={() => removeItem(item.id)}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-medium mt-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Remove Item
              </button>
            </div>
          </div>

          {/* Bottom Row: Price + Qty + Total */}
          <div className="flex items-center justify-between pt-3 border-t border-shopBorder">
            {/* Unit Price */}
            <div className="flex flex-col">
              <span className="text-[10px] text-shopMuted uppercase tracking-wider">Unit Price</span>
              <span className="text-sm font-medium text-shopDark">৳{item.price.toLocaleString()}</span>
            </div>

            {/* Quantity */}
            <div className="flex items-center border border-shopBorder rounded-lg overflow-hidden">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 flex items-center justify-center text-shopMuted hover:bg-shopGray transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-shopDark">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 flex items-center justify-center text-shopMuted hover:bg-shopGray transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Total */}
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-shopMuted uppercase tracking-wider">Total</span>
              <span className="text-sm font-bold text-shopOrange">
                ৳{(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}