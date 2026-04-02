"use client";
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  badges?: string[];
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, items, updateQuantity, removeItem } = useCart();

  const cartItem = items.find((i: any) => i.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : null;

  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">

      {/* Image Area */}
      <Link href={`/product/${product.id}`} className="relative aspect-square block bg-white">
        {/* Badge */}
        {(product.badges?.length || savings) && (
          <div className="absolute top-2 left-2 z-10">
            <span className="text-[11px] bg-red-500 text-white px-2.5 py-1 font-semibold rounded-md flex items-center gap-1">
              🔥 {product.badges?.[0] || "Offered Items"}
            </span>
          </div>
        )}

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-3 transition-transform duration-500 hover:scale-105"
        />
      </Link>

      {/* Info */}
      <div className="px-3 pb-3 pt-2 flex flex-col gap-1.5">

        {/* Name */}
        <Link
          href={`/product/${product.id}`}
          className="text-shopDark font-bold text-sm leading-snug hover:text-shopOrange transition-colors line-clamp-2 min-h-[40px]"
        >
          {product.name}
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-shopOrange font-bold text-base">
            ৳{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              ৳{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Save Badge */}
        {savings && savings > 0 && (
          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded font-semibold w-fit">
            Save ৳{savings.toLocaleString()}
          </span>
        )}

        {/* Add to Cart / Quantity Selector */}
        {quantity === 0 ? (
          <button
            onClick={() => addItem(product)}
            className="mt-1 w-full border-2 border-shopOrange text-shopOrange hover:bg-shopOrange hover:text-white rounded-full py-2 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add To Cart
          </button>
        ) : (
          <div className="mt-1 flex items-center justify-between border-2 border-shopOrange rounded-full overflow-hidden">
            <button
              onClick={() => quantity === 1 ? removeItem(product.id) : updateQuantity(product.id, quantity - 1)}
              className="flex-1 py-2 bg-shopOrange text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="flex-1 text-center text-sm font-bold text-shopDark">
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="flex-1 py-2 bg-shopOrange text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}