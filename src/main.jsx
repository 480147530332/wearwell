import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.jsx';
import { AuthProvider } from './Components/context/AuthContext.jsx'; 
import { CartProvider } from './Components/context/CartContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <CartProvider>
        
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
