"use client";

import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/home/ProductCard";
import ShopSidebar from "@/components/shop/ShopSidebar";
import ShopHeader from "@/components/shop/ShopHeader";
import { Search, SlidersHorizontal, ShoppingBag } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      .then(r => r.json())
      .then(data => {
        const mapped = (data.data || []).map((p: any) => ({
          id: String(p.id),
          name: p.name,
          category: p.category,
          price: parseFloat(p.offer_price ?? p.price),
          originalPrice: p.offer_price ? parseFloat(p.price) : undefined,
          rating: 4,
          image: p.images?.[0] || "/placeholder.png",
        }));
        setProducts(mapped);
      });
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(products.map(p => p.category)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, priceRange, sortBy, searchQuery]);

  const handleClearAll = () => {
    setSelectedCategory(null);
    setPriceRange([0, 5000]);
    setSortBy("newest");
    setSearchQuery("");
  };

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-950 pb-20 min-h-screen">
      <div className="bg-zinc-900 pt-32 pb-40 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-shopOrange rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-shopBlue rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-8 relative z-10">
          <h2 className="text-white text-4xl m:text-6xl font-black text-center tracking-tighter uppercase">
            Find Your <span className="text-shopOrange">Perfect</span> Match
          </h2>
          <div className="w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for clothes, groceries, electronics..."
              className="w-full bg-white dark:bg-zinc-950 border-none rounded-2xl p-6 pl-16 text-lg font-bold shadow-2xl focus:ring-4 focus:ring-shopOrange/20 transition-all placeholder:font-medium placeholder:text-zinc-400"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-400" />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700">ESC to Clear</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <ShopSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            onClearAll={handleClearAll}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />

          <div className="flex-1 w-full">
            <ShopHeader
              totalResults={filteredProducts.length}
              currentSort={sortBy}
              onSortChange={setSortBy}
              onMobileFilterOpen={() => setIsMobileFilterOpen(true)}
            />

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-zinc-950 p-20 rounded-3xl border border-zinc-100 dark:border-zinc-900 shadow-sm flex flex-col items-center text-center gap-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center opacity-30 grayscale">
                  <ShoppingBag className="w-12 h-12" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-gray-100 uppercase tracking-tighter mb-2">No products found</h3>
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Try adjusting your filters or search query.</p>
                </div>
                <button
                  onClick={handleClearAll}
                  className="bg-shopOrange text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}