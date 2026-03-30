import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductGrid from "@/components/home/ProductGrid";
import FeaturesList from "@/components/home/FeaturesList";
import PromoBanner from "@/components/home/PromoBanner";
import { mockProducts } from "@/lib/mockData";

export default function Home() {
  return (
    <div className="w-full flex flex-col pt-0">
      <HeroBanner />
      <FeaturedCategories />
      <ProductGrid title="Our latest items" products={mockProducts} />
      <FeaturesList />
      <PromoBanner />
      <ProductGrid title="Our most popular products" products={mockProducts.slice().reverse()} />
    </div>
  );
}
