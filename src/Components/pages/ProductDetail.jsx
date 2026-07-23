import React, { useContext, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { getProductById, getRelatedProducts } from '../../data/products';
import ProductCard from '../ProductCard';
import './ProductDetail.css';

const FALLBACK_IMG = "https://via.placeholder.com/700x700.png?text=WearWell";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Prefer the centralized catalog (works on refresh/direct links);
  // fall back to whatever was passed via navigation state for legacy links.
  const product = useMemo(
    () => getProductById(id) || location.state?.product,
    [id, location.state]
  );

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="page-wrap">
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Product Not Found</h2>
      </div>
    );
  }

  const images = (product.images && product.images.length ? product.images : [product.image]).filter(Boolean);
  const related = getRelatedProducts(product, 4);

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: images[0],
      description: product.description,
      selectedSize,
      quantity,
    });
    alert("✅ Product added to cart successfully!");
  };

  const handleBuyNow = () => {
    if (product.sizes && !selectedSize) {
      alert("Please select a size");
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: images[0],
      description: product.description,
      selectedSize,
      quantity,
    });
    navigate('/AddToCartPage');
  };

  return (
    <div className="page-wrap product-detail-page">
      <div className="pd-grid">
        {/* Gallery */}
        <div className="pd-gallery">
          <div className="pd-thumbs">
            {images.map((img, idx) => (
              <button
                key={idx}
                className={`pd-thumb ${activeImage === idx ? 'active' : ''}`}
                onClick={() => setActiveImage(idx)}
              >
                <img
                  src={img}
                  alt={`${product.title} ${idx + 1}`}
                  onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
                />
              </button>
            ))}
          </div>
          <div className="pd-main-image">
            <img
              src={images[activeImage] || FALLBACK_IMG}
              alt={product.title}
              onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
            />
          </div>
        </div>

        {/* Details */}
        <div className="pd-details">
          {product.brand && <div className="pd-brand">{product.brand}</div>}
          <h1>{product.title}</h1>

          {product.rating && (
            <div className="pd-rating-row">
              <span className="rating-badge">{product.rating} ★</span>
              <span className="pd-rating-count">{product.ratingCount?.toLocaleString?.()} ratings</span>
            </div>
          )}

          <div className="pd-price-row">
            <span className="pd-price">₹{product.price.toLocaleString()}</span>
            {product.mrp > product.price && (
              <>
                <span className="pd-mrp">₹{product.mrp.toLocaleString()}</span>
                <span className="pd-discount">{product.discount}% off</span>
              </>
            )}
          </div>

          {product.sizes && (
            <div className="pd-section">
              <h4>Select Size</h4>
              <div className="pd-size-row">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`pd-size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pd-section">
            <h4>Quantity</h4>
            <div className="pd-qty-row">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <div className="pd-buttons">
            <button className="btn-addcart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn-buynow" onClick={handleBuyNow}>Buy Now</button>
          </div>

          <div className="pd-section">
            <h4>Product Description</h4>
            <p>{product.description || "Premium quality product with comfortable fit and stylish design."}</p>
          </div>

          {product.highlights && (
            <div className="pd-section">
              <h4>Highlights</h4>
              <ul className="pd-highlights">
                {product.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <>
          <div className="section-header">
            <h2>You may also like</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
