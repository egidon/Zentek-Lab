import { useEffect, useState } from 'react';
import HealthStatus from '../components/HealthStatus';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import RawJsonView from '../components/RawJsonView';
import SearchBar from '../components/SearchBar';
import {
  filterProductsByColor,
  getAllProducts,
  getHealthStatus,
  saveProduct
} from '../services/productService';

function ProductPage() {
  const [healthLoading, setHealthLoading] = useState(true);
  const [healthMessage, setHealthMessage] = useState('');
  const [healthError, setHealthError] = useState('');

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState('');

  const [createLoading, setCreateLoading] = useState(false);
  const [createMessage, setCreateMessage] = useState('');
  const [createError, setCreateError] = useState('');

  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const [searchError, setSearchError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadHealth();
    loadProducts();
  }, []);

  async function loadHealth() {
    setHealthLoading(true);
    setHealthError('');

    try {
      const message = await getHealthStatus();
      setHealthMessage(message);
    } catch (error) {
      setHealthError(error.message || 'API is down');
    } finally {
      setHealthLoading(false);
    }
  }

  async function loadProducts() {
    setProductsLoading(true);
    setProductsError('');

    try {
      const productList = await getAllProducts();
      setProducts(productList);
    } catch (error) {
      setProductsError(error.message || 'Could not load products');
    } finally {
      setProductsLoading(false);
    }
  }

  async function handleCreateProduct(values) {
    setCreateLoading(true);
    setCreateMessage('');
    setCreateError('');

    try {
      await saveProduct(values);
      setCreateMessage('Product created successfully.');
      await loadProducts();
      return true;
    } catch (error) {
      setCreateError(error.message || 'Could not create product');
      return false;
    } finally {
      setCreateLoading(false);
    }
  }

  async function handleSearch(color) {
    setSearchLoading(true);
    setSearchMessage('');
    setSearchError('');
    setSearchResults([]);
    setHasSearched(true);

    if (!color.trim()) {
      setSearchLoading(false);
      setSearchMessage('Enter a color to search.');
      return;
    }

    try {
      const filteredProducts = await filterProductsByColor(color);
      setSearchResults(filteredProducts);
      setSearchMessage(filteredProducts.length === 0 ? 'No products found' : `Found ${filteredProducts.length} product(s).`);
    } catch (error) {
      if ((error.message || '').toLowerCase().includes('no products found')) {
        setSearchMessage('No products found');
        return;
      }

      setSearchError(error.message || 'Search failed');
    } finally {
      setSearchLoading(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Zentek-Lab Product Dashboard</p>
          <h1>Manage products with a simple React client.</h1>
          <p className="hero-copy">
            The app checks API health, creates products, loads the full list, and filters products by color.
          </p>
        </div>
      </section>

      <div className="content-grid">
        <HealthStatus
          loading={healthLoading}
          message={healthMessage}
          error={healthError}
        />

        <ProductForm
          onSubmit={handleCreateProduct}
          loading={createLoading}
          message={createMessage}
          error={createError}
        />

        <SearchBar
          onSearch={handleSearch}
          loading={searchLoading}
          message={searchMessage}
          error={searchError}
        />

        <ProductList
          title="All Products"
          products={products}
          loading={productsLoading}
          emptyMessage={productsError || 'No products available.'}
        />

        <ProductList
          title="Filtered Results"
          products={searchResults}
          loading={searchLoading}
          emptyMessage={hasSearched ? 'No products found' : 'Search by color to see filtered results.'}
        />

        <RawJsonView />
      </div>
    </main>
  );
}

export default ProductPage;
