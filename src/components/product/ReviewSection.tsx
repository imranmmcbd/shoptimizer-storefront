"use client";

import { Star } from 'lucide-react';

interface ReviewSectionProps {
  stats: {
    average: number;
    total: number;
    recommendedPercent: number;
    breakdown: { stars: number; count: number; percent: number }[];
  }
}

export default function ReviewSection({ stats }: ReviewSectionProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Stats Summary */}
      <div className="w-full lg:w-1/3">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-6xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tighter">
            {stats.average.toFixed(1)}
          </span>
          <div className="flex flex-col">
            <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">Average Rating</span>
            <div className="flex text-zinc-300">
              {[1,2,3,4,5].map(s => (
                <Star key={s} className={`w-4 h-4 ${s <= Math.round(stats.average) ? 'text-shopOrange fill-shopOrange' : ''}`} />
              ))}
            </div>
            <span className="text-xs text-zinc-500 mt-1">({stats.total} Reviews)</span>
          </div>
        </div>

        <p className="font-bold text-lg mb-6 text-zinc-800 dark:text-zinc-200">
          {stats.recommendedPercent.toFixed(2)}% <span className="font-medium text-zinc-500 text-sm">Recommended ({Math.round((stats.recommendedPercent/100)*stats.total)} of {stats.total})</span>
        </p>

        {/* Breakdown Bars */}
        <div className="space-y-3">
          {stats.breakdown.map((row) => (
            <div key={row.stars} className="flex items-center gap-2 text-sm">
              <div className="flex text-shopOrange min-w-[60px]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < row.stars ? 'fill-shopOrange' : 'text-zinc-300'}`} />
                ))}
              </div>
              <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-shopOrange transition-all duration-500"
                  style={{ width: `${row.percent}%` }}
                />
              </div>
              <span className="min-w-[30px] text-right text-zinc-500 text-xs font-semibold">{row.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      <div className="w-full lg:w-2/3">
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Submit Your Review</h3>
        <p className="text-sm text-zinc-500 mb-6">Your email address will not be published. Required fields are marked *</p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Write your opinion about the product <span className="text-shopOrange">*</span></label>
            <textarea 
              rows={4}
              placeholder="Write Your Review Here..."
              className="w-full p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-shopOrange focus:border-transparent transition-all resize-y"
              required
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 justify-between">
             <div className="flex flex-col gap-2 w-full sm:w-1/2">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Your Rating <span className="text-shopOrange">*</span></label>
                <select 
                  className="w-full p-3 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-zinc-50 dark:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-shopOrange focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select One</option>
                  <option value="5">5 - Excellent</option>
                  <option value="4">4 - Good</option>
                  <option value="3">3 - Average</option>
                  <option value="2">2 - Poor</option>
                  <option value="1">1 - Terrible</option>
                </select>
             </div>
             <button type="submit" className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-950 dark:bg-zinc-100 dark:hover:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-md font-bold transition-colors">
               SUBMIT REVIEW
             </button>
          </div>
        </form>
      </div>
    </div>
  );
}
