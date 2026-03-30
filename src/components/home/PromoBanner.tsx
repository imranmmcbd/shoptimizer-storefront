import Image from 'next/image';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="bg-shopDark text-white w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[400px]">
        {/* Text Content */}
        <div className="flex-1 px-8 py-16 md:px-16 flex flex-col justify-center text-left">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Offer of the week!
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-md leading-relaxed">
            Curated essentials from legendary designers. It was available at 30% off for one week only. Don't miss out on this incredible deal.
          </p>
          <div>
            <Link 
              href="/collections/offer-of-the-week" 
              className="inline-block bg-white text-shopDark font-bold px-8 py-4 hover:bg-gray-200 transition-colors shadow-sm"
            >
              Shop the collection
            </Link>
          </div>
        </div>
        
        {/* Image Content */}
        <div className="flex-1 relative w-full h-[400px] md:h-auto min-h-[400px] bg-[#2a2a2a]">
          {/* We'll use a placeholder or reuse one of the winter jackets since it resembles winter gear */}
          <Image 
            src="/winter_jackets_1774849416760.png" 
            alt="Offer of the week" 
            fill 
            className="object-cover object-top opacity-90 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
          />
        </div>
      </div>
    </section>
  );
}
