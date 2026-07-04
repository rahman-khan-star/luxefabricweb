"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Search, User, Menu, X, Heart } from "lucide-react";
import { useCartStore } from "@/lib/store";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=men", label: "Men" },
  { href: "/shop?category=women", label: "Women" },
  { href: "/shop?category=kids", label: "Kids" },
  { href: "/shop?sort=newest", label: "New Arrivals" },
  { href: "/shop?sort=bestsellers", label: "Best Sellers" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleCart = useCartStore((s) => s.toggleCart);
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-2xl font-bold text-brand-900">Luxe</span>
              <span className="font-display text-2xl font-light text-brand-500">Fabrics</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Search className="w-5 h-5" />
              </button>
              <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                <Heart className="w-5 h-5" />
              </Link>
              <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                <User className="w-5 h-5" />
              </Link>
              <button onClick={toggleCart} className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
              <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden p-2 hover:bg-gray-100 rounded-full">
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isSearchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="border-t bg-white overflow-hidden">
              <div className="max-w-3xl mx-auto px-4 py-4">
                <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/shop?search=${searchQuery}`; }}
                  className="flex gap-3">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search fabrics, categories, brands..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
                    autoFocus />
                  <button type="submit" className="px-6 py-3 bg-brand-500 text-white rounded-xl font-medium hover:bg-brand-600 transition-colors">
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMobileOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
              className="lg:hidden border-t bg-white overflow-hidden">
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-brand-50 hover:text-brand-600 rounded-lg font-medium transition-colors">
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t mt-2 flex gap-2">
                  <Link href="/account" onClick={() => setIsMobileOpen(false)} className="flex-1 text-center px-4 py-3 bg-gray-100 rounded-lg font-medium">Account</Link>
                  <Link href="/wishlist" onClick={() => setIsMobileOpen(false)} className="flex-1 text-center px-4 py-3 bg-gray-100 rounded-lg font-medium">Wishlist</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
      <div className="h-16" />
    </>
  );
}
