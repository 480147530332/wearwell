import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ProductCard from '../ProductCard';
import { getAllProducts } from '../../data/products';

const allProducts = getAllProducts();

const categoryTiles = [
  {
    key: 'women',
    label: 'Women',
    link: '/women',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700&q=80&auto=format',
  },
  {
    key: 'men',
    label: 'Men',
    link: '/men',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=700&q=80&auto=format',
  },
  {
    key: 'footwear',
    label: 'Footwear',
    link: '/shop',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=700&q=80&auto=format',
  },
  {
    key: 'electronics',
    label: 'Electronics',
    link: '/shop',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700&q=80&auto=format',
  },
];

const dealsOfTheDay = allProducts.filter((p) => p.discount >= 40).slice(0, 8);
const trending = allProducts.slice(8, 16);

export const Home = () => {
  return (
    <div className="page-wrap">
      {/* Hero banner */}
      <section className="hero-banner fade-in">
        <div className="hero-text">
          <h2>Sustainable. Beautiful. Ethical.</h2>
          <p>Fresh styles, everyday essentials and top electronics — all in one place.</p>
          <Link to="/shop" className="hero-cta">Shop Now</Link>
        </div>
      </section>

      {/* Category tiles */}
      <div className="section-header">
        <h2>Shop by Category</h2>
      </div>
      <div className="category-grid">
        {categoryTiles.map((cat) => (
          <Link to={cat.link} className="category-tile zoom-in" key={cat.key}>
            <img src={cat.image} alt={cat.label} />
            <div className="category-label">{cat.label}</div>
          </Link>
        ))}
      </div>

      {/* Deals of the day */}
      <div className="section-header">
        <h2>Deals of the Day</h2>
        <Link to="/shop" className="see-all">See All</Link>
      </div>
      <div className="product-grid card-animation">
        {dealsOfTheDay.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Trending */}
      <div className="section-header">
        <h2>Trending Products</h2>
        <Link to="/shop" className="see-all">See All</Link>
      </div>
      <div className="product-grid card-animation">
        {trending.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <FactorySection />
    </div>
  );
};

export default Home;

// ====================== Factory Section ======================
export const FactorySection = () => {
  return (
    <div className="factory-section fade-in">
      <h1>How our clothes are made</h1>
      <div className="factory-images">
        <div className="zoom-in">
          <img src="https://affixapparel.com/wp-content/uploads/2022/12/how-clothes-are-made-2-1024x707.jpg" alt="Factory" />
        </div>
        <div className="zoom-in">
          <img src="https://aseemamag.com/wp-content/uploads/2020/12/facebook_imagine_-_fair_wage.jpg" alt="Fair Wage" />
        </div>
      </div>
    </div>
  );
};
