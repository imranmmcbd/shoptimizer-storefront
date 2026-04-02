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
    <section className="w-full px-3 md:max-w-7xl md:mx-auto md:px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        {categories.map((category, idx) => (
          <div key={idx} className="relative group overflow-hidden bg-gray-200 aspect-[4/3] flex items-end">
            <div className="absolute inset-0 z-0">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            <div className="relative z-10 p-5 w-full">
              <p className="text-white/70 text-xs font-medium uppercase tracking-widest mb-1">
                {category.subtitle}
              </p>
              <h3 className="text-lg font-bold text-white mb-3 leading-tight">
                {category.title}
              </h3>
              <Link
                href={category.link}
                className="inline-flex items-center text-white text-xs font-semibold uppercase tracking-wider border border-white px-5 py-1.5 hover:bg-white hover:text-shopDark transition-colors duration-200 w-fit"
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