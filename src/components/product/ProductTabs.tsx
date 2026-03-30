"use client";

import { useState } from 'react';

interface ProductTabsProps {
  description: string;
  reviewsCount?: number;
  children: React.ReactNode;
}

export default function ProductTabs({ description, reviewsCount = 0, children }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'reviews'>('description');

  return (
    <div className="w-full mt-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
      {/* Tab Headers */}
      <div className="flex border-b border-zinc-200 dark:border-zinc-800">
        <button
          onClick={() => setActiveTab('description')}
          className={`flex-1 py-4 px-6 text-center text-sm lg:text-base font-semibold transition-colors focus:outline-none ${
            activeTab === 'description'
              ? 'text-zinc-900 dark:text-white border-b-2 border-shopOrange bg-zinc-50 dark:bg-zinc-900/50'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 bg-white dark:bg-zinc-950'
          }`}
        >
          Description
        </button>
        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex-1 py-4 px-6 text-center text-sm lg:text-base font-semibold transition-colors focus:outline-none ${
            activeTab === 'reviews'
              ? 'text-zinc-900 dark:text-white border-b-2 border-shopOrange bg-zinc-50 dark:bg-zinc-900/50'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 bg-white dark:bg-zinc-950'
          }`}
        >
          Customer Reviews ({reviewsCount})
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8">
        {activeTab === 'description' ? (
          <div className="prose prose-zinc dark:prose-invert max-w-none space-y-4">
            <h2 className="text-xl font-bold mb-4">Product Details</h2>
            <div dangerouslySetInnerHTML={{ __html: description.replace(/\\n/g, '<br />') }} />
          </div>
        ) : (
          <div>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
