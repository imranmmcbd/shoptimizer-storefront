"use client";

import { ChevronDown, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface ShopHeaderProps {
  totalResults: number;
  onSortChange: (sort: string) => void;
  currentSort: string;
  onMobileFilterOpen: () => void;
}

export default function ShopHeader({
  totalResults,
  onSortChange,
  currentSort,
  onMobileFilterOpen
}: ShopHeaderProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Customer Rating", value: "rating" },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === currentSort)?.label || "Sort By";

  return (
    <div className="flex flex-col gap-6 mb-8">
      
      {/* Breadcrumb & Title */}
      <div className="flex flex-col gap-2">
         <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <Link href="/" className="hover:text-shopOrange transition-colors">Home</Link>
            <span>/</span>
            <span className="text-zinc-600 dark:text-zinc-500">Shop</span>
         </nav>
         <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-gray-100 tracking-tighter uppercase">
           All <span className="text-shopOrange">Products</span>
         </h1>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-zinc-950 p-4 border border-zinc-100 dark:border-zinc-900 rounded-2xl shadow-sm">
         
         <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={onMobileFilterOpen}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white rounded-xl text-xs font-black uppercase tracking-widest active:scale-95 transition-all"
            >
               <SlidersHorizontal className="w-4 h-4" />
               Filters
            </button>
            <p className="text-xs font-black text-zinc-400 uppercase tracking-widest">
              Showing <span className="text-shopDark dark:text-zinc-100">{totalResults}</span> Products
            </p>
         </div>

         <div className="flex items-center gap-3 w-full md:w-auto self-end md:self-auto">
            
            {/* Sorting Dropdown */}
            <div className="relative w-full md:w-48 text-left">
               <button 
                 onClick={() => setIsSortOpen(!isSortOpen)}
                 className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-black text-zinc-800 dark:text-zinc-200 uppercase tracking-widest transition-all"
               >
                  <span className="truncate">{currentSortLabel}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
               </button>
               
               {isSortOpen && (
                 <div className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                    {sortOptions.map(opt => (
                      <button 
                         key={opt.value}
                         onClick={() => {
                           onSortChange(opt.value);
                           setIsSortOpen(false);
                         }}
                         className={`w-full px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest transition-colors ${currentSort === opt.value ? "bg-shopOrange/10 text-shopOrange" : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                 </div>
               )}
            </div>

            {/* View Toggles */}
            <div className="hidden md:flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl">
               <button className="p-2 bg-white dark:bg-shopDark text-shopOrange rounded-lg shadow-sm">
                  <LayoutGrid className="w-4 h-4" />
               </button>
               <button className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors">
                  <List className="w-4 h-4" />
               </button>
            </div>

         </div>

      </div>

    </div>
  );
}
