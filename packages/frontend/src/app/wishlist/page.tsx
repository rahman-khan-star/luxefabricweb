"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function WishlistPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("wishlist");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-brand-900 mb-8">My Wishlist</h1>
        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link href="/shop" className="px-6 py-3 bg-brand-500 text-white rounded-full font-medium">Explore Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item: any) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-brand-600 font-bold mt-1">Rs {item.price}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium">Add to Bag</button>
                    <button className="p-2 border rounded-lg hover:bg-red-50 text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
