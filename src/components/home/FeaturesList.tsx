import { Lightbulb, MessagesSquare, ShoppingCart } from 'lucide-react';

export default function FeaturesList() {
  const features = [
    {
      icon: Lightbulb,
      title: "Smart ideas",
      desc: "With dozens of intelligent concepts, you'll find what you're looking for in our store, and it will be unique and personalized to match."
    },
    {
      icon: MessagesSquare,
      title: "Outstanding support",
      desc: "Our customer support is second to none – users rave about how we don't rest until every issue is solved to their satisfaction."
    },
    {
      icon: ShoppingCart,
      title: "Secure checkout",
      desc: "With 128-bit SSL security with advanced encryption you are guaranteed that your purchases are safe."
    }
  ];

  return (
    <section className="bg-white py-16 border-t border-shopBorder">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        <h2 className="text-2xl font-bold text-shopDark mb-3">Why Shoptimizer?</h2>
        <p className="text-shopMuted mb-12 max-w-xl mx-auto text-sm leading-relaxed">
          We believe in easy access to things that are good for our mind, body and spirit. With a clever offering, superb support and a secure checkout you're in good hands.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center px-4">
              <div className="mb-5 w-16 h-16 flex items-center justify-center border border-shopBorder rounded-full">
                <feature.icon className="w-7 h-7 text-shopOrange" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-shopDark mb-2">{feature.title}</h3>
              <p className="text-shopMuted text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}