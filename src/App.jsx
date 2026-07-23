import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import About from './Components/pages/About';
import ProductDetail from './Components/pages/ProductDetail';

import { Women } from './Components/pages/Women';
import Shop from './Components/pages/Shop';
import Men from './Components/pages/Men';
import Login from './Components/pages/Login';
import Home from './Components/pages/Home';
import Footer from './Components/footer/Footer';
import AddToCartPage from './Components/pages/AddToCartPage';
import "./App.css"
import Signup from './Components/pages/Signup';
import AdminLogin from './Components/pages/AdminLogin';
import AdminDashboard from './Components/pages/AdminDashboard';
const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ minHeight: '85vh', paddingTop: '108px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/product/:id"
            element={<ProductDetail />}
          />
          <Route path="/AddToCartPage" element={<AddToCartPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
