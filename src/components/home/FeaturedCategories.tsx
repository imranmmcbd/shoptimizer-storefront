import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedCategories() {
  const categories = [
    {
      title: "Men's Shirts",
      subtitle: "from $40",
      link: "/category/men/shirts",
      image: "/mens_shirts_1774849380327.png"
    },
    {
      title: "Holiday Style",
      subtitle: "from $50",
      link: "/category/holiday",
      image: "/holiday_style_1774849398918.png"
    },
    {
      title: "Winter Jackets",
      subtitle: "from $60",
      link: "/category/winter",
      image: "/winter_jackets_1774849416760.png"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category, idx) => (
          <div key={idx} className="relative group overflow-hidden bg-shopGray min-h-[280px] flex items-end">
            
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 p-6 w-full">
              <p className="text-white/80 text-xs font-medium uppercase tracking-widest mb-1">
                {category.subtitle}
              </p>
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                {category.title}
              </h3>
              <Link
                href={category.link}
                className="inline-flex items-center text-white text-xs font-semibold uppercase tracking-wider border border-white px-4 py-2 hover:bg-white hover:text-shopDark transition-colors duration-200"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}