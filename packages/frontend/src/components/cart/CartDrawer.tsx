"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + (i.variant ? parseFloat(i.variant.price) * i.quantity : 0), 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50" onClick={toggleCart} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-display text-xl font-bold">Shopping Bag ({totalItems})</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Your bag is empty</p>
                  <Link href="/shop" onClick={toggleCart} className="inline-block px-6 py-3 bg-brand-500 text-white rounded-full font-medium hover:bg-brand-600 transition-colors">
                    Start Shopping
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                    <div className="w-20 h-24 bg-gray-100 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.product?.name || "Product"}</h3>
                      <p className="text-xs text-gray-500">{item.variant?.size && `Size: ${item.variant.size}`} {item.variant?.color && `| Color: ${item.variant.color}`}</p>
                      <p className="text-sm font-bold mt-1">Rs {item.variant?.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="w-7 h-7 border rounded-full flex items-center justify-center hover:bg-gray-50"><Minus className="w-3 h-3" /></button>
                        <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="w-7 h-7 border rounded-full flex items-center justify-center hover:bg-gray-50"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                    <button onClick={() => removeItem(item.variantId)} className="text-gray-400 hover:text-red-500 self-start">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t bg-gray-50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">Rs {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">{subtotal >= 5000 ? "Free" : "Rs 200"}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>Rs {(subtotal + (subtotal >= 5000 ? 0 : 200)).toLocaleString()}</span>
                </div>
                <Link href="/checkout" onClick={toggleCart}
                  className="block w-full py-4 bg-brand-500 text-white text-center rounded-full font-bold hover:bg-brand-600 transition-colors">
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
