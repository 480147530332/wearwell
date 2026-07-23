import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { getAllProducts, CATEGORIES } from '../../data/products';
import './Shop.css';

const allProducts = getAllProducts();
const MAX_PRICE = Math.max(...allProducts.map((p) => p.price));

const Shop = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [sort, setSort] = useState('popularity');

  const toggleCategory = (key) => {
    setSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const filtered = useMemo(() => {
    let arr = allProducts.filter((p) => p.price <= maxPrice);

    if (selectedCategories.length) {
      arr = arr.filter((p) => selectedCategories.includes(p.category));
    }

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      arr = arr.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brand || '').toLowerCase().includes(q)
      );
    }

    if (sort === 'priceLow') arr = [...arr].sort((a, b) => a.price - b.price);
    else if (sort === 'priceHigh') arr = [...arr].sort((a, b) => b.price - a.price);
    else if (sort === 'rating') arr = [...arr].sort((a, b) => b.rating - a.rating);

    return arr;
  }, [selectedCategories, maxPrice, search, sort]);

  return (
    <div className="page-wrap shop-layout">
      <aside className="shop-sidebar">
        <h3>Filters</h3>

        <div className="filter-block">
          <label className="filter-title">Search</label>
          <input
            type="text"
            placeholder="Search products"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-block">
          <span className="filter-title">Category</span>
          {CATEGORIES.map((cat) => (
            <label key={cat.key} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.key)}
                onChange={() => toggleCategory(cat.key)}
              />
              {cat.label}
            </label>
          ))}
        </div>

        <div className="filter-block">
          <span className="filter-title">Max Price: ₹{maxPrice.toLocaleString()}</span>
          <input
            type="range"
            min="500"
            max={MAX_PRICE}
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </aside>

      <main className="shop-main">
        <div className="category-toolbar">
          <span>{filtered.length} products found</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popularity">Sort: Popularity</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No products match your filters</h3>
            <p>Try adjusting the price range or clearing category filters.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
