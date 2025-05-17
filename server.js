const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();


// Routes
const keranjangRoutes = require('./routes/keranjangRoutes');
const productRoutes = require('./routes/productRoutes');
const pesananRoutes = require('./routes/pesananRoutes'); // Jika ada route pesanan

app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON request bodies
// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));// Ganti dengan path yang sesuai

// Rute untuk keranjang
app.use('/api/keranjang', keranjangRoutes);

// Rute untuk produk
app.use('/api/products', productRoutes);

// Rute untuk pesanan (jika ada)
app.use('/api/pesanan', pesananRoutes); // Ganti dengan nama route sesuai kebutuhan

// Jika ada endpoint lain seperti pesanan
// app.use('/api/pesanan', pesananRoutes); // Ganti dengan nama route sesuai kebutuhan

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});
