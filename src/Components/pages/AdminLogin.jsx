import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('https://wearwell-api.vercel.app/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.admin) {
        localStorage.setItem('admin', JSON.stringify(data.admin));
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.formBox}>
        <h2>Admin Login</h2>
        <input type="email" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={styles.input} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin} disabled={loading} style={styles.btn}>
          {loading ? "Logging in..." : "Login as Admin"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' },
  formBox: { padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '350px', textAlign: 'center' },
  input: { width: '100%', padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' },
  btn: { width: '100%', padding: '12px', background: '#333', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px' }
};

export default AdminLogin;