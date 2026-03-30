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
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col shadow-2xl overflow-hidden rounded-l-xl transition-all hover:scale-105 active:scale-95 group"
    >
      {/* Top Sidebar Style Cart */}
      <div className="bg-shopOrange text-white p-3 flex flex-col items-center justify-center min-w-[80px] gap-1">
        <div className="relative">
          <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
          <span className="absolute -top-1 -right-1 bg-white text-shopOrange text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-shopOrange group-hover:scale-110 transition-transform">
            {totalItems}
          </span>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">
          {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
        </span>
      </div>
      
      {/* Bottom Price section */}
      <div className="bg-white p-2 border-l border-b border-t border-zinc-100 flex items-center justify-center">
        <span className="text-shopOrange font-black text-sm">
          ৳{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>
    </Link>
  );
}
