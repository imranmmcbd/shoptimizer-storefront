import HeroBanner from "@/components/home/HeroBanner";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import ProductGrid from "@/components/home/ProductGrid";
import FeaturesList from "@/components/home/FeaturesList";
import PromoBanner from "@/components/home/PromoBanner";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 60 }
  });
  const data = await res.json();
  return data.data || [];
}

export default async function Home() {
  const products = await getProducts();
  
  return (
    <div className="w-full flex flex-col pt-0">
      <HeroBanner />
      <FeaturedCategories />
      <ProductGrid title="Our latest items" products={products} />
      <FeaturesList />
      <PromoBanner />
      <ProductGrid title="Our most popular products" products={products.slice().reverse()} />
    </div>
  );
}
