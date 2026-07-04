export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN';
  avatar: string | null;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parentId: string | null;
  children?: Category[];
  _count?: { products: number };
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
  sortOrder: number;
}

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: string;
  compareAt: string | null;
  size: string | null;
  color: string | null;
  colorHex: string | null;
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sku: string;
  price: string;
  compareAt: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  tags: string[];
  metaTitle: string | null;
  metaDesc: string | null;
  createdAt: string;
  images: ProductImage[];
  variants: ProductVariant[];
  category?: Category;
  brand?: Brand | null;
  reviews?: Review[];
  _count?: { reviews: number; orderItems?: number };
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string | null;
  comment: string | null;
  isApproved: boolean;
  createdAt: string;
  user?: { name: string; avatar: string | null };
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  product?: Product;
  variant?: ProductVariant;
}

export interface WishlistItem {
  id: string;
  productId: string;
  product?: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  subtotal: string;
  shippingCost: string;
  discount: string;
  total: string;
  couponCode: string | null;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  shippingCity: string;
  shippingProvince: string;
  notes: string | null;
  trackingNumber: string | null;
  deliveredAt: string | null;
  createdAt: string;
  items?: OrderItem[];
  user?: { name: string; email: string; phone: string };
  payment?: Payment;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  name: string;
  sku: string;
  price: string;
  quantity: number;
  total: string;
}

export interface Payment {
  id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string | null;
  amount: string;
  currency: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string | null;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: string;
  minOrder: string | null;
  maxUses: number | null;
  usedCount: number;
  isActive: boolean;
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  phone: string;
  address1: string;
  address2: string | null;
  city: string;
  province: string;
  postalCode: string | null;
  country: string;
  isDefault: boolean;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED';
export type PaymentStatus = 'UNPAID' | 'PAID' | 'PARTIALLY_PAID' | 'REFUNDED' | 'FAILED';
export type PaymentMethod = 'COD' | 'JAZZCASH' | 'EASYPAISA' | 'STRIPE' | 'BANK_TRANSFER';

export interface PaginatedResponse<T> {
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  [key: string]: any;
}
