import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-white border-t border-shopBorder w-full">

      {/* Trust Badges Bar */}
      <div className="border-b border-shopBorder">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "✈", title: "Free worldwide shipping", desc: "On all orders above $50" },
            { icon: "↩", title: "Easy 30 days returns", desc: "30 days money back guarantee" },
            { icon: "🌐", title: "International Warranty", desc: "Offered in the country of usage" },
            { icon: "🔒", title: "100% Secure Checkout", desc: "PayPal / MasterCard / Visa" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-shopOrange text-xl">{item.icon}</span>
              <div>
                <p className="text-xs font-semibold text-shopDark">{item.title}</p>
                <p className="text-xs text-shopMuted">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link href="/" className="block mb-4">
            <span className="text-xl font-bold text-shopDark">Shoptimizer</span>
          </Link>
          <p className="text-xs text-shopMuted leading-relaxed mb-5">
            We offer the best prices on the most premium products. Your ultimate e-commerce destination.
          </p>
          <p className="text-xs text-shopMuted mb-1">Got questions? Call us 24/7!</p>
          <a href="tel:+13801234567" className="text-sm font-semibold text-shopDark hover:text-shopOrange transition-colors">
            +1 (380) 123-4567
          </a>
        </div>

        {/* About */}
        <div>
          <h4 className="text-xs font-semibold text-shopDark uppercase tracking-wider mb-4">About</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Company", href: "/about" },
              { label: "Orders", href: "/account" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Gift Cards", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-xs text-shopMuted hover:text-shopOrange transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-xs font-semibold text-shopDark uppercase tracking-wider mb-4">Help</h4>
          <ul className="space-y-2.5">
            {[
              { label: "My Account", href: "/account" },
              { label: "Customer Help", href: "/contact" },
              { label: "Contact Us", href: "/contact" },
              { label: "Terms and Conditions", href: "/terms" },
              { label: "FAQ", href: "#" },
            ].map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-xs text-shopMuted hover:text-shopOrange transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-xs font-semibold text-shopDark uppercase tracking-wider mb-4">Newsletter</h4>
          <p className="text-xs text-shopMuted mb-4 leading-relaxed">
            Promotions, new products and sales. Directly to your inbox.
          </p>
          <form className="flex border border-shopBorder overflow-hidden hover:border-gray-400 transition-colors">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-3 py-2.5 outline-none text-xs text-shopText placeholder:text-shopMuted bg-white"
            />
            <button className="bg-shopOrange text-white px-4 text-xs font-semibold hover:bg-orange-600 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>

          {/* Social */}
          <div className="mt-6">
            <h4 className="text-xs font-semibold text-shopDark uppercase tracking-wider mb-3">Follow</h4>
            <div className="flex gap-3">
              {["Facebook", "Twitter", "Instagram", "Pinterest"].map((s) => (
                <a key={s} href="#" className="text-xs text-shopMuted hover:text-shopOrange transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-shopBorder">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-shopMuted">
          <p>© 2026 Shoptimizer. Built entirely with Next.js.</p>
          <div className="flex items-center gap-2">
            <span>Secure Payments via</span>
            <div className="flex gap-1.5">
              {["VISA", "MC", "AMEX"].map((card) => (
                <span key={card} className="px-2 py-0.5 border border-shopBorder text-shopDark font-semibold text-[10px]">
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
}