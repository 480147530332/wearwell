import React, { useMemo, useState } from 'react';
import ProductCard from '../ProductCard';
import { getProductsByCategory } from '../../data/products';
import './CategoryPage.css';

const Men = () => {
  const [sort, setSort] = useState('popularity');
  const products = useMemo(() => getProductsByCategory('men'), []);

  const sorted = useMemo(() => {
    const arr = [...products];
    if (sort === 'priceLow') arr.sort((a, b) => a.price - b.price);
    else if (sort === 'priceHigh') arr.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [products, sort]);

  return (
    <div className="page-wrap category-page">
      <div className="category-banner men-banner">
        <h1>Men's Fashion</h1>
        <p>Shirts, jackets, watches, footwear &amp; more</p>
      </div>

      <div className="category-toolbar">
        <span>{sorted.length} items</span>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popularity">Sort: Popularity</option>
          <option value="priceLow">Price: Low to High</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="rating">Customer Rating</option>
        </select>
      </div>

      <div className="product-grid">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Men;
