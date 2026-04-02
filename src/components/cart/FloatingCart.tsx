"use client";

import { useCart } from '@/lib/CartContext';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function FloatingCart() {
  const { totalItems, totalAmount } = useCart();

  return (
    <Link
      href="/cart"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center shadow-lg overflow-hidden hover:scale-105 active:scale-95 transition-all rounded-l-xl"
    >
      {/* Top: Icon + Items */}
      <div className="bg-shopOrange text-white px-3 py-2.5 flex flex-col items-center gap-1 min-w-[70px]">
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-white text-shopOrange text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </div>
        <span className="text-[10px] font-semibold whitespace-nowrap">
          {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Bottom: Price */}
      <div className="bg-white px-3 py-1.5 w-full text-center border-l border-b border-gray-200">
        <span className="text-shopOrange font-bold text-xs whitespace-nowrap">
          ৳{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </Link>
  );
}