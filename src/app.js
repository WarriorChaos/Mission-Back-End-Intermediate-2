require('dotenv').config();

const express = require('express');
const courseRoutes = require('./routes/courseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Membaca request body dalam format JSON
app.use(express.json());

// Endpoint utama kursus
app.use('/course', courseRoutes);

// Endpoint untuk mengecek server
app.get('/', (req, res) => {
  res.json({ message: 'API VidioBelajar berjalan!' });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});