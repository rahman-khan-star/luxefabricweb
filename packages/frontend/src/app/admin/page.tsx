"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, TrendingUp, DollarSign, Eye, Edit, Trash2, Plus, ChevronRight } from "lucide-react";
import { orders, products as productsApi, users as usersApi, coupons as couponsApi } from "@/lib/api";
import type { Order, Product, User, Coupon } from "@/types";

type Tab = "overview" | "products" | "orders" | "customers" | "coupons";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalCustomers: 0 });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allCoupons, setAllCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const [ordersRes, productsRes, usersRes, couponsRes] = await Promise.allSettled([
          orders.all(1),
          productsApi.list({ limit: "50", isPublished: "true" }),
          usersApi.list(1),
          couponsApi.list(),
        ]);

        if (ordersRes.status === "fulfilled") {
          const o = ordersRes.value.data;
          setRecentOrders(o.orders?.slice(0, 5) || []);
          setStats((s) => ({ ...s, totalOrders: o.pagination?.total || 0 }));
        }
        if (productsRes.status === "fulfilled") {
          setAllProducts(productsRes.value.data.products || []);
          setStats((s) => ({ ...s, totalProducts: productsRes.value.data.pagination?.total || 0 }));
        }
        if (usersRes.status === "fulfilled") {
          setAllUsers(usersRes.value.data.users || []);
          setStats((s) => ({ ...s, totalCustomers: usersRes.value.data.pagination?.total || 0 }));
        }
        if (couponsRes.status === "fulfilled") {
          setAllCoupons(couponsRes.value.data || []);
        }
      } catch {} finally { setLoading(false); }
    };
    fetchDashboard();
  }, []);

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-indigo-100 text-indigo-800",
    SHIPPED: "bg-purple-100 text-purple-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "coupons", label: "Coupons", icon: Tag },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-brand-900">Admin Dashboard</h1>
            <p className="text-gray-500">Manage your store</p>
          </div>
          <Link href="/" className="text-sm text-brand-600 hover:text-brand-700 font-medium">← Back to Store</Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl p-4 shadow-sm lg:sticky lg:top-24">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      activeTab === tab.id ? "bg-brand-50 text-brand-700" : "text-gray-600 hover:bg-gray-50"
                    }`}>
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Revenue", value: `Rs ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: "text-green-600 bg-green-50" },
                    { label: "Orders", value: stats.totalOrders, icon: ShoppingCart, color: "text-blue-600 bg-blue-50" },
                    { label: "Products", value: stats.totalProducts, icon: Package, color: "text-purple-600 bg-purple-50" },
                    { label: "Customers", value: stats.totalCustomers, icon: Users, color: "text-amber-600 bg-amber-50" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4">Recent Orders</h3>
                  <div className="space-y-3">
                    {recentOrders.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No orders yet</p>
                    ) : (
                      recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-sm">#{order.orderNumber}</p>
                            <p className="text-xs text-gray-500">{order.user?.name} • {new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || ""}`}>
                              {order.status}
                            </span>
                            <span className="font-bold text-sm">Rs {parseFloat(order.total).toLocaleString()}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Products ({allProducts.length})</h3>
                  <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add Product
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Product</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Category</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Price</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                        <th className="text-right px-6 py-3 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {allProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg" />
                              <div>
                                <p className="font-medium">{p.name}</p>
                                <p className="text-xs text-gray-500">SKU: {p.sku}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{p.category?.name}</td>
                          <td className="px-6 py-4 font-medium">Rs {parseFloat(p.price).toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${p.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                              {p.isPublished ? "Published" : "Draft"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 hover:bg-gray-100 rounded-lg"><Eye className="w-4 h-4" /></button>
                              <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4" /></button>
                              <button className="p-2 hover:bg-red-50 rounded-lg text-red-500"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-lg">All Orders</h3>
                </div>
                <div className="p-6 space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium">#{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">{order.user?.name} • {order.user?.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || ""}`}>{order.status}</span>
                        <span className="font-bold">Rs {parseFloat(order.total).toLocaleString()}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "customers" && (
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-lg">Customers ({allUsers.length})</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Customer</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Email</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Role</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Orders</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {allUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 flex items-center gap-3">
                            <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-sm">{u.name?.[0] || "U"}</div>
                            <span className="font-medium">{u.name}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{u.email}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${u.role === "ADMIN" ? "bg-purple-100 text-purple-800" : "bg-gray-100"}`}>{u.role}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{(u as any)._count?.orders || 0}</td>
                          <td className="px-6 py-4 text-gray-600">{new Date(u.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "coupons" && (
              <div className="bg-white rounded-2xl shadow-sm">
                <div className="p-6 border-b flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Coupons ({allCoupons.length})</h3>
                  <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add Coupon
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Code</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Discount</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Uses</th>
                        <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
                        <th className="text-right px-6 py-3 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {allCoupons.map((c) => (
                        <tr key={c.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-mono font-bold">{c.code}</td>
                          <td className="px-6 py-4">{c.discountType === "PERCENTAGE" ? `${c.discountValue}%` : `Rs ${c.discountValue}`}</td>
                          <td className="px-6 py-4">{c.usedCount}{c.maxUses ? `/${c.maxUses}` : ""}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${c.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                              {c.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 hover:bg-gray-100 rounded-lg"><Edit className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
