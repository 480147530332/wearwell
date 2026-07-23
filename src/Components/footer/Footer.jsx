import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We create sustainable, ethical, and beautiful fashion for everyone.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/men">Men</Link></li>
            <li><Link to="/women">Women</Link></li>
            <li><Link to="/AddToCartPage">Cart</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email  : shopping@gmail.com</p>
          <p>Phone : +91 9326655349</p>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Your E-Commerce | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
