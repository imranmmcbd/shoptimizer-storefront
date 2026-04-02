"use client";

import { useCart } from '@/lib/CartContext';
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function FloatingCart() {
  const { totalItems, totalAmount } = useCart();

  if (totalItems === 0) return null;

  return (
    <Link
      href="/cart"
      className="fixed right-4 bottom-6 z-[60] flex flex-col items-center shadow-lg rounded-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all"
    >
      {/* Cart Icon + Count */}
      <div className="bg-shopOrange text-white px-4 py-2.5 flex flex-col items-center gap-0.5 min-w-[72px]">
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1.5 -right-1.5 bg-white text-shopOrange text-[9px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        </div>
        <span className="text-[10px] font-semibold whitespace-nowrap">
          {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Price */}
      <div className="bg-white px-3 py-1.5 w-full text-center border border-t-0 border-gray-100 rounded-b-2xl">
        <span className="text-shopOrange font-bold text-xs">
          ৳{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </Link>
  );
}