import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="flex items-center text-sm text-shopMuted mb-6 py-4 px-4 lg:px-0">
      <Link href="/" className="hover:text-shopOrange transition-colors">Home</Link>
      <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-300 shrink-0" />
      <Link href="/shop" className="hover:text-shopOrange transition-colors">Products</Link>
    </nav>
  );
}