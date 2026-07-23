import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);

      if (data?.user) {
        navigate('/');
      } else {
        setError(data?.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err?.response?.data?.message ||
                err?.message ||
                "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const data = await googleLogin();

      if (data?.user) {
        navigate('/');
      } else {
        setError(data?.message || "Google login failed");
      }
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h2>Login</h2>
          <p>Get access to your Orders, Wishlist and Recommendations</p>
          <img
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500&q=80&auto=format"
            alt="Shopping"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="auth-right">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          />

          {error && <div className="auth-error">{error}</div>}

          <p className="auth-terms">
            By continuing, you agree to WearWell's Terms of Use and Privacy Policy.
          </p>

          <button className="auth-primary-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <button className="auth-secondary-btn" onClick={handleGoogleLogin} disabled={loading}>
            Continue with Google
          </button>

          <p className="auth-switch">
            New to WearWell?
            <span onClick={() => navigate('/signup')}> Create an account</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
