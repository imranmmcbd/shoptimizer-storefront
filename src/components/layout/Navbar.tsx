"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop", hasDrop: true },
    { name: "Men", href: "/category/men", hasDrop: true },
    { name: "Women", href: "/category/women", hasDrop: true },
    { name: "Pages", href: "/pages", hasDrop: true },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      <div className="bg-white border-b border-shopBorder text-sm relative">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden p-3 hover:text-shopOrange transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex items-center gap-1 px-4 py-3.5 text-shopText hover:text-shopOrange transition-colors font-medium"
              >
                {category.name}
                {category.hasDrop && <ChevronDown className="w-3 h-3" />}
              </Link>
            ))}
          </nav>

          {/* Promo Banner Right */}
          <div className="hidden lg:flex items-center px-5 py-3.5 bg-shopOrange text-white text-xs font-semibold whitespace-nowrap">
            Flash sale ⚡ 25% off with code "SUMMER"
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-shopBorder z-40">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-6 py-3 text-shopText hover:text-shopOrange hover:bg-shopGray transition-colors border-b border-shopBorder text-sm font-medium"
            >
              {category.name}
              {category.hasDrop && <ChevronDown className="w-3.5 h-3.5" />}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}