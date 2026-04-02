import Link from "next/link";
import { Phone } from "lucide-react";

export default function TopBar() {
  return (
    <div className="hidden md:block bg-shopDark text-white text-xs">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-9">
        
        {/* Left */}
        <a
          href="tel:+13801234567"
          className="flex items-center gap-1.5 hover:text-shopOrange transition-colors"
        >
          <Phone className="w-3 h-3" />
          Call us toll free +1 (380) 123-4567
        </a>

        {/* Center */}
        <p className="text-white/80">
          ✈ Free worldwide shipping on all orders <strong className="text-white">over $100</strong>
        </p>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Link
            href="/track-order"
            className="hover:text-shopOrange transition-colors"
          >
            Track order
          </Link>
          <span className="text-white/30">|</span>
          <button className="hover:text-shopOrange transition-colors">
            EN
          </button>
        </div>

      </div>
    </div>
  );
}