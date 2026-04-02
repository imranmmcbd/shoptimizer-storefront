"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
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
  const { addItem } = useCart();

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="group flex flex-col bg-white">

      {/* Image */}
      <Link href={`/product/${product.id}`} className="relative aspect-square overflow-hidden block bg-shopGray">

        {/* Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {discountPercent && (
            <span className="text-[11px] bg-shopOrange text-white px-2 py-0.5 font-semibold">
              -{discountPercent}%
            </span>
          )}
          {product.badges && product.badges.map((badge, idx) => (
            <span key={idx} className="text-[11px] bg-shopDark text-white px-2 py-0.5 font-semibold">
              {badge}
            </span>
          ))}
        </div>

        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Info */}
      <div className="pt-3 pb-4 flex flex-col gap-1.5 border-b border-shopBorder">
        <p className="text-xs text-shopMuted uppercase tracking-wider">
          {product.category}
        </p>

        <Link
          href={`/product/${product.id}`}
          className="text-shopText font-medium text-sm leading-snug hover:text-shopOrange transition-colors line-clamp-2 min-h-[40px]"
        >
          {product.name}
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-0.5 text-yellow-400">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              className="w-3 h-3"
              fill={star <= product.rating ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          {product.originalPrice && (
            <span className="text-shopMuted line-through text-sm">
              ৳{product.originalPrice.toLocaleString()}
            </span>
          )}
          <span className="text-shopText font-bold text-base">
            ৳{product.price.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addItem(product)}
          className="mt-2 w-full border border-shopOrange text-shopOrange hover:bg-shopOrange hover:text-white py-2 text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}