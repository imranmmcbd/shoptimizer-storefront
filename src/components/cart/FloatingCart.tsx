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
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center shadow-md rounded-l-lg overflow-hidden hover:scale-105 active:scale-95 transition-all w-[58px]"
    >
      {/* Icon + Count */}
      <div className="bg-shopOrange text-white w-full py-2 flex flex-col items-center gap-0.5">
        <div className="relative">
          <ShoppingBag className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 bg-white text-shopOrange text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full">
            {totalItems}
          </span>
        </div>
        <span className="text-[9px] font-semibold leading-none">
          {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Price */}
      <div className="bg-white w-full text-center py-1 border-l border-b border-gray-200">
        <span className="text-shopOrange font-bold text-[9px] leading-none">
          ৳{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
      </div>
    </Link>
  );
}