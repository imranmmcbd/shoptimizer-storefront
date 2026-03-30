"use client";

import { X, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';

interface ShopSidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onClearAll: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function ShopSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onClearAll,
  isOpen,
  onClose
}: ShopSidebarProps) {
  const [localPrice, setLocalPrice] = useState(priceRange[1]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setLocalPrice(val);
  };

  const handlePriceBlur = () => {
    onPriceChange([priceRange[0], localPrice]);
  };

  const sidebarClasses = isOpen 
    ? "fixed inset-0 z-50 flex" 
    : "hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0";

  return (
    <aside className={sidebarClasses}>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity" 
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Content */}
      <div className={`relative bg-white dark:bg-zinc-950 w-80 lg:w-full h-full lg:h-auto overflow-y-auto p-6 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between lg:hidden mb-8">
           <h2 className="text-2xl font-black text-zinc-900 dark:text-gray-100 uppercase tracking-tighter">Filters</h2>
           <button onClick={onClose} className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full">
              <X className="w-5 h-5 text-zinc-500" />
           </button>
        </div>

        {/* Section: Category */}
        <div className="mb-10">
           <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Categories</h3>
           <div className="flex flex-col gap-2">
              <button 
                onClick={() => onCategoryChange(null)}
                className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-bold transition-all ${!selectedCategory ? "bg-shopOrange/10 text-shopOrange" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}
              >
                <span>All Products</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
              </button>
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-bold transition-all text-left ${selectedCategory === cat ? "bg-shopOrange/10 text-shopOrange" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}
                >
                  <span className="capitalize">{cat}</span>
                  <ChevronRight className="w-4 h-4 opacity-20" />
                </button>
              ))}
           </div>
        </div>

        {/* Section: Price Range */}
        <div className="mb-10">
           <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Price Range</h3>
           <div className="px-2">
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="10"
                value={localPrice}
                onChange={handlePriceChange}
                onMouseUp={handlePriceBlur}
                onTouchEnd={handlePriceBlur}
                className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-shopOrange mb-4"
              />
              <div className="flex items-center justify-between gap-4">
                 <div className="flex flex-col gap-1 flex-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Min Price</span>
                    <span className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-md font-black text-xs text-shopDark dark:text-gray-100">৳0</span>
                 </div>
                 <div className="flex flex-col gap-1 flex-1">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Max Price</span>
                    <span className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-md font-black text-xs text-shopOrange">৳{localPrice.toLocaleString()}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Section: Ratings */}
        <div className="mb-10">
           <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">Customer Rating</h3>
           <div className="flex flex-col gap-2">
              {[4, 3, 2].map(rating => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 accent-shopOrange rounded" />
                  <div className="flex items-center gap-1 text-[#ffc107]">
                     {[...Array(rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5" fill="currentColor" strokeWidth={0} />)}
                     {[...Array(5 - rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-zinc-200 dark:text-zinc-800" strokeWidth={1} />)}
                  </div>
                  <span className="text-xs font-bold text-zinc-500 group-hover:text-zinc-900 transition-colors">& Up</span>
                </label>
              ))}
           </div>
        </div>

        {/* Section: Clear Filters */}
        <button 
          onClick={onClearAll}
          className="w-full py-4 border-2 border-zinc-100 dark:border-zinc-900 rounded-xl text-xs font-black uppercase tracking-widest text-zinc-400 hover:border-shopOrange hover:text-shopOrange transition-all"
        >
          Clear All Filters
        </button>

      </div>
    </aside>
  );
}
