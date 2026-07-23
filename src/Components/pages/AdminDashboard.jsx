import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; // Create this file

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminData = localStorage.getItem('admin');
    if (!adminData) {
      navigate('/admin/login');
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>WearWell Admin</h2>
        <ul>
          <li onClick={() => navigate('/admin/dashboard')}>Dashboard</li>
          <li onClick={() => navigate('/admin/products')}>Products</li>
          <li onClick={() => navigate('/admin/orders')}>Orders</li>
          <li onClick={() => navigate('/admin/users')}>Users</li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="header">
          <h1>Welcome, {admin?.name}</h1>
          <p>Admin Dashboard</p>
        </div>

        <div className="stats">
          <div className="stat-card">
            <h3>Total Products</h3>
            <p>124</p>
          </div>
          <div className="stat-card">
            <h3>Total Orders</h3>
            <p>89</p>
          </div>
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>456</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p>₹2,45,890</p>
          </div>
        </div>

        <h2>Recent Orders</h2>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;