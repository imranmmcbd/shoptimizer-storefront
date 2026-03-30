"use client";

import { useState } from 'react';
import { ShoppingBag, CreditCard, Minus, Plus } from 'lucide-react';

interface ProductInfoProps {
  product: {
    name: string;
    brand?: string;
    price: number;
    originalPrice?: number;
    badges?: string[];
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col gap-6">
      {/* Title & Brand */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
          {product.name}
        </h1>
        {product.brand && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-zinc-500 text-sm">Brand:</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">{product.brand}</span>
          </div>
        )}
      </div>

      {/* Pricing Header */}
      <div className="flex items-baseline gap-4 mt-2">
        <span className="text-4xl font-extrabold text-shopOrange">
          ৳{product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        {product.originalPrice && (
          <span className="text-xl text-zinc-400 line-through">
            ৳{product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        )}
        {product.badges && product.badges.map(badge => (
          <span key={badge} className="px-2 py-1 text-xs font-bold leading-none bg-shopGreen text-white rounded-md">
            {badge}
          </span>
        ))}
      </div>

      <hr className="border-zinc-200 dark:border-zinc-800" />

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-zinc-700 dark:text-zinc-300 font-medium">Quantity:</span>
        <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 overflow-hidden">
          <button
            onClick={decrement}
            className="w-10 h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            readOnly
            className="w-12 h-10 text-center border-x border-zinc-200 dark:border-zinc-800 bg-transparent font-medium"
          />
          <button
            onClick={increment}
            className="w-10 h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <button className="flex items-center justify-center gap-2 bg-shopOrange hover:bg-orange-600 text-white py-4 px-6 rounded-md font-bold text-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
          <ShoppingBag className="w-5 h-5" />
          ADD TO CART
        </button>
        <button className="flex items-center justify-center gap-2 bg-[#1B2B32] hover:bg-zinc-900 text-white py-4 px-6 rounded-md font-bold text-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
          <CreditCard className="w-5 h-5" />
          BUY NOW
        </button>
      </div>

      {/* Extra Info */}
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg mt-4 flex gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <p>100% Original Product</p>
        <p>Cash on Delivery available</p>
      </div>
    </div>
  );
}
