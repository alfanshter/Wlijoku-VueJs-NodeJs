const db = require('../config/db'); // Menggunakan MySQL2 dengan Promise

// Get Keranjang
exports.getKeranjang = async (req, res) => {
  const query = `
    SELECT keranjang.id, products.gambar, products.name AS nama, 
           keranjang.alamat, keranjang.jumlah_pemesanan, products.harga 
    FROM keranjang 
    JOIN products ON keranjang.sayur_id = products.id`;
  
  try {
    const [results] = await db.query(query); // Menggunakan await untuk query
    res.status(200).json(results);
  } catch (err) {
    console.error("Gagal mengambil data keranjang:", err);
    res.status(500).json({ message: "Gagal mengambil data keranjang" });
  }
};

// Tambah Keranjang
exports.tambahKeranjang = async (req, res) => {
  const { sayur_id, jumlah_pemesanan, alamat, gambar } = req.body;

  if (!sayur_id || !jumlah_pemesanan || !alamat || !gambar) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const query = `
    INSERT INTO keranjang (sayur_id, jumlah_pemesanan, alamat, gambar) 
    VALUES (?, ?, ?, ?)`;
  
  try {
    await db.query(query, [sayur_id, jumlah_pemesanan, alamat, gambar]); // Menggunakan await untuk query
    res.status(201).json({ message: "Berhasil ditambahkan ke keranjang!" });
  } catch (err) {
    console.error("Gagal menambahkan ke keranjang:", err);
    res.status(500).json({ message: "Gagal menambahkan ke keranjang" });
  }
};

// Hapus Keranjang
exports.hapusKeranjang = async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM keranjang WHERE id = ?';
  
  try {
    const [result] = await db.query(query, [id]); // Menggunakan await untuk query
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Item tidak ditemukan" });
    }

    // Ambil ulang data keranjang setelah penghapusan
    const refreshQuery = `
      SELECT keranjang.id, products.gambar, products.name AS nama, 
             keranjang.alamat, keranjang.jumlah_pemesanan, products.harga 
      FROM keranjang 
      JOIN products ON keranjang.sayur_id = products.id`;

    const [updatedResults] = await db.query(refreshQuery); // Menggunakan await untuk query
    res.status(200).json(updatedResults);
  } catch (err) {
    console.error("Gagal menghapus item dari keranjang:", err);
    res.status(500).json({ message: "Gagal menghapus item dari keranjang" });
  }
};

// Hapus Semua Keranjang
exports.hapusSemuaKeranjang = async (req, res) => {
  try {
    await db.query("DELETE FROM keranjang"); // Menggunakan await untuk query
    res.json({ message: "Semua item keranjang berhasil dihapus" });
  } catch (err) {
    console.error("Gagal menghapus semua keranjang:", err);
    res.status(500).json({ message: "Gagal menghapus semua keranjang" });
  }
};
