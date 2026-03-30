import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badges?: string[];
}

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="mt-16 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold font-heading text-zinc-900 dark:text-zinc-50">Related Products</h2>
        <Link href="/products" className="text-shopOrange font-semibold text-sm hover:underline">
          More Products &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div key={product.id} className="group border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 bg-white dark:bg-zinc-950 flex flex-col transition-all hover:shadow-lg hover:border-shopOrange/50">
            {/* Image Container */}
            <Link href={`/product/${product.id}`} className="relative bg-zinc-50 dark:bg-zinc-900 aspect-square mb-4 rounded-md overflow-hidden block">
              {product.badges && product.badges.map((badge, idx) => (
                <span 
                  key={idx} 
                  className="absolute top-2 right-2 z-10 text-[10px] bg-shopGreen text-white px-2 py-1 font-bold rounded-sm"
                >
                  {badge}
                </span>
              ))}
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-110" 
              />
            </Link>
            
            {/* Product Info */}
            <div className="flex flex-col flex-1">
              <Link href={`/product/${product.id}`} className="text-zinc-800 dark:text-zinc-200 font-bold text-sm md:text-base leading-snug hover:text-shopOrange transition-colors line-clamp-2 min-h-[40px]">
                {product.name}
              </Link>
              
              <div className="flex items-center gap-2 mt-4 mb-3">
                <span className="text-shopOrange font-bold text-lg">৳{product.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                {product.originalPrice && (
                   <span className="text-zinc-400 line-through text-sm">৳{product.originalPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                )}
              </div>

              <button className="w-full py-2 border border-shopOrange text-shopOrange hover:bg-shopOrange hover:text-white rounded-md font-bold transition-colors text-sm flex justify-center items-center gap-2 mt-auto">
                <span className="text-lg leading-none mb-1">+</span> Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
