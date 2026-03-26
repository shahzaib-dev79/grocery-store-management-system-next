import http from '../services/http'; 
import { Product, MarketingItem } from '../types/admin';

export const adminService = {
  getProducts: () => http.get('/products'),
  addProduct: (data: FormData) => http.post('/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteProduct: (id: string) => http.delete(`/products/${id}`),
    updateProduct: (id: string, data: FormData) => http.put(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};


