"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, User, MapPin, Heart, LogOut, ChevronRight } from "lucide-react";
import { auth, orders as ordersApi } from "@/lib/api";
import type { Order, User as UserType } from "@/types";

export default function AccountPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, ordersRes] = await Promise.all([
          auth.profile(),
          ordersApi.myOrders(),
        ]);
        setUser(profileRes.data);
        setUserOrders(ordersRes.data.orders || []);
      } catch { window.location.href = "/login"; }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-indigo-100 text-indigo-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-brand-900 mb-8">My Account</h1>
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-brand-700">{user?.name?.[0] || "U"}</span>
                </div>
                <h3 className="font-semibold">{user?.name}</h3>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <nav className="space-y-1">
                {[
                  { id: "orders", label: "My Orders", icon: <Package className="w-4 h-4" /> },
                  { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
                  { id: "addresses", label: "Addresses", icon: <MapPin className="w-4 h-4" /> },
                  { id: "wishlist", label: "Wishlist", icon: <Heart className="w-4 h-4" /> },
                ].map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-50"
                    }`}>
                    {tab.icon} {tab.label}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 mt-2">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">My Orders</h2>
                {userOrders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                    <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No orders yet</p>
                    <Link href="/shop" className="px-6 py-3 bg-brand-500 text-white rounded-full font-medium">Start Shopping</Link>
                  </div>
                ) : (
                  userOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-semibold">#{order.orderNumber}</p>
                          <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || "bg-gray-100"}`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{order.items?.length || 0} items</span>
                        <span className="font-bold">Rs {parseFloat(order.total).toLocaleString()}</span>
                      </div>
                      <Link href={`/order/${order.id}`} className="mt-4 flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium">
                        View Details <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Full Name" defaultValue={user?.name || ""} className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  <input placeholder="Email" defaultValue={user?.email || ""} className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                  <input placeholder="Phone" defaultValue={user?.phone || ""} className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <button className="mt-6 px-8 py-3 bg-brand-500 text-white rounded-full font-medium hover:bg-brand-600 transition-colors">Save Changes</button>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Saved Addresses</h2>
                <p className="text-gray-500">No saved addresses. Add one during checkout.</p>
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Your wishlist is empty</p>
                <Link href="/shop" className="px-6 py-3 bg-brand-500 text-white rounded-full font-medium">Explore Products</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
