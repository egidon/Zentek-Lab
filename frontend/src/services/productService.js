import { buildProductPayload, mapProducts } from '../model/product';
import { productRepository } from '../repository/productRepository';

export function validateProduct(values) {
  if (!values.name.trim()) {
    return 'Name is required';
  }

  if (!values.price || Number(values.price) <= 0) {
    return 'Price must be greater than 0';
  }

  return '';
}

export async function getHealthStatus() {
  const response = await productRepository.checkHealth();
  return response === 'OK' ? 'API is running' : 'API status unknown';
}

export async function getAllProducts() {
  const products = await productRepository.getAll();
  return mapProducts(products);
}

export async function getProductsRawJson() {
  const products = await productRepository.getAll();
  return JSON.stringify(products, null, 2);
}

export async function saveProduct(values) {
  const validationError = validateProduct(values);

  if (validationError) {
    throw new Error(validationError);
  }

  await productRepository.create(buildProductPayload(values));
}

export async function filterProductsByColor(color) {
  if (!color.trim()) {
    return [];
  }

  const products = await productRepository.searchByColor(color);
  return mapProducts(products);
}
