"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CreditCard, Truck, Shield, Check } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { orders, payments, coupons } from "@/lib/api";
import toast from "react-hot-toast";

const provinces = ["Punjab", "Sindh", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad", "Azad Kashmir", "Gilgit-Baltistan"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + (i.variant ? parseFloat(i.variant.price) * i.quantity : 0), 0);
  const shippingCost = subtotal >= 5000 ? 0 : 200;
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "", lastName: "", phone: "", email: "",
    address1: "", address2: "", city: "", province: "", postalCode: "",
    notes: "",
  });

  const updateForm = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const applyCoupon = async () => {
    if (!couponCode) return;
    setCouponLoading(true);
    try {
      const { data } = await coupons.validate(couponCode, subtotal);
      setDiscount(data.discount);
      toast.success(data.message);
    } catch { toast.error("Invalid coupon code"); setDiscount(0); }
    finally { setCouponLoading(false); }
  };

  const total = subtotal + shippingCost - discount;

  const handlePlaceOrder = async () => {
    if (!form.firstName || !form.phone || !form.address1 || !form.city || !form.province) {
      toast.error("Please fill all required fields"); return;
    }
    setLoading(true);
    try {
      const orderData = {
        paymentMethod,
        shippingName: `${form.firstName} ${form.lastName}`,
        shippingPhone: form.phone,
        shippingAddress: `${form.address1}${form.address2 ? ", " + form.address2 : ""}`,
        shippingCity: form.city,
        shippingProvince: form.province,
        couponCode: couponCode || undefined,
        notes: form.notes || undefined,
        items: items.map((i) => ({ productId: i.productId, variantId: i.variantId, quantity: i.quantity })),
      };

      if (paymentMethod === "STRIPE") {
        const { data: intent } = await payments.createStripeIntent(total);
        // TODO: Open Stripe checkout
      }

      const { data: order } = await orders.create(orderData);
      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/order-confirmation?order=${order.orderNumber}`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to place order");
    } finally { setLoading(false); }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Your bag is empty</p>
          <a href="/shop" className="px-6 py-3 bg-brand-500 text-white rounded-full font-medium">Start Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-brand-900 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Truck className="w-5 h-5 text-brand-500" /> Shipping Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="First Name *" value={form.firstName} onChange={(e) => updateForm("firstName", e.target.value)}
                  className="col-span-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                <input placeholder="Last Name" value={form.lastName} onChange={(e) => updateForm("lastName", e.target.value)}
                  className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                <input placeholder="Phone Number *" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)}
                  className="col-span-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                <input placeholder="Email (optional)" type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)}
                  className="col-span-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                <input placeholder="Address Line 1 *" value={form.address1} onChange={(e) => updateForm("address1", e.target.value)}
                  className="col-span-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                <input placeholder="Address Line 2 (optional)" value={form.address2} onChange={(e) => updateForm("address2", e.target.value)}
                  className="col-span-2 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                <input placeholder="City *" value={form.city} onChange={(e) => updateForm("city", e.target.value)}
                  className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                <select value={form.province} onChange={(e) => updateForm("province", e.target.value)}
                  className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-700">
                  <option value="">Province *</option>
                  {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <input placeholder="Postal Code (optional)" value={form.postalCode} onChange={(e) => updateForm("postalCode", e.target.value)}
                  className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>
              <textarea placeholder="Order notes (optional)" value={form.notes} onChange={(e) => updateForm("notes", e.target.value)} rows={3}
                className="w-full mt-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none" />
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-brand-500" /> Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: "COD", label: "Cash on Delivery", icon: "💵", desc: "Pay when you receive" },
                  { id: "JAZZCASH", label: "JazzCash", icon: "📱", desc: "Mobile wallet" },
                  { id: "EASYPAISA", label: "Easypaisa", icon: "📱", desc: "Mobile wallet" },
                  { id: "STRIPE", label: "Credit/Debit Card", icon: "💳", desc: "Visa, Mastercard" },
                ].map((pm) => (
                  <label key={pm.id} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                    paymentMethod === pm.id ? "border-brand-500 bg-brand-50" : "border-gray-200 hover:border-gray-300"
                  }`}>
                    <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id}
                      onChange={(e) => setPaymentMethod(e.target.value)} className="text-brand-500 focus:ring-brand-500" />
                    <span className="text-2xl">{pm.icon}</span>
                    <div>
                      <div className="font-medium">{pm.label}</div>
                      <div className="text-sm text-gray-500">{pm.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product?.name}</p>
                      <p className="text-xs text-gray-500">{item.variant?.size && `Size: ${item.variant.size}`} × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">Rs {item.variant ? (parseFloat(item.variant.price) * item.quantity).toLocaleString() : 0}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <input placeholder="Coupon code" value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
                <button onClick={applyCoupon} disabled={couponLoading}
                  className="px-4 py-2 border border-brand-500 text-brand-600 rounded-lg text-sm font-medium hover:bg-brand-50 disabled:opacity-50">
                  Apply
                </button>
              </div>

              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>Rs {subtotal.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{shippingCost === 0 ? "Free" : `Rs ${shippingCost}`}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-Rs {discount.toLocaleString()}</span></div>}
                <div className="flex justify-between font-bold text-lg border-t pt-3"><span>Total</span><span>Rs {total.toLocaleString()}</span></div>
              </div>

              <button onClick={handlePlaceOrder} disabled={loading}
                className="w-full mt-6 py-4 bg-brand-500 text-white rounded-full font-bold hover:bg-brand-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" /> : <><Check className="w-5 h-5" /> Place Order</>}
              </button>

              <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-400">
                <Shield className="w-4 h-4" /> Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
