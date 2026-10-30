require('dotenv').config();
const pool = require('./config/database');

async function testConnection() {
  try {
    const connection = await pool.getConnection();

    console.log('Koneksi ke database berhasil!');
    console.log('Database:', process.env.DB_NAME);

    connection.release();
    await pool.end();
  } catch (error) {
    console.error('Koneksi database gagal:', error.message);
    process.exitCode = 1;
  }
}

testConnection();