import ProductCard, { Product } from './ProductCard';

export default function ProductGrid({ title, products }: { title: string, products: Product[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center mb-10 text-center">
        <h2 className="text-3xl font-black text-shopDark dark:text-white mb-2">{title}</h2>
        <div className="w-16 h-1 bg-shopOrange"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
