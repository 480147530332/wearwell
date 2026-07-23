import React, { createContext, useState, useEffect } from 'react';
import api from '../../services/api';   // Make sure this path is correct

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/api/auth/login', { 
        email, 
        password 
      });

      if (res.data?.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        console.log("✅ Login Successful:", res.data.user);
        return res.data;
      } else {
        return { 
          success: false, 
          message: res.data?.message || "Invalid credentials" 
        };
      }
    } catch (error) {
      console.error("Login Error:", error);
      
      const errorMessage = error.response?.data?.message 
                        || error.message 
                        || "Network error. Please try again.";
      
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/api/auth/register', { 
        name, 
        email, 
        password 
      });

      if (res.data?.user) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
        return res.data;
      } else {
        return { 
          success: false, 
          message: res.data?.message || "Registration failed" 
        };
      }
    } catch (error) {
      console.error("Register Error:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Registration failed" 
      };
    }
  };

  const googleLogin = async () => {
    try {
      // Implement Google login logic here later
      console.log("Google login clicked");
      return { success: false, message: "Google login not implemented yet" };
    } catch (error) {
      console.error("Google Login Error:", error);
      return { success: false, message: "Google login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        googleLogin, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};