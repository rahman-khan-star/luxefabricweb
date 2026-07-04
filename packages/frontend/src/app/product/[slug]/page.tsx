"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react";
import { getProductBySlug } from "@/lib/mock-data";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/types";
import toast from "react-hot-toast";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = getProductBySlug(params.slug as string);
        if (data) {
          setProduct(data);
          if (data.variants?.length > 0) {
            setSelectedVariant(data.variants[0]);
            setSelectedSize(data.variants[0].size || "");
            setSelectedColor(data.variants[0].color || "");
          }
        } else {
          setProduct(null);
        }
      } catch { setProduct(null); } finally { setLoading(false); }
    };
    fetchProduct();
  }, [params.slug]);

  useEffect(() => {
    if (!product) return;
    const variant = product.variants?.find((v) =>
      (!selectedSize || v.size === selectedSize) && (!selectedColor || v.color === selectedColor)
    );
    if (variant) setSelectedVariant(variant);
  }, [selectedSize, selectedColor, product]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) { toast.error("Please select size and color"); return; }
    addItem(product, selectedVariant, quantity);
    toast.success("Added to bag!");
  };

  const sizes = [...new Set(product?.variants?.map((v) => v.size).filter(Boolean))];
  const colors = [...new Map(product?.variants?.filter((v) => v.color).map((v) => [v.color, v])).values()];

  const avgRating = product?.reviews?.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full" /></div>;

  if (!product) return <div className="min-h-screen flex items-center justify-center"><p>Product not found</p></div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-brand-600">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={`/shop?category=${product.category?.slug}`} className="hover:text-brand-600">{product.category?.name}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden mb-4">
              <div className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${product.images?.[activeImage]?.url || product.images?.[0]?.url || "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1000&fit=crop"})` }} />
            </motion.div>
            <div className="grid grid-cols-4 gap-3">
              {product.images?.map((img, i) => (
                <button key={img.id} onClick={() => setActiveImage(i)}
                  className={`aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === i ? "border-brand-500" : "border-transparent hover:border-gray-300"
                  }`}>
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${img.url})` }} />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span className="text-sm font-medium text-brand-500 uppercase">{product.category?.name}</span>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-brand-900 mt-2 mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(avgRating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product._count?.reviews || 0} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-brand-900">Rs {parseFloat(selectedVariant?.price || product.price).toLocaleString()}</span>
              {selectedVariant?.compareAt && (
                <span className="text-lg text-gray-400 line-through">Rs {parseFloat(selectedVariant.compareAt).toLocaleString()}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            {/* Sizes */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-sm mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={`min-w-[3rem] px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        selectedSize === size ? "border-brand-500 bg-brand-50 text-brand-700" : "border-gray-200 hover:border-gray-400"
                      }`}>{size}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {colors.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-sm mb-3">Color: {selectedColor || "Select"}</h3>
                <div className="flex flex-wrap gap-2">
                  {colors.map((v) => (
                    <button key={v.id} onClick={() => setSelectedColor(v.color || "")}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === v.color ? "border-brand-500 scale-110" : "border-gray-200 hover:border-gray-400"
                      }`} style={{ backgroundColor: v.colorHex || "#ccc" }} title={v.color || ""} />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-50"><Minus className="w-4 h-4" /></button>
                <span className="px-4 font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
              </div>
              <button onClick={handleAddToCart}
                className="flex-1 py-4 bg-brand-500 text-white rounded-full font-bold hover:bg-brand-600 transition-all hover:shadow-lg flex items-center justify-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Add to Bag
              </button>
              <button className="p-4 border rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b">
              {[
                { icon: <Truck className="w-5 h-5" />, label: "Free Shipping", sub: "Over Rs 5,000" },
                { icon: <Shield className="w-5 h-5" />, label: "Quality Assured", sub: "12-point check" },
                { icon: <RotateCcw className="w-5 h-5" />, label: "Easy Returns", sub: "7-day policy" },
              ].map((f) => (
                <div key={f.label} className="text-center">
                  <div className="flex justify-center text-brand-500 mb-1">{f.icon}</div>
                  <div className="text-xs font-medium">{f.label}</div>
                  <div className="text-xs text-gray-400">{f.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-bold mb-8">Customer Reviews</h2>
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="p-6 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-700 font-bold text-sm">
                      {review.user?.name?.[0] || "U"}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{review.user?.name}</div>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  {review.title && <h4 className="font-medium mb-1">{review.title}</h4>}
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
