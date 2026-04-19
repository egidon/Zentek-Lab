function formatDate(value) {
  if (!value) {
    return 'N/A';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}

function ProductList({ title, products, loading, emptyMessage }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>{title}</h2>
        <p>{loading ? 'Loading products...' : `${products.length} item(s)`}</p>
      </div>

      {loading ? <div className="empty-state">Loading...</div> : null}

      {!loading && products.length === 0 ? (
        <div className="empty-state">{emptyMessage}</div>
      ) : null}

      {!loading && products.length > 0 ? (
        <div className="product-list">
          {products.map((product) => (
            <article className="product-card" key={product.id ?? `${product.name}-${product.createdAt}`}>
              <div className="product-card__header">
                <h3>{product.name}</h3>
                <strong>${product.price.toFixed(2)}</strong>
              </div>
              <p>{product.description || 'No description provided.'}</p>
              <small>Created at: {formatDate(product.createdAt)}</small>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default ProductList;
