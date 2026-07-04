import { create } from 'zustand';
import type { CartItem, Product, ProductVariant } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setItems: (items: CartItem[]) => void;
  get totalItems(): number;
  get subtotal(): number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product, variant, quantity = 1) => {
    set((state) => {
      const existing = state.items.find((i) => i.variantId === variant.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.variantId === variant.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return {
        items: [...state.items, {
          id: `cart-${Date.now()}`,
          productId: product.id,
          variantId: variant.id,
          quantity,
          product,
          variant,
        }],
      };
    });
  },

  removeItem: (variantId) => {
    set((state) => ({
      items: state.items.filter((i) => i.variantId !== variantId),
    }));
  },

  updateQuantity: (variantId, quantity) => {
    if (quantity < 1) return get().removeItem(variantId);
    set((state) => ({
      items: state.items.map((i) =>
        i.variantId === variantId ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  setItems: (items) => set({ items }),

  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  get subtotal() {
    return get().items.reduce((sum, item) => {
      const price = item.variant ? parseFloat(item.variant.price) : 0;
      return sum + price * item.quantity;
    }, 0);
  },
}));
