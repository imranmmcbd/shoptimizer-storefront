import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedCategories() {
  const categories = [
    {
      title: "Men's Shirts",
      subtitle: "New Styles",
      link: "/category/men/shirts",
      image: "/mens_shirts_1774849380327.png"
    },
    {
      title: "Holiday Style",
      subtitle: "Pack light",
      link: "/category/holiday",
      image: "/holiday_style_1774849398918.png"
    },
    {
      title: "Winter Jackets",
      subtitle: "Stay warm",
      link: "/category/winter",
      image: "/winter_jackets_1774849416760.png"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category, idx) => (
          <div key={idx} className="relative group overflow-hidden bg-gray-100 flex items-end min-h-[300px] sm:min-h-[400px]">
             {/* Background Image */}
             <div className="absolute inset-0 z-0 overflow-hidden">
               <Image 
                 src={category.image} 
                 alt={category.title} 
                 fill 
                 className="object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               {/* Gradient Overlay for text readability */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80" />
             </div>
             
             {/* Content */}
             <div className="relative z-10 p-8 w-full">
               <h3 className="text-3xl font-bold text-white mb-1 shadow-sm leading-tight">
                 {category.title}
               </h3>
               <p className="text-white/90 text-sm font-medium uppercase tracking-widest mb-4">
                 {category.subtitle}
               </p>
               <Link 
                 href={category.link} 
                 className="inline-flex bg-shopGreen text-white px-6 py-2 text-sm font-bold hover:bg-green-600 transition-colors shadow-sm"
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
