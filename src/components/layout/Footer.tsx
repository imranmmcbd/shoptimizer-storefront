import Link from 'next/link';
import { Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-shopDark text-gray-300 w-full pt-16 pb-8 border-t-[8px] border-shopOrange">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Activity className="w-8 h-8 text-shopOrange" />
            <span className="text-2xl font-black tracking-tight uppercase text-white">Shoptimizer</span>
          </Link>
          <p className="text-sm leading-relaxed mb-6">
            We offer the best prices on the most premium products. Your ultimate e-commerce destination.
          </p>
          <div className="flex items-center gap-4 text-sm font-semibold text-white">
            <div className="flex flex-col">
              <span className="text-gray-400 font-normal">Got questions? Call us 24/7!</span>
              +1 (380) 123-4567
            </div>
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Information</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href="/about" className="hover:text-shopOrange transition-colors">About Us</Link></li>
            <li><Link href="/delivery" className="hover:text-shopOrange transition-colors">Delivery Information</Link></li>
            <li><Link href="/privacy" className="hover:text-shopOrange transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-shopOrange transition-colors">Terms & Conditions</Link></li>
            <li><Link href="/contact" className="hover:text-shopOrange transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Customer Service</h4>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href="/shipping" className="hover:text-shopOrange transition-colors">Shipping Returns</Link></li>
            <li><Link href="/secure-shopping" className="hover:text-shopOrange transition-colors">Secure Shopping</Link></li>
            <li><Link href="/international" className="hover:text-shopOrange transition-colors">International Shipping</Link></li>
            <li><Link href="/affiliates" className="hover:text-shopOrange transition-colors">Affiliates</Link></li>
            <li><Link href="/contact" className="hover:text-shopOrange transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">In the Know</h4>
          <p className="text-sm mb-4">Promotions, new products and sales. Directly to your inbox.</p>
          <form className="flex border border-gray-600 rounded-sm overflow-hidden focus-within:border-shopOrange transition-colors">
            <input 
              type="email" 
              placeholder="Your email" 
              className="flex-1 bg-transparent px-4 py-3 outline-none text-white text-sm"
            />
            <button className="bg-shopOrange text-white px-4 font-bold text-sm hover:bg-orange-600 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
        <p>© 2026 Shoptimizer Storefront. Built entirely with Next.js.</p>
        <div className="flex items-center gap-2">
           <span className="font-medium">Secure Payments via</span>
           {/* Mock payment icons */}
           <div className="flex gap-2 text-xl font-bold italic tracking-tighter text-gray-300">
             <span className="px-2 py-1 bg-white hover:opacity-80 rounded-sm text-blue-800 shadow-sm border border-gray-200">VISA</span>
             <span className="px-2 py-1 bg-white hover:opacity-80 rounded-sm text-red-500 shadow-sm border border-gray-200">MC</span>
             <span className="px-2 py-1 bg-white hover:opacity-80 rounded-sm text-blue-500 shadow-sm border border-gray-200">AMEX</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
