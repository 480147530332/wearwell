import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  //Add to cart with quantity logic
const addToCart = (item) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((product) => product.id === item.id);
    if (existingItem) {
      return prevCart.map((product) =>
        product.id === item.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    } else {
      return [...prevCart, { ...item, quantity: 1 }];
    }
  });
};

// cart beig
const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);


  //  Clear the cart
  const clearCart = () => {
    setCart([]);
  };


  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };


const increaseQty = (id) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQty = (id) => {
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0) // remove if 0
  );
};


  return (
    <CartContext.Provider
  value={{ cart, addToCart, clearCart, removeFromCart, increaseQty, decreaseQty ,totalCartQuantity}}
>

      {children}
    </CartContext.Provider>
  );
};
