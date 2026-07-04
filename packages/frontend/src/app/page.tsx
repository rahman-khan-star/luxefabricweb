"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { name: "Silk & Satin", slug: "silk", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", count: "120+" },
  { name: "Cotton & Linen", slug: "cotton", image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&h=400&fit=crop", count: "200+" },
  { name: "Velvet", slug: "velvet", image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&h=400&fit=crop", count: "80+" },
  { name: "Chiffon", slug: "chiffon", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop", count: "95+" },
];

const featuredProducts = [
  { name: "Royal Silk Organza", slug: "royal-silk-organza", price: "8,999", compareAt: "12,999", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=600&fit=crop", badge: "Bestseller", category: "Silk" },
  { name: "Heritage Linen Blend", slug: "heritage-linen", price: "5,499", image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=500&h=600&fit=crop", badge: "New", category: "Linen" },
  { name: "Midnight Velvet", slug: "midnight-velvet", price: "7,250", image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=500&h=600&fit=crop", category: "Velvet" },
  { name: "Cloud Cotton Voile", slug: "cloud-cotton", price: "3,499", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&h=600&fit=crop", badge: "Popular", category: "Cotton" },
  { name: "Emperor Brocade", slug: "emperor-brocade", price: "12,999", compareAt: "18,999", image: "https://images.unsplash.com/photo-1553697388-94e804e2de0e?w=500&h=600&fit=crop", badge: "Premium", category: "Silk" },
  { name: "Breeze Chiffon", slug: "breeze-chiffon", price: "4,499", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500&h=600&fit=crop", category: "Chiffon" },
];

const features = [
  { icon: "🚚", title: "Free Shipping", desc: "On orders over Rs 5,000" },
  { icon: "✅", title: "Quality Guaranteed", desc: "12-point quality check" },
  { icon: "🔄", title: "Easy Returns", desc: "7-day return policy" },
  { icon: "💬", title: "24/7 Support", desc: "WhatsApp & phone support" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center hero-gradient overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-20" />
        <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-24 right-[15%] w-40 h-40 bg-white/5 rounded-2xl rotate-12" />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 right-[30%] w-28 h-28 bg-white/5 rounded-xl -rotate-6" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-brand-200 text-sm font-medium border border-white/10 mb-6">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              Premium Quality Since 1985
            </span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
              Where Elegance<br />Meets <span className="text-brand-300">Texture</span>
            </h1>
            <p className="text-lg text-brand-100/80 max-w-lg mb-8 leading-relaxed">
              Discover our curated collection of world-class fabrics. From luxurious silks to organic cottons — crafted for designers, loved by everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop" className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 text-white rounded-full font-semibold hover:bg-brand-600 transition-all hover:shadow-xl hover:shadow-brand-500/25">
                Explore Collection →
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/20 text-white rounded-full font-semibold hover:bg-white/10 transition-all">
                Our Story
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-sm">
              {[
                { value: "500+", label: "Fabrics" },
                { value: "50K+", label: "Clients" },
                { value: "38+", label: "Years" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-display font-bold text-white">{s.value}</div>
                  <div className="text-sm text-brand-200/60">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-8 border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="flex items-center gap-3 py-3">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <div className="text-sm font-semibold">{f.title}</div>
                  <div className="text-xs text-gray-500">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">Collections</span>
            <h2 className="text-4xl font-display font-bold text-brand-900 mt-4 mb-3">Explore by Category</h2>
            <p className="text-gray-500">Find the perfect fabric for every project</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={`/shop?category=${cat.slug}`} className="group block relative h-72 rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${cat.image})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-white/70 text-xs">{cat.count}+ styles</span>
                    <h3 className="text-xl font-display font-bold text-white">{cat.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 fabric-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">Featured</span>
            <h2 className="text-4xl font-display font-bold text-brand-900 mt-4 mb-3">Handpicked for You</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((p, i) => (
              <motion.div key={p.slug} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link href={`/product/${p.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${p.image})` }} />
                    {p.badge && (
                      <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white ${
                        p.badge === "Bestseller" ? "bg-brand-500" : p.badge === "New" ? "bg-emerald-500" : p.badge === "Premium" ? "bg-amber-500" : "bg-indigo-500"
                      }`}>{p.badge}</span>
                    )}
                    <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-5 py-2.5 bg-white text-brand-900 rounded-full text-sm font-semibold">Quick View</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium text-brand-500 uppercase">{p.category}</span>
                    <h3 className="font-display font-semibold text-brand-900 mt-1 group-hover:text-brand-600 transition-colors">{p.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-brand-700">Rs {p.price}</span>
                      {p.compareAt && <span className="text-sm text-gray-400 line-through">Rs {p.compareAt}</span>}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-900 text-white rounded-full font-semibold hover:bg-brand-800 transition-all">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 fabric-pattern opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              Ready to Create Something Beautiful?
            </h2>
            <p className="text-brand-200/60 text-lg mb-8 max-w-xl mx-auto">
              Join 50,000+ designers and creators who trust Luxe Fabrics for their most important projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="px-8 py-4 bg-brand-500 text-white rounded-full font-semibold hover:bg-brand-400 transition-all">
                Shop Now
              </Link>
              <Link href="/contact" className="px-8 py-4 border-2 border-brand-400/30 text-white rounded-full font-semibold hover:bg-brand-800 transition-all">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
