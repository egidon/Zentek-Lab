import {
  createProduct,
  fetchHealth,
  fetchProducts,
  searchProductsByColor
} from '../controller/productController';

export const productRepository = {
  checkHealth: () => fetchHealth(),
  create: (product) => createProduct(product),
  getAll: () => fetchProducts(),
  searchByColor: (color) => searchProductsByColor(color)
};
