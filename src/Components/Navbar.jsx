import React, { useContext, useState } from 'react';

import { AuthContext } from './context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faBars, faTimes, faSignOutAlt, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './context/CartContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout } = useContext(AuthContext);
  const { totalCartQuantity } = useContext(CartContext);

  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate('/login');
  };

  const handleCartClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/AddToCartPage');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    closeMenu();
    navigate(`/shop${searchTerm ? `?q=${encodeURIComponent(searchTerm)}` : ''}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/Home" className="navbar-logo" onClick={closeMenu}>
          Wear<span>Well</span>
        </Link>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </div>

        <div className="navbar-actions">
          {!user ? (
            <Link to="/login" className="navbar-login-btn" onClick={closeMenu}>
              <FontAwesomeIcon icon={faUser} /> Login
            </Link>
          ) : (
            <span className="navbar-user" onClick={handleLogout} title="Logout">
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </span>
          )}

          <div className="navbar-cart" onClick={handleCartClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
            {totalCartQuantity > 0 && <span className="cart-badge">{totalCartQuantity}</span>}
            <span className="navbar-cart-label">Cart</span>
          </div>
        </div>
      </div>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/Home" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/women" onClick={closeMenu}>Women</Link></li>
        <li><Link to="/men" onClick={closeMenu}>Men</Link></li>
        <li><Link to="/shop" onClick={closeMenu}>Shop</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li className="navbar-links-mobile-only">
          {!user ? (
            <Link to="/login" onClick={closeMenu}>Login</Link>
          ) : (
            <span onClick={handleLogout}>Logout</span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
