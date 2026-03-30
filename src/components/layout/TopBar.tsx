import { Phone, Navigation, Globe } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden md:block bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 text-xs text-gray-600 dark:text-gray-300">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-2 h-10">
        <div className="flex items-center gap-4">
          <a href="tel:+13801234567" className="flex items-center gap-2 hover:text-shopOrange transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call us: +1 (380) 123-4567
          </a>
        </div>
        <div className="flex items-center gap-2 text-center text-shopBlue font-medium">
          ★ Free worldwide shipping on all orders over $100
        </div>
        <div className="flex items-center gap-4 font-medium">
          <button className="flex items-center gap-1 hover:text-shopOrange transition-colors">
            <Navigation className="w-3.5 h-3.5" /> Track order
          </button>
          <div className="border-l border-gray-300 dark:border-zinc-700 h-3 mx-1"></div>
          <button className="flex items-center gap-1 hover:text-shopOrange transition-colors">
            <Globe className="w-3.5 h-3.5"/> EN
          </button>
        </div>
      </div>
    </div>
  );
}
