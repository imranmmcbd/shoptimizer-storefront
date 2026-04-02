"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, CreditCard, Minus, Plus } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

interface ProductInfoProps {
  product: {
    id: string;
    name: string;
    brand?: string;
    price: number;
    originalPrice?: number;
    badges?: string[];
    image: string;
  };
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addItem } = useCart();

  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : null;

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push('/checkout');
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col gap-4">

      {/* Title & Brand */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-shopDark leading-snug">
          {product.name}
        </h1>
        {product.brand && (
          <p className="text-sm text-shopMuted mt-1">
            Brand: <span className="font-semibold text-shopDark">{product.brand}</span>
          </p>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-2xl font-bold text-shopOrange">
          ৳{product.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </span>
        {product.originalPrice && (
          <span className="text-sm text-gray-400 line-through">
            ৳{product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        )}
        {savings && (
          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded font-semibold">
            Save ৳{savings.toLocaleString()}
          </span>
        )}
      </div>

      <hr className="border-shopBorder" />

      {/* Quantity Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-shopText font-medium">Quantity:</span>
        <div className="flex items-center border border-shopBorder rounded overflow-hidden">
          <button
            onClick={decrement}
            className="w-8 h-8 flex items-center justify-center text-shopText hover:bg-shopGray transition-colors"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-10 h-8 flex items-center justify-center border-x border-shopBorder text-sm font-semibold text-shopDark">
            {quantity}
          </span>
          <button
            onClick={increment}
            className="w-8 h-8 flex items-center justify-center text-shopText hover:bg-shopGray transition-colors"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 mt-1">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center gap-2 bg-shopOrange hover:bg-orange-600 text-white py-2.5 px-6 font-semibold text-sm transition-all active:scale-[0.98] rounded"
        >
          <ShoppingBag className="w-4 h-4" />
          ADD TO CART
        </button>
        <button
          onClick={handleBuyNow}
          className="flex items-center justify-center gap-2 bg-shopDark hover:bg-zinc-800 text-white py-2.5 px-6 font-semibold text-sm transition-all active:scale-[0.98] rounded"
        >
          <CreditCard className="w-4 h-4" />
          BUY NOW
        </button>
      </div>

      {/* Trust Badges */}
      <div className="flex items-center gap-4 border border-shopBorder rounded p-3 mt-1">
        <div className="flex items-center gap-1.5 text-xs text-shopMuted">
          <span>✅</span>
          <span>100% Original</span>
        </div>
        <div className="w-px h-4 bg-shopBorder"></div>
        <div className="flex items-center gap-1.5 text-xs text-shopMuted">
          <span>🚚</span>
          <span>Cash on Delivery</span>
        </div>
        <div className="w-px h-4 bg-shopBorder"></div>
        <div className="flex items-center gap-1.5 text-xs text-shopMuted">
          <span>↩</span>
          <span>Easy Return</span>
        </div>
      </div>

    </div>
  );
}