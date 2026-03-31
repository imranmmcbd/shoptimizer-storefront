import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/product/Breadcrumb';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import ReviewSection from '@/components/product/ReviewSection';
import MoreProductsSidebar from '@/components/product/MoreProductsSidebar';
import RelatedProducts from '@/components/product/RelatedProducts';

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    next: { revalidate: 60 }
  });
  if (!res.ok) return null;
  return res.json();
}

async function getAllProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 60 }
  });
  const data = await res.json();
  return data.data || [];
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [product, allProducts] = await Promise.all([
    getProduct(id),
    getAllProducts()
  ]);

  if (!product) return notFound();

  const sidebarProducts = allProducts
    .filter((p: any) => String(p.id) !== id)
    .slice(0, 5)
    .map((p: any) => ({
      id: String(p.id),
      name: p.name,
      category: p.category,
      price: parseFloat(p.offer_price ?? p.price),
      originalPrice: p.offer_price ? parseFloat(p.price) : undefined,
      rating: 4,
      image: p.images?.[0] || "/placeholder.png",
    }));

  const relatedProductsList = allProducts
    .filter((p: any) => String(p.id) !== id)
    .map((p: any) => ({
      id: String(p.id),
      name: p.name,
      category: p.category,
      price: parseFloat(p.offer_price ?? p.price),
      originalPrice: p.offer_price ? parseFloat(p.price) : undefined,
      rating: 4,
      image: p.images?.[0] || "/placeholder.png",
    }));

  const mockReviewStats = {
    average: 4.8,
    total: 124,
    recommendedPercent: 96,
    breakdown: [
      { stars: 5, count: 100, percent: 80 },
      { stars: 4, count: 20, percent: 16 },
      { stars: 3, count: 4, percent: 3 },
      { stars: 2, count: 0, percent: 0 },
      { stars: 1, count: 0, percent: 0 }
    ]
  };

  const productInfoStruct = {
    id: String(product.id),
    name: product.name,
    brand: product.category,
    price: parseFloat(product.offer_price ?? product.price),
    originalPrice: product.offer_price ? parseFloat(product.price) : undefined,
    badges: [],
    image: product.images?.[0] || "/placeholder.png",
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-4 mb-20 bg-zinc-50 dark:bg-zinc-950">
      <Breadcrumb title={product.name} />

      <div className="flex flex-col xl:flex-row gap-8 items-start relative">
        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="w-full lg:w-1/2 min-w-0">
              <ProductGallery images={product.images?.length ? product.images : ["/placeholder.png"]} />
            </div>
            <div className="w-full lg:w-1/2 min-w-0 flex flex-col justify-start">
              <ProductInfo product={productInfoStruct} />
            </div>
          </div>

          <div className="w-full mt-8">
            <ProductTabs 
              description={product.description?.replace(/<[^>]*>/g, '') || 'No description available.'} 
              reviewsCount={0}
            >
              <ReviewSection stats={mockReviewStats} />
            </ProductTabs>
          </div>

          <div className="w-full mt-8 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
            <RelatedProducts products={relatedProductsList as any} />
          </div>
        </div>

        <div className="w-full xl:w-[320px] shrink-0">
          <MoreProductsSidebar products={sidebarProducts as any} />
        </div>
      </div>
    </div>
  );
}