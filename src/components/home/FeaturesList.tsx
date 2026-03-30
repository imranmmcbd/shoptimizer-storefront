import { Lightbulb, MessagesSquare, ShoppingCart } from 'lucide-react';

export default function FeaturesList() {
  const features = [
    {
      icon: Lightbulb,
      title: "Smart features",
      desc: "Take advantage of headless performance so you can deliver personalized items contextually and fast with out-of-the-box convenience or speed."
    },
    {
      icon: MessagesSquare,
      title: "Only best top support",
      desc: "Our customer support is second to none. We've thought of all the features you'll ever need to run a successful store."
    },
    {
      icon: ShoppingCart,
      title: "Secure checkout",
      desc: "With 128-bit SSL security with advanced encryption you are guaranteed that your purchases are safe."
    }
  ];

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 border-y border-gray-100 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-black text-shopDark dark:text-white mb-2">Why Shoptimizer?</h2>
        <p className="text-gray-500 mb-12 max-w-2xl mx-auto">
          We believe in truth and clarity. That's why we've put together some great reasons to shop with us.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center items-start">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="mb-6 relative">
                <feature.icon className="w-12 h-12 text-shopDark dark:text-gray-200" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
