"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from "lucide-react";
import { getProducts } from "@/lib/mock-data";
import type { Product } from "@/types";

const filterSections = {
  categories: [
    { id: "silk", label: "Silk & Satin" },
    { id: "cotton", label: "Cotton & Linen" },
    { id: "velvet", label: "Velvet" },
    { id: "chiffon", label: "Chiffon" },
    { id: "organza", label: "Organza" },
    { id: "georgette", label: "Georgette" },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL", "Custom"],
  colors: [
    { id: "black", label: "Black", hex: "#000000" },
    { id: "white", label: "White", hex: "#FFFFFF" },
    { id: "red", label: "Red", hex: "#EF4444" },
    { id: "blue", label: "Blue", hex: "#3B82F6" },
    { id: "green", label: "Green", hex: "#10B981" },
    { id: "gold", label: "Gold", hex: "#D4A76A" },
    { id: "maroon", label: "Maroon", hex: "#7F1D1D" },
    { id: "navy", label: "Navy", hex: "#1E3A5F" },
  ],
  priceRanges: [
    { label: "Under Rs 3,000", min: "0", max: "3000" },
    { label: "Rs 3,000 - 5,000", min: "3000", max: "5000" },
    { label: "Rs 5,000 - 10,000", min: "5000", max: "10000" },
    { label: "Above Rs 10,000", min: "10000", max: "" },
  ],
  sortOptions: [
    { value: "newest", label: "Newest First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "bestsellers", label: "Best Sellers" },
    { value: "rating", label: "Top Rated" },
  ],
};

export default function ShopPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    categoryId: searchParams.get("category") || "",
    minPrice: "",
    maxPrice: "",
    size: "",
    color: "",
    sort: searchParams.get("sort") || "newest",
    page: 1,
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (filters.search) params.search = filters.search;
      if (filters.categoryId) params.categoryId = filters.categoryId;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.size) params.size = filters.size;
      if (filters.color) params.color = filters.color;
      params.sortBy = filters.sort === "price_asc" || filters.sort === "price_desc" ? "price" : filters.sort;
      params.sortOrder = filters.sort === "price_asc" ? "asc" : "desc";
      params.page = filters.page.toString();
      params.limit = "12";
      params.isPublished = "true";

      const result = getProducts(params);
      setProducts(result.products || []);
      setTotal(result.pagination?.total || 0);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ search: "", categoryId: "", minPrice: "", maxPrice: "", size: "", color: "", sort: "newest", page: 1 });
  };

  const activeFilterCount = [filters.categoryId, filters.minPrice, filters.size, filters.color].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="text-sm text-gray-500">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">Shop</span>
        </nav>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-brand-900">
          {filters.search ? `Results for "${filters.search}"` : "All Fabrics"}
        </h1>
        <p className="text-gray-500 mt-1">{total} products found</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-64 flex-shrink-0`}>
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                {activeFilterCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-brand-500 hover:text-brand-600">Clear all</button>
                )}
              </div>

              {/* Category */}
              <div>
                <h4 className="font-medium text-sm mb-3">Category</h4>
                <div className="space-y-2">
                  {filterSections.categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="category" checked={filters.categoryId === cat.id}
                        onChange={() => updateFilter("categoryId", filters.categoryId === cat.id ? "" : cat.id)}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500" />
                      <span className="text-sm text-gray-600">{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="font-medium text-sm mb-3">Price Range</h4>
                <div className="space-y-2">
                  {filterSections.priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="price" checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                        onChange={() => { updateFilter("minPrice", range.min); updateFilter("maxPrice", range.max); }}
                        className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500" />
                      <span className="text-sm text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <h4 className="font-medium text-sm mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                  {filterSections.sizes.map((size) => (
                    <button key={size} onClick={() => updateFilter("size", filters.size === size ? "" : size)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                        filters.size === size ? "bg-brand-500 text-white border-brand-500" : "border-gray-200 text-gray-600 hover:border-brand-300"
                      }`}>{size}</button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <h4 className="font-medium text-sm mb-3">Color</h4>
                <div className="flex flex-wrap gap-2">
                  {filterSections.colors.map((color) => (
                    <button key={color.id} onClick={() => updateFilter("color", filters.color === color.id ? "" : color.id)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        filters.color === color.id ? "border-brand-500 scale-110" : "border-gray-200 hover:border-gray-400"
                      }`} style={{ backgroundColor: color.hex }}
                      title={color.label} />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-4 py-2 border rounded-lg text-sm">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                  {activeFilterCount > 0 && <span className="w-5 h-5 bg-brand-500 text-white text-xs rounded-full">{activeFilterCount}</span>}
                </button>
                <select value={filters.sort} onChange={(e) => updateFilter("sort", e.target.value)}
                  className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
                  {filterSections.sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === "grid" ? "bg-gray-100" : ""}`}><Grid3X3 className="w-4 h-4" /></button>
                <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === "list" ? "bg-gray-100" : ""}`}><LayoutList className="w-4 h-4" /></button>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.categoryId && <FilterChip label={filterSections.categories.find(c => c.id === filters.categoryId)?.label || ""} onRemove={() => updateFilter("categoryId", "")} />}
                {filters.size && <FilterChip label={`Size: ${filters.size}`} onRemove={() => updateFilter("size", "")} />}
                {filters.color && <FilterChip label={`Color: ${filterSections.colors.find(c => c.id === filters.color)?.label || ""}`} onRemove={() => updateFilter("color", "")} />}
              </div>
            )}

            {/* Product Grid */}
            {loading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-72 rounded-2xl mb-3" />
                    <div className="bg-gray-200 h-4 rounded w-1/3 mb-2" />
                    <div className="bg-gray-200 h-5 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg mb-4">No products found</p>
                <button onClick={clearFilters} className="px-6 py-3 bg-brand-500 text-white rounded-full font-medium hover:bg-brand-600 transition-colors">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
                {products.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <Link href={`/product/${p.slug}`} className="group block bg-white rounded-2xl overflow-hidden border hover:shadow-lg transition-all duration-300">
                      <div className={`relative overflow-hidden ${viewMode === "grid" ? "h-64" : "h-48"}`}>
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${p.images?.[0]?.url || "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=600&fit=crop"})` }} />
                      </div>
                      <div className="p-4">
                        <span className="text-xs font-medium text-brand-500 uppercase">{p.category?.name}</span>
                        <h3 className="font-medium text-brand-900 mt-1 group-hover:text-brand-600 transition-colors">{p.name}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-bold">Rs {parseFloat(p.price).toLocaleString()}</span>
                          {p.compareAt && <span className="text-sm text-gray-400 line-through">Rs {parseFloat(p.compareAt).toLocaleString()}</span>}
                        </div>
                        {p.variants && p.variants.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {[...new Set(p.variants.filter(v => v.colorHex).map(v => v.colorHex))].slice(0, 5).map((hex, j) => (
                              <div key={j} className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: hex || "#ccc" }} />
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {total > 12 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: Math.ceil(total / 12) }).map((_, i) => (
                  <button key={i} onClick={() => setFilters(prev => ({ ...prev, page: i + 1 }))}
                    className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                      filters.page === i + 1 ? "bg-brand-500 text-white" : "border hover:bg-gray-50"
                    }`}>{i + 1}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-50 text-brand-700 rounded-full text-sm font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-brand-900"><X className="w-3 h-3" /></button>
    </span>
  );
}
