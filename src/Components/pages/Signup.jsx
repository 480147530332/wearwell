import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError('');
    setLoading(true);

    if (!name || !email || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const data = await register(name, email, password);

    if (data.message?.includes("successfully")) {
      alert("✅ Account created successfully! Please login now.");
      navigate('/login');
    } else {
      setError(data.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-left">
          <h2>Looks like you're new here!</h2>
          <p>Sign up to start shopping and enjoy exclusive deals on WearWell.</p>
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80&auto=format"
            alt="Shopping"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="auth-right">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSignup()}
          />

          {error && <div className="auth-error">{error}</div>}

          <p className="auth-terms">
            By continuing, you agree to WearWell's Terms of Use and Privacy Policy.
          </p>

          <button className="auth-primary-btn" onClick={handleSignup} disabled={loading}>
            {loading ? "Creating..." : "Sign Up"}
          </button>

          <p className="auth-switch">
            Already have an account?
            <span onClick={() => navigate('/login')}> Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
