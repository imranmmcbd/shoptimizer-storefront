"use client";

import { useCart } from '@/lib/CartContext';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function FloatingCart() {
  const { totalItems, totalAmount } = useCart();

  return (
    <Link
      href="/cart"
      className="fixed right-3 bottom-6 z-[60] flex flex-col items-center shadow-lg rounded-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all w-[72px]"
    >
      {/* Top: Icon + Items */}
      <div className="bg-shopOrange text-white w-full py-2 flex flex-col items-center gap-0.5">
        <div className="relative">
          <ShoppingBag className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-white text-shopOrange text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        </div>
        <span className="text-[9px] font-semibold">
          {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Bottom: Price */}
      <div className="bg-white w-full text-center py-1 border border-t-0 border-gray-100 rounded-b-2xl">
        <span className="text-shopOrange font-bold text-[10px]">
          ৳{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </Link>
  );
}