import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="flex text-sm text-zinc-500 mb-6 py-4 px-4 lg:px-0">
      <Link href="/" className="hover:text-shopOrange transition-colors">Home</Link>
      <ChevronRight className="w-4 h-4 mx-2 text-zinc-400 mt-[2px]" />
      <Link href="/products" className="hover:text-shopOrange transition-colors">Products</Link>
      <ChevronRight className="w-4 h-4 mx-2 text-zinc-400 mt-[2px]" />
      <span className="text-zinc-800 dark:text-zinc-200 font-medium">{title}</span>
    </nav>
  );
}
