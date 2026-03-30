import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

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
  return (
    <div className="group flex flex-col pt-4">
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="relative bg-zinc-100 dark:bg-zinc-900 aspect-[4/5] mb-4 overflow-hidden block">
        {product.badges && product.badges.map((badge, idx) => (
          <span 
            key={idx} 
            className="absolute top-2 left-2 z-10 text-[10px] uppercase tracking-wider bg-red-500 text-white px-2 py-1 font-bold"
          >
            {badge}
          </span>
        ))}
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105 mix-blend-multiply dark:mix-blend-normal" 
        />
      </Link>
      
      {/* Product Info */}
      <div className="flex flex-col flex-1 text-left">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">
          {product.category}
        </p>
        <Link href={`/product/${product.id}`} className="text-shopDark dark:text-gray-100 font-bold text-lg mb-1 leading-tight hover:text-shopOrange transition-colors">
          {product.name}
        </Link>
        <div className="flex items-center text-[#ffc107] mb-2 gap-[1px]">
          {[1,2,3,4,5].map(star => (
            <Star key={star} className="w-4 h-4" fill={star <= product.rating ? "currentColor" : "none"} strokeWidth={1} />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-auto">
          {product.originalPrice && (
            <span className="text-gray-400 line-through font-medium">${product.originalPrice.toFixed(2)}</span>
          )}
          <span className="text-shopDark dark:text-white font-black text-xl">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
