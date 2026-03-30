import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface SidebarProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
}

export default function MoreProductsSidebar({ products }: { products: SidebarProduct[] }) {
  return (
    <div className="w-full bg-white dark:bg-zinc-950 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hidden lg:block h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold font-heading text-zinc-900 dark:text-zinc-50 tracking-tight">More Products</h3>
        <div className="flex gap-1 border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden bg-zinc-50 dark:bg-zinc-900">
          <button aria-label="Previous" className="p-1 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 hover:dark:bg-zinc-800 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button aria-label="Next" className="p-1 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-200 hover:dark:bg-zinc-800 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group flex items-start gap-4">
            <div className="relative w-20 flex-shrink-0 aspect-square rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
            <div className="flex flex-col justify-center gap-1 h-full py-1">
              <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-300 group-hover:text-shopOrange transition-colors line-clamp-2 leading-tight">
                {product.name}
              </h4>
              <div className="flex items-center gap-2 mt-auto">
                <span className="font-bold text-shopOrange text-sm">
                  ৳{product.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through decoration-zinc-300">
                    ৳{product.originalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
