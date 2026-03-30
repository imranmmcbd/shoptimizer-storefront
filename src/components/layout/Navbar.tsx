import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

export default function Navbar() {
  const categories = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop", hasDrop: true },
    { name: "Men", href: "/category/men", hasDrop: true },
    { name: "Women", href: "/category/women", hasDrop: true },
    { name: "Pages", href: "/pages", hasDrop: true },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <div className="bg-[#1a1a1a] dark:bg-black text-white text-sm font-semibold uppercase tracking-wider relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Mobile Menu Icon */}
        <button className="md:hidden p-3 hover:bg-zinc-800 transition">
          <Menu className="w-6 h-6" />
        </button>

        {/* Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-8">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              href={category.href}
              className="flex items-center gap-1 px-3 py-4 hover:text-shopOrange transition-colors"
            >
              {category.name}
              {category.hasDrop && <ChevronDown className="w-3.5 h-3.5" />}
            </Link>
          ))}
          <Link 
            href="/special-offers" 
            className="px-4 py-4 ml-6 lg:ml-12 text-shopOrange bg-white/5 hover:bg-white/10 transition-colors inline-block whitespace-nowrap"
          >
            Special Offers
          </Link>
        </nav>

        {/* Highlight Banner Right */}
        <div className="hidden lg:flex px-6 py-4 bg-[#ffc107] text-black font-bold h-full items-center">
          Black Friday selected - 20% off all brands! Use code BLACKFRIDAY
        </div>

      </div>
    </div>
  );
}
