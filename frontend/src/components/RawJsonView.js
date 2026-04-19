import { useEffect, useState } from 'react';
import { getProductsRawJson } from '../services/productService';

function RawJsonView() {
  const [json, setJson] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isActive = true;

    async function loadJson() {
      setLoading(true);
      setError('');

      try {
        const response = await getProductsRawJson();

        if (isActive) {
          setJson(response);
        }
      } catch (loadError) {
        if (isActive) {
          setError(loadError.message || 'Could not load raw JSON');
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    }

    loadJson();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <section className="panel panel--wide">
      <div className="section-heading">
        <h2>Raw JSON View</h2>
        <p>Direct response from GET /api/products.</p>
      </div>

      {loading ? <div className="empty-state">Loading JSON...</div> : null}
      {error ? <p className="feedback feedback--error">{error}</p> : null}

      {!loading && !error ? (
        <pre className="json-view">{json}</pre>
      ) : null}
    </section>
  );
}

export default RawJsonView;