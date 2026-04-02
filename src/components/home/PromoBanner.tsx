import Image from 'next/image';
import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="bg-white border-t border-shopBorder w-full py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-shopDark mb-3">Offer of the week!</h2>
          <p className="text-shopMuted text-sm max-w-lg mx-auto leading-relaxed">
            Outdoor essentials from legendary designer available at 25% off for one week only. Don't miss out on this incredible deal!
          </p>
        </div>

        {/* Content Row */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          
          {/* Image */}
          <div className="w-full md:w-1/2 relative aspect-[3/4] max-w-xs mx-auto md:mx-0 overflow-hidden bg-shopGray">
            <Image
              src="/winter_jackets_1774849416760.png"
              alt="Offer of the week"
              fill
              className="object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 flex flex-col gap-5">
            <div className="inline-block bg-shopOrange text-white text-xs font-semibold px-3 py-1.5 uppercase tracking-wider w-fit">
              This week only
            </div>
            <h3 className="text-3xl font-bold text-shopDark leading-tight">
              25% off outdoor essentials
            </h3>
            <p className="text-shopMuted text-sm leading-relaxed max-w-sm">
              Curated essentials from legendary designers. Available at 25% off for one week only. Don't miss out on this incredible deal.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/collections/offer-of-the-week"
                className="inline-flex items-center justify-center px-7 py-3 bg-shopOrange text-white text-xs font-semibold uppercase tracking-wider hover:bg-orange-600 transition-colors"
              >
                Browse the collection
              </Link>
              <Link
                href="/shop"
                className="text-xs font-semibold text-shopDark uppercase tracking-wider underline underline-offset-4 hover:text-shopOrange transition-colors"
              >
                View all
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}