import { notFound } from 'next/navigation';
import { mockProducts } from '@/lib/mockData';
import Breadcrumb from '@/components/product/Breadcrumb';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';
import ProductTabs from '@/components/product/ProductTabs';
import ReviewSection from '@/components/product/ReviewSection';
import MoreProductsSidebar from '@/components/product/MoreProductsSidebar';
import RelatedProducts from '@/components/product/RelatedProducts';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Find product by ID
  const product = mockProducts.find(p => p.id === id);
  if (!product) return notFound();

  // Define some mock stats and sidebar lists
  const sidebarProducts = mockProducts.filter(p => p.id !== id).slice(0, 5);
  const relatedProductsList = mockProducts.filter(p => p.id !== id);

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

  // Build the info struct
  const productInfoStruct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    originalPrice: product.originalPrice,
    badges: product.badges,
    image: product.image
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 py-4 mb-20 bg-zinc-50 dark:bg-zinc-950">
      <Breadcrumb title={product.name} />

      {/* Main Grid Layout */}
      <div className="flex flex-col xl:flex-row gap-8 items-start relative">
        
        {/* Left/Main Column */}
        <div className="flex-1 w-full min-w-0">
          
          {/* Top Row: Gallery + Info */}
          <div className="flex flex-col lg:flex-row gap-8 bg-white dark:bg-zinc-950 p-6 md:p-8 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            {/* Gallery Area */}
            <div className="w-full lg:w-1/2 min-w-0">
               <ProductGallery images={product.thumbnails || [product.image]} />
            </div>
            
            {/* Info Area */}
            <div className="w-full lg:w-1/2 min-w-0 flex flex-col justify-start">
               <ProductInfo product={productInfoStruct} />
            </div>
          </div>

          {/* Bottom Row: Tabs -> Description / Reviews */}
          <div className="w-full mt-8">
            <ProductTabs description={product.description || 'No description available for this product.'} reviewsCount={product.reviews?.length || 0}>
               <ReviewSection stats={mockReviewStats} />
            </ProductTabs>
          </div>
          
          {/* Related Products Section */}
          <div className="w-full mt-8 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm">
             <RelatedProducts products={relatedProductsList as any} />
          </div>
          
        </div>

        {/* Right Sidebar - Sticky on desktop */}
        <div className="w-full xl:w-[320px] shrink-0">
           <MoreProductsSidebar products={sidebarProducts as any} />
        </div>
      </div>
    </div>
  );
}
