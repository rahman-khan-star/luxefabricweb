import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const auth = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { email: string; password: string; name?: string; phone?: string }) => api.post('/auth/register', data),
  sendOtp: (data: { phone?: string; email?: string; type: string }) => api.post('/auth/otp/send', data),
  verifyOtp: (data: { phone?: string; email?: string; code: string; type: string }) => api.post('/auth/otp/verify', data),
  profile: () => api.get('/auth/profile'),
};

export const products = {
  list: (params?: Record<string, string>) => api.get('/products', { params }),
  bySlug: (slug: string) => api.get(`/products/${slug}`),
  featured: () => api.get('/products/featured'),
  newArrivals: () => api.get('/products/new-arrivals'),
  bestSellers: () => api.get('/products/best-sellers'),
  related: (id: string, categoryId: string) => api.get(`/products/${id}/related`, { params: { categoryId } }),
};

export const categories = {
  list: () => api.get('/categories'),
  bySlug: (slug: string) => api.get(`/categories/${slug}`),
};

export const orders = {
  create: (data: any) => api.post('/orders', data),
  myOrders: (page?: number) => api.get('/orders', { params: { page } }),
  all: (page?: number) => api.get('/orders/all', { params: { page } }),
  byId: (id: string) => api.get(`/orders/${id}`),
  updateStatus: (id: string, status: string) => api.put(`/orders/${id}/status`, { status }),
};

export const reviews = {
  create: (data: any) => api.post('/reviews', data),
  byProduct: (productId: string) => api.get(`/reviews/product/${productId}`),
  approve: (id: string) => api.put(`/reviews/${id}/approve`),
  delete: (id: string) => api.delete(`/reviews/${id}`),
};

export const coupons = {
  list: () => api.get('/coupons'),
  validate: (code: string, subtotal: number) => api.post('/coupons/validate', { code, subtotal }),
  create: (data: any) => api.post('/coupons', data),
  update: (id: string, data: any) => api.put(`/coupons/${id}`, data),
  delete: (id: string) => api.delete(`/coupons/${id}`),
};

export const payments = {
  createStripeIntent: (amount: number) => api.post('/payments/stripe/create-intent', { amount }),
  verifyStripe: (paymentIntentId: string) => api.post('/payments/stripe/verify', { paymentIntentId }),
};

export const users = {
  list: (page?: number) => api.get('/users', { params: { page } }),
  byId: (id: string) => api.get(`/users/${id}`),
  updateRole: (id: string, role: string) => api.put(`/users/${id}/role`, { role }),
};

export const search = {
  query: (q: string, page?: number) => api.get('/search', { params: { q, page } }),
  suggestions: (q: string) => api.get('/search/suggestions', { params: { q } }),
};

export const upload = {
  image: (file: File, folder?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    if (folder) formData.append('folder', folder);
    return api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};

export default api;
