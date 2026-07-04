"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, ArrowRight } from "lucide-react";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full mx-4 bg-white rounded-2xl p-8 shadow-sm text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        </motion.div>
        <h1 className="text-2xl font-display font-bold text-brand-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-500 mb-6">Thank you for your purchase. We&apos;ll send you updates on your order.</p>

        {orderNumber && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-mono font-bold text-lg">{orderNumber}</p>
          </div>
        )}

        <div className="space-y-3 mb-8">
          {[
            { icon: CheckCircle, label: "Order Confirmed", desc: "We've received your order", color: "text-green-500" },
            { icon: Package, label: "Processing", desc: "Your fabric is being prepared", color: "text-blue-500" },
            { icon: Truck, label: "Shipped", desc: "On its way to you", color: "text-purple-500" },
          ].map((step, i) => (
            <div key={step.label} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <step.icon className={`w-6 h-6 ${step.color} ${i === 0 ? "" : "opacity-40"}`} />
              <div className="text-left">
                <p className={`font-medium text-sm ${i === 0 ? "" : "text-gray-400"}`}>{step.label}</p>
                <p className="text-xs text-gray-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/account" className="w-full py-3 bg-brand-500 text-white rounded-full font-medium hover:bg-brand-600 transition-colors flex items-center justify-center gap-2">
            View My Orders <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/shop" className="w-full py-3 border rounded-full font-medium hover:bg-gray-50 transition-colors">
            Continue Shopping
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
