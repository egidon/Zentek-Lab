import { useState } from 'react';

const initialValues = {
  name: '',
  price: '',
  description: ''
};

function ProductForm({ onSubmit, loading, message, error }) {
  const [values, setValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const wasCreated = await onSubmit(values);

    if (wasCreated) {
      setValues(initialValues);
    }
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Create Product</h2>
        <p>Add a product to the catalog.</p>
      </div>

      <form className="product-form" onSubmit={handleSubmit}>
        <label>
          <span>Name</span>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Keyboard"
          />
        </label>

        <label>
          <span>Price</span>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={values.price}
            onChange={handleChange}
            placeholder="99.99"
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            name="description"
            rows="4"
            value={values.description}
            onChange={handleChange}
            placeholder="Compact mechanical keyboard"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Create product'}
        </button>
      </form>

      {message ? <p className="feedback feedback--success">{message}</p> : null}
      {error ? <p className="feedback feedback--error">{error}</p> : null}
    </section>
  );
}

export default ProductForm;
