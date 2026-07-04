import type { Product, Category } from "@/types";

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Silk & Satin", slug: "silk", description: "Luxurious silk and satin fabrics", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", parentId: null },
  { id: "cat-2", name: "Cotton & Linen", slug: "cotton", description: "Natural cotton and linen fabrics", image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=600&h=400&fit=crop", parentId: null },
  { id: "cat-3", name: "Velvet", slug: "velvet", description: "Rich velvet fabrics", image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=600&h=400&fit=crop", parentId: null },
  { id: "cat-4", name: "Chiffon", slug: "chiffon", description: "Lightweight chiffon fabrics", image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop", parentId: null },
  { id: "cat-5", name: "Organza", slug: "organza", description: "Sheer organza fabrics", image: "https://images.unsplash.com/photo-1553697388-94e804e2de0e?w=600&h=400&fit=crop", parentId: null },
  { id: "cat-6", name: "Georgette", slug: "georgette", description: "Flowy georgette fabrics", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop", parentId: null },
];

export const mockProducts: Product[] = [
  {
    id: "p-1",
    name: "Royal Silk Organza",
    slug: "royal-silk-organza",
    description: "Ethereal silk organza with a luminous sheen, perfect for formal wear and bridal collections. Lightweight yet structured, this fabric drapes beautifully.",
    sku: "SK-001",
    price: "8999",
    compareAt: "12999",
    isPublished: true,
    isFeatured: true,
    tags: ["silk", "premium", "bridal"],
    metaTitle: "Royal Silk Organza | Luxe Fabrics",
    metaDesc: "Premium silk organza for luxury garments",
    createdAt: "2025-01-15",
    images: [
      { id: "img-1", url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1000&fit=crop", alt: "Royal Silk Organza", sortOrder: 0 },
      { id: "img-2", url: "https://images.unsplash.com/photo-1553697388-94e804e2de0e?w=800&h=1000&fit=crop", alt: "Royal Silk Organza Detail", sortOrder: 1 },
    ],
    variants: [
      { id: "v-1a", sku: "SK-001-Ivory", name: "Ivory", price: "8999", compareAt: "12999", size: null, color: "Ivory", colorHex: "#FFFFF0", isActive: true },
      { id: "v-1b", sku: "SK-001-Blush", name: "Blush Pink", price: "8999", compareAt: "12999", size: null, color: "Blush Pink", colorHex: "#DE5D83", isActive: true },
      { id: "v-1c", sku: "SK-001-Gold", name: "Gold", price: "9499", compareAt: "13499", size: null, color: "Gold", colorHex: "#D4A76A", isActive: true },
      { id: "v-1d", sku: "SK-001-Navy", name: "Navy", price: "8999", compareAt: "12999", size: null, color: "Navy", colorHex: "#1E3A5F", isActive: true },
    ],
    category: { id: "cat-1", name: "Silk & Satin", slug: "silk", description: null, image: null, parentId: null },
    reviews: [
      { id: "r-1", userId: "u-1", productId: "p-1", rating: 5, title: "Absolutely stunning!", comment: "The quality is incredible. Perfect for my bridal collection.", isApproved: true, createdAt: "2025-03-10", user: { name: "Ayesha Khan", avatar: null } },
      { id: "r-2", userId: "u-2", productId: "p-1", rating: 4, title: "Beautiful fabric", comment: "Great quality silk, slightly lighter than expected but still beautiful.", isApproved: true, createdAt: "2025-02-28", user: { name: "Fatima Ali", avatar: null } },
    ],
    _count: { reviews: 2, orderItems: 45 },
  },
  {
    id: "p-2",
    name: "Heritage Linen Blend",
    slug: "heritage-linen-blend",
    description: "A premium linen-cotton blend that combines the breathability of linen with the softness of cotton. Ideal for summer collections and casual wear.",
    sku: "SK-002",
    price: "5499",
    compareAt: null,
    isPublished: true,
    isFeatured: true,
    tags: ["linen", "cotton", "summer"],
    metaTitle: "Heritage Linen Blend | Luxe Fabrics",
    metaDesc: "Premium linen blend fabric for summer wear",
    createdAt: "2025-02-01",
    images: [
      { id: "img-3", url: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&h=1000&fit=crop", alt: "Heritage Linen Blend", sortOrder: 0 },
    ],
    variants: [
      { id: "v-2a", sku: "SK-002-Natural", name: "Natural", price: "5499", compareAt: null, size: null, color: "Natural", colorHex: "#E8DCC8", isActive: true },
      { id: "v-2b", sku: "SK-002-Sage", name: "Sage", price: "5499", compareAt: null, size: null, color: "Sage", colorHex: "#9CAF88", isActive: true },
      { id: "v-2c", sku: "SK-002-Terracotta", name: "Terracotta", price: "5799", compareAt: null, size: null, color: "Terracotta", colorHex: "#C75B39", isActive: true },
    ],
    category: { id: "cat-2", name: "Cotton & Linen", slug: "cotton", description: null, image: null, parentId: null },
    reviews: [
      { id: "r-3", userId: "u-3", productId: "p-2", rating: 5, title: "Perfect for summer", comment: "So comfortable and breathable. Used it for a kurta collection.", isApproved: true, createdAt: "2025-04-05", user: { name: "Sara Malik", avatar: null } },
    ],
    _count: { reviews: 1, orderItems: 32 },
  },
  {
    id: "p-3",
    name: "Midnight Velvet",
    slug: "midnight-velvet",
    description: "Rich, plush velvet with a deep pile and luxurious feel. Perfect for evening wear, blazers, and statement pieces.",
    sku: "SK-003",
    price: "7250",
    compareAt: null,
    isPublished: true,
    isFeatured: true,
    tags: ["velvet", "winter", "luxury"],
    metaTitle: "Midnight Velvet | Luxe Fabrics",
    metaDesc: "Premium velvet fabric for luxury garments",
    createdAt: "2025-01-20",
    images: [
      { id: "img-4", url: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&h=1000&fit=crop", alt: "Midnight Velvet", sortOrder: 0 },
    ],
    variants: [
      { id: "v-3a", sku: "SK-003-Black", name: "Black", price: "7250", compareAt: null, size: null, color: "Black", colorHex: "#000000", isActive: true },
      { id: "v-3b", sku: "SK-003-Burgundy", name: "Burgundy", price: "7250", compareAt: null, size: null, color: "Burgundy", colorHex: "#722F37", isActive: true },
      { id: "v-3c", sku: "SK-003-Teal", name: "Teal", price: "7250", compareAt: null, size: null, color: "Teal", colorHex: "#008080", isActive: true },
    ],
    category: { id: "cat-3", name: "Velvet", slug: "velvet", description: null, image: null, parentId: null },
    reviews: [
      { id: "r-4", userId: "u-4", productId: "p-3", rating: 5, title: "Best velvet ever", comment: "The quality is unmatched. Deep rich color and incredible softness.", isApproved: true, createdAt: "2025-03-20", user: { name: "Hira Shah", avatar: null } },
      { id: "r-5", userId: "u-5", productId: "p-3", rating: 4, title: "Great quality", comment: "Beautiful velvet, used for blazer fabric. Would recommend.", isApproved: true, createdAt: "2025-03-15", user: { name: "Zainab Hassan", avatar: null } },
    ],
    _count: { reviews: 2, orderItems: 28 },
  },
  {
    id: "p-4",
    name: "Cloud Cotton Voile",
    slug: "cloud-cotton-voile",
    description: "Ultra-soft cotton voile with a sheer, airy quality. Perfect for summer dresses, scarves, and layering pieces.",
    sku: "SK-004",
    price: "3499",
    compareAt: null,
    isPublished: true,
    isFeatured: true,
    tags: ["cotton", "lightweight", "summer"],
    metaTitle: "Cloud Cotton Voile | Luxe Fabrics",
    metaDesc: "Lightweight cotton voile for summer collections",
    createdAt: "2025-02-15",
    images: [
      { id: "img-5", url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop", alt: "Cloud Cotton Voile", sortOrder: 0 },
    ],
    variants: [
      { id: "v-4a", sku: "SK-004-White", name: "White", price: "3499", compareAt: null, size: null, color: "White", colorHex: "#FFFFFF", isActive: true },
      { id: "v-4b", sku: "SK-004-Pastel-Blue", name: "Pastel Blue", price: "3499", compareAt: null, size: null, color: "Pastel Blue", colorHex: "#AEC6CF", isActive: true },
      { id: "v-4c", sku: "SK-004-Lavender", name: "Lavender", price: "3499", compareAt: null, size: null, color: "Lavender", colorHex: "#B57EDC", isActive: true },
    ],
    category: { id: "cat-2", name: "Cotton & Linen", slug: "cotton", description: null, image: null, parentId: null },
    reviews: [
      { id: "r-6", userId: "u-6", productId: "p-4", rating: 5, title: "So soft!", comment: "Incredibly soft and lightweight. Perfect for summer.", isApproved: true, createdAt: "2025-04-10", user: { name: "Nadia Ahmed", avatar: null } },
    ],
    _count: { reviews: 1, orderItems: 55 },
  },
  {
    id: "p-5",
    name: "Emperor Brocade",
    slug: "emperor-brocade",
    description: "Opulent brocade fabric with intricate woven patterns. Ideal for formal sherwanis, lehengas, and traditional wear.",
    sku: "SK-005",
    price: "12999",
    compareAt: "18999",
    isPublished: true,
    isFeatured: true,
    tags: ["brocade", "premium", "bridal", "wedding"],
    metaTitle: "Emperor Brocade | Luxe Fabrics",
    metaDesc: "Luxury brocade fabric for wedding collections",
    createdAt: "2024-12-10",
    images: [
      { id: "img-6", url: "https://images.unsplash.com/photo-1553697388-94e804e2de0e?w=800&h=1000&fit=crop", alt: "Emperor Brocade", sortOrder: 0 },
    ],
    variants: [
      { id: "v-5a", sku: "SK-005-Gold", name: "Gold", price: "12999", compareAt: "18999", size: null, color: "Gold", colorHex: "#D4A76A", isActive: true },
      { id: "v-5b", sku: "SK-005-Red", name: "Red", price: "12999", compareAt: "18999", size: null, color: "Red", colorHex: "#B22222", isActive: true },
    ],
    category: { id: "cat-1", name: "Silk & Satin", slug: "silk", description: null, image: null, parentId: null },
    reviews: [
      { id: "r-7", userId: "u-7", productId: "p-5", rating: 5, title: "Worth every rupee", comment: "The craftsmanship is extraordinary. Used for a bridal lehenga.", isApproved: true, createdAt: "2025-01-25", user: { name: "Amira Noor", avatar: null } },
    ],
    _count: { reviews: 1, orderItems: 18 },
  },
  {
    id: "p-6",
    name: "Breeze Chiffon",
    slug: "breeze-chiffon",
    description: "Flowing chiffon with a soft, romantic drape. Perfect for scarves, dupattas, and elegant evening wear.",
    sku: "SK-006",
    price: "4499",
    compareAt: null,
    isPublished: true,
    isFeatured: true,
    tags: ["chiffon", "flowy", "evening"],
    metaTitle: "Breeze Chiffon | Luxe Fabrics",
    metaDesc: "Premium chiffon fabric for elegant wear",
    createdAt: "2025-03-01",
    images: [
      { id: "img-7", url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop", alt: "Breeze Chiffon", sortOrder: 0 },
    ],
    variants: [
      { id: "v-6a", sku: "SK-006-Peach", name: "Peach", price: "4499", compareAt: null, size: null, color: "Peach", colorHex: "#FFCBA4", isActive: true },
      { id: "v-6b", sku: "SK-006-Dusty-Rose", name: "Dusty Rose", price: "4499", compareAt: null, size: null, color: "Dusty Rose", colorHex: "#DCAE96", isActive: true },
      { id: "v-6c", sku: "SK-006-Mint", name: "Mint", price: "4499", compareAt: null, size: null, color: "Mint", colorHex: "#98FF98", isActive: true },
    ],
    category: { id: "cat-4", name: "Chiffon", slug: "chiffon", description: null, image: null, parentId: null },
    reviews: [
      { id: "r-8", userId: "u-8", productId: "p-6", rating: 4, title: "Beautiful drape", comment: "Lovely chiffon, very flowy. Great for dupattas.", isApproved: true, createdAt: "2025-04-01", user: { name: "Rabia Saeed", avatar: null } },
    ],
    _count: { reviews: 1, orderItems: 38 },
  },
  {
    id: "p-7",
    name: "Pearl Organza",
    slug: "pearl-organza",
    description: "Crisp, sheer organza with a subtle pearlescent finish. Ideal for layering, overlays, and structured silhouettes.",
    sku: "SK-007",
    price: "6750",
    compareAt: null,
    isPublished: true,
    isFeatured: false,
    tags: ["organza", "sheer", "layering"],
    metaTitle: "Pearl Organza | Luxe Fabrics",
    metaDesc: "Premium organza fabric for layered designs",
    createdAt: "2025-02-20",
    images: [
      { id: "img-8", url: "https://images.unsplash.com/photo-1553697388-94e804e2de0e?w=800&h=1000&fit=crop", alt: "Pearl Organza", sortOrder: 0 },
    ],
    variants: [
      { id: "v-7a", sku: "SK-007-Pearl", name: "Pearl White", price: "6750", compareAt: null, size: null, color: "Pearl White", colorHex: "#F0EAD6", isActive: true },
      { id: "v-7b", sku: "SK-007-Champagne", name: "Champagne", price: "6750", compareAt: null, size: null, color: "Champagne", colorHex: "#F7E7CE", isActive: true },
    ],
    category: { id: "cat-5", name: "Organza", slug: "organza", description: null, image: null, parentId: null },
    reviews: [],
    _count: { reviews: 0, orderItems: 15 },
  },
  {
    id: "p-8",
    name: "Monsoon Georgette",
    slug: "monsoon-georgette",
    description: "Soft, crinkled georgette with a beautiful texture and flow. Perfect for sarees, kurtis, and flowing dresses.",
    sku: "SK-008",
    price: "5250",
    compareAt: "7500",
    isPublished: true,
    isFeatured: false,
    tags: ["georgette", "flowy", "ethnic"],
    metaTitle: "Monsoon Georgette | Luxe Fabrics",
    metaDesc: "Premium georgette for ethnic wear",
    createdAt: "2025-03-10",
    images: [
      { id: "img-9", url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1000&fit=crop", alt: "Monsoon Georgette", sortOrder: 0 },
    ],
    variants: [
      { id: "v-8a", sku: "SK-008-Maroon", name: "Maroon", price: "5250", compareAt: "7500", size: null, color: "Maroon", colorHex: "#7F1D1D", isActive: true },
      { id: "v-8b", sku: "SK-008-Emerald", name: "Emerald", price: "5250", compareAt: "7500", size: null, color: "Emerald", colorHex: "#50C878", isActive: true },
      { id: "v-8c", sku: "SK-008-Royal-Blue", name: "Royal Blue", price: "5250", compareAt: "7500", size: null, color: "Royal Blue", colorHex: "#4169E1", isActive: true },
    ],
    category: { id: "cat-6", name: "Georgette", slug: "georgette", description: null, image: null, parentId: null },
    reviews: [
      { id: "r-9", userId: "u-9", productId: "p-8", rating: 5, title: "Stunning colors", comment: "The emerald color is breathtaking. Used for a saree.", isApproved: true, createdAt: "2025-04-08", user: { name: "Mehreen Raza", avatar: null } },
    ],
    _count: { reviews: 1, orderItems: 22 },
  },
  {
    id: "p-9",
    name: "Silk Charmeuse",
    slug: "silk-charmeuse",
    description: "Luxurious silk charmeuse with a satin finish on one side and a matte crepe on the other. Perfect for slips, blouses, and evening wear.",
    sku: "SK-009",
    price: "11500",
    compareAt: null,
    isPublished: true,
    isFeatured: false,
    tags: ["silk", "luxury", "evening"],
    metaTitle: "Silk Charmeuse | Luxe Fabrics",
    metaDesc: "Premium silk charmeuse for luxury garments",
    createdAt: "2025-01-28",
    images: [
      { id: "img-10", url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=1000&fit=crop", alt: "Silk Charmeuse", sortOrder: 0 },
    ],
    variants: [
      { id: "v-9a", sku: "SK-009-Champagne", name: "Champagne", price: "11500", compareAt: null, size: null, color: "Champagne", colorHex: "#F7E7CE", isActive: true },
      { id: "v-9b", sku: "SK-009-Black", name: "Black", price: "11500", compareAt: null, size: null, color: "Black", colorHex: "#000000", isActive: true },
    ],
    category: { id: "cat-1", name: "Silk & Satin", slug: "silk", description: null, image: null, parentId: null },
    reviews: [],
    _count: { reviews: 0, orderItems: 12 },
  },
  {
    id: "p-10",
    name: "Raw Cotton Khadi",
    slug: "raw-cotton-khadi",
    description: "Hand-spun, hand-woven khadi cotton with a beautiful raw texture. Perfect for sustainable fashion and artisanal clothing.",
    sku: "SK-010",
    price: "4200",
    compareAt: null,
    isPublished: true,
    isFeatured: false,
    tags: ["cotton", "khadi", "sustainable", "handwoven"],
    metaTitle: "Raw Cotton Khadi | Luxe Fabrics",
    metaDesc: "Handwoven khadi cotton for sustainable fashion",
    createdAt: "2025-03-20",
    images: [
      { id: "img-11", url: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=800&h=1000&fit=crop", alt: "Raw Cotton Khadi", sortOrder: 0 },
    ],
    variants: [
      { id: "v-10a", sku: "SK-010-Off-White", name: "Off-White", price: "4200", compareAt: null, size: null, color: "Off-White", colorHex: "#FAF0E6", isActive: true },
      { id: "v-10b", sku: "SK-010-Indigo", name: "Indigo", price: "4200", compareAt: null, size: null, color: "Indigo", colorHex: "#3F00FF", isActive: true },
    ],
    category: { id: "cat-2", name: "Cotton & Linen", slug: "cotton", description: null, image: null, parentId: null },
    reviews: [],
    _count: { reviews: 0, orderItems: 20 },
  },
  {
    id: "p-11",
    name: "Royal Velvet Burnout",
    slug: "royal-velvet-burnout",
    description: "Stunning burnout velvet with an embossed floral pattern. A statement fabric for jackets, cushions, and luxury upholstery.",
    sku: "SK-011",
    price: "9800",
    compareAt: "14000",
    isPublished: true,
    isFeatured: false,
    tags: ["velvet", "burnout", "luxury", "upholstery"],
    metaTitle: "Royal Velvet Burnout | Luxe Fabrics",
    metaDesc: "Premium burnout velvet for luxury projects",
    createdAt: "2025-02-05",
    images: [
      { id: "img-12", url: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=800&h=1000&fit=crop", alt: "Royal Velvet Burnout", sortOrder: 0 },
    ],
    variants: [
      { id: "v-11a", sku: "SK-011-Wine", name: "Wine", price: "9800", compareAt: "14000", size: null, color: "Wine", colorHex: "#722F37", isActive: true },
      { id: "v-11b", sku: "SK-011-Gold", name: "Gold", price: "9800", compareAt: "14000", size: null, color: "Gold", colorHex: "#D4A76A", isActive: true },
    ],
    category: { id: "cat-3", name: "Velvet", slug: "velvet", description: null, image: null, parentId: null },
    reviews: [],
    _count: { reviews: 0, orderItems: 8 },
  },
  {
    id: "p-12",
    name: "Dusty Rose Chiffon",
    slug: "dusty-rose-chiffon",
    description: "Delicate chiffon in a muted rose tone. Perfect for romantic, feminine designs and soft flowing garments.",
    sku: "SK-012",
    price: "4100",
    compareAt: null,
    isPublished: true,
    isFeatured: false,
    tags: ["chiffon", "romantic", "feminine"],
    metaTitle: "Dusty Rose Chiffon | Luxe Fabrics",
    metaDesc: "Beautiful dusty rose chiffon fabric",
    createdAt: "2025-03-25",
    images: [
      { id: "img-13", url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop", alt: "Dusty Rose Chiffon", sortOrder: 0 },
    ],
    variants: [
      { id: "v-12a", sku: "SK-012-Dusty-Rose", name: "Dusty Rose", price: "4100", compareAt: null, size: null, color: "Dusty Rose", colorHex: "#DCAE96", isActive: true },
      { id: "v-12b", sku: "SK-012-Mauve", name: "Mauve", price: "4100", compareAt: null, size: null, color: "Mauve", colorHex: "#E0B0FF", isActive: true },
    ],
    category: { id: "cat-4", name: "Chiffon", slug: "chiffon", description: null, image: null, parentId: null },
    reviews: [],
    _count: { reviews: 0, orderItems: 25 },
  },
];

export function getProducts(params?: Record<string, string>): { products: Product[]; pagination: { total: number; page: number; limit: number; totalPages: number } } {
  let filtered = [...mockProducts];

  if (params?.search) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (params?.categoryId) {
    filtered = filtered.filter((p) => p.category?.slug === params.categoryId);
  }

  if (params?.minPrice) {
    filtered = filtered.filter((p) => parseFloat(p.price) >= parseFloat(params.minPrice!));
  }

  if (params?.maxPrice) {
    filtered = filtered.filter((p) => parseFloat(p.price) <= parseFloat(params.maxPrice!));
  }

  if (params?.size) {
    filtered = filtered.filter((p) => p.variants.some((v) => v.size === params.size));
  }

  if (params?.color) {
    filtered = filtered.filter((p) => p.variants.some((v) => v.color?.toLowerCase() === params.color!.toLowerCase()));
  }

  if (params?.sortBy === "price") {
    filtered.sort((a, b) => params.sortOrder === "asc" ? parseFloat(a.price) - parseFloat(b.price) : parseFloat(b.price) - parseFloat(a.price));
  } else if (params?.sortBy === "bestsellers") {
    filtered.sort((a, b) => (b._count?.orderItems || 0) - (a._count?.orderItems || 0));
  } else if (params?.sortBy === "rating") {
    filtered.sort((a, b) => (b._count?.reviews || 0) - (a._count?.reviews || 0));
  } else {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const page = parseInt(params?.page || "1");
  const limit = parseInt(params?.limit || "12");
  const start = (page - 1) * limit;
  const paged = filtered.slice(start, start + limit);

  return {
    products: paged,
    pagination: {
      total: filtered.length,
      page,
      limit,
      totalPages: Math.ceil(filtered.length / limit),
    },
  };
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}
