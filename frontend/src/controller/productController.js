import { apiClient } from './apiClient';

export function fetchHealth() {
  return apiClient.get('/health', { requiresAuth: false });
}

export function fetchProducts() {
  return apiClient.get('/api/products');
}

export function createProduct(product) {
  return apiClient.post('/api/products', product);
}

export function searchProductsByColor(color) {
  const query = encodeURIComponent(color.trim());
  return apiClient.get(`/api/products/search?color=${query}`);
}
