import Image from 'next/image';
import Link from 'next/link';

export default function HeroBanner() {
  return (
    <section className="relative w-full bg-[#f2ecfc] overflow-hidden min-h-[500px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero_banner_image_1774849348624.png" 
          alt="Campaign Hero Banner" 
          fill
          priority
          className="object-cover object-right md:object-center opacity-80"
        />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 py-20 flex flex-col items-start text-left">
        <h1 className="text-5xl md:text-7xl font-black text-shopDark mb-4 max-w-lg leading-tight">
          Up to 50% off!
        </h1>
        <p className="text-lg md:text-xl text-gray-800 font-medium mb-8 max-w-md">
          Don't miss out on some very special items at extraordinary sale prices. Time is almost over!
        </p>
        <Link 
          href="/special-offers" 
          className="inline-flex items-center justify-center px-8 py-4 bg-shopGreen text-white font-bold text-lg hover:bg-green-600 transition-colors hover:shadow-lg transform hover:-translate-y-1"
        >
          Pick up a bargain
        </Link>
        <p className="mt-4 text-sm text-gray-700 font-medium tracking-wide">
          Limited time offer only.
        </p>
      </div>
    </section>
  );
}
