import { useState } from 'react';

function SearchBar({ onSearch, loading, message, error }) {
  const [color, setColor] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(color);
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Filter by Color</h2>
        <p>Search products using the backend color filter.</p>
      </div>

      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          value={color}
          onChange={(event) => setColor(event.target.value)}
          placeholder="red"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {message ? <p className="feedback">{message}</p> : null}
      {error ? <p className="feedback feedback--error">{error}</p> : null}
    </section>
  );
}

export default SearchBar;
