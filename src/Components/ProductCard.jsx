import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './context/CartContext';
import { AuthContext } from './context/AuthContext';
import './ProductCard.css';

const FALLBACK_IMG = "https://via.placeholder.com/700x700.png?text=WearWell";

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!product) return null;

  const {
    id, title, price, mrp, discount, rating, ratingCount, images,
  } = product;

  const image = (images && images[0]) || product.image || FALLBACK_IMG;

  const goToDetail = () => {
    navigate(`/product/${id}`, { state: { product } });
  };

  const requireLogin = () => {
    if (!user) {
      navigate('/login');
      return true;
    }
    return false;
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (requireLogin()) return;
    addToCart({ id, title, price, image, description: product.description });
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (requireLogin()) return;
    addToCart({ id, title, price, image, description: product.description });
    navigate('/AddToCartPage');
  };

  return (
    <div className="pc-card" onClick={goToDetail}>
      <div className="pc-image-wrap">
        <img
          src={image}
          alt={title}
          className="pc-image"
          onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
        />
        {discount > 0 && <span className="pc-discount-tag">{discount}% OFF</span>}
      </div>

      <div className="pc-body">
        <h5 className="pc-title">{title}</h5>

        {rating && (
          <div className="pc-rating-row">
            <span className="rating-badge">{rating} ★</span>
            <span className="pc-rating-count">({ratingCount?.toLocaleString?.() || ratingCount})</span>
          </div>
        )}

        <div className="pc-price-row">
          <span className="pc-price">₹{price?.toLocaleString?.() || price}</span>
          {mrp && mrp > price && <span className="pc-mrp">₹{mrp.toLocaleString()}</span>}
          {discount > 0 && <span className="pc-discount-text">{discount}% off</span>}
        </div>

        <div className="pc-buttons">
          <button className="btn-addcart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn-buynow" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
