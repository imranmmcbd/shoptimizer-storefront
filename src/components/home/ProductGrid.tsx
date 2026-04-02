import ProductCard, { Product } from './ProductCard';

export default function ProductGrid({ title, products }: { title: string, products: Product[] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col items-center mb-8 text-center">
        <h2 className="text-2xl font-bold text-shopDark mb-2">{title}</h2>
        <div className="w-12 h-0.5 bg-shopOrange mt-1"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}