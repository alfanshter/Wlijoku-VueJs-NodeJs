const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'alfan123', // ganti jika pakai password
  database: 'wlijoku',
});

// Test koneksi saat startup
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ Connected to MySQL database');
    connection.release(); // lepas koneksi kembali ke pool
  } catch (error) {
    console.error('❌ Failed to connect to MySQL:', error.message);
  }
})();

module.exports = db;
