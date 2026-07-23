const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: true,           // Allow all for now (safe for single project)
  credentials: true
}));

app.use(express.json());

// Import your routes
const authRoutes = require('../routes/authRoutes'); // Change path if needed

app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);

app.get('/api', (req, res) => {
  res.json({ message: "✅ Backend is working!" });
});

module.exports = app;