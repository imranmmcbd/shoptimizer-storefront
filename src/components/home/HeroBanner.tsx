import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#f9f3e8] overflow-hidden min-h-[520px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero_banner_image_1774849348624.png"
          alt="Campaign Hero Banner"
          fill
          priority
          className="object-cover object-right md:object-center"
        />
        {/* Light overlay for text readability */}
        <div className="absolute inset-0 bg-white/30" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-20 flex flex-col items-start text-left">
        
        {/* Flash sale badge */}
        <div className="bg-shopOrange text-white text-xs font-semibold px-3 py-1.5 mb-5 uppercase tracking-wider">
          Flash sale unlocked ⚡ 25% off with code "SUMMER"
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-shopDark mb-4 max-w-lg leading-tight">
          Up to 50% off!
        </h1>
        
        <p className="text-base md:text-lg text-gray-700 font-normal mb-2 max-w-md leading-relaxed">
          Don't miss out on some very special items at <strong>extraordinary</strong> sale prices. For a limited time!
        </p>

        <p className="text-sm text-gray-500 mb-8">With code: SUMMERSALE</p>

        <Link
          href="/special-offers"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-shopOrange text-white font-semibold text-sm uppercase tracking-wider hover:bg-orange-600 transition-colors"
        >
          Pick up a bargain →
        </Link>
      </div>
    </section>
  );
}