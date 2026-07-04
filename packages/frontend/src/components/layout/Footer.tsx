import Link from "next/link";

const footerLinks = {
  shop: [
    { label: "All Fabrics", href: "/shop" },
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Best Sellers", href: "/shop?sort=bestsellers" },
    { label: "Sale", href: "/shop?sale=true" },
    { label: "Gift Cards", href: "#" },
  ],
  categories: [
    { label: "Silk & Satin", href: "/shop?category=silk" },
    { label: "Cotton & Linen", href: "/shop?category=cotton" },
    { label: "Velvet", href: "/shop?category=velvet" },
    { label: "Chiffon", href: "/shop?category=chiffon" },
    { label: "Organza", href: "/shop?category=organza" },
  ],
  help: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faq" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "/blog" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="font-display text-xl font-bold">Luxe</span>
              <span className="font-display text-xl font-light text-brand-300">Fabrics</span>
            </Link>
            <p className="text-brand-300/60 text-sm mb-4">Premium fabrics for creators and designers since 1985.</p>
            <div className="flex gap-3">
              {["facebook", "instagram", "twitter"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-full bg-brand-800 flex items-center justify-center text-brand-300 hover:bg-brand-500 hover:text-white transition-all text-sm">
                  {s[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-brand-300/60 hover:text-brand-300 text-sm transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-brand-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-400/50 text-sm">&copy; {new Date().getFullYear()} Luxe Fabrics. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-brand-400/50">
            <span>We Accept:</span>
            <span className="bg-brand-800 px-2 py-1 rounded text-xs">COD</span>
            <span className="bg-brand-800 px-2 py-1 rounded text-xs">JazzCash</span>
            <span className="bg-brand-800 px-2 py-1 rounded text-xs">Easypaisa</span>
            <span className="bg-brand-800 px-2 py-1 rounded text-xs">Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
