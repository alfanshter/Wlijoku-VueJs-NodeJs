const db = require('../config/db');
const path = require('path');
const fs = require('fs');

// GET semua produk
const getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products');
    res.status(200).json({
      message: 'Data produk berhasil diambil',
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Gagal mengambil data produk',
      error: err.message,
    });
  }
};

// GET satu produk
const getProduct = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST produk baru
const createProduct = async (req, res) => {
  try {
    const { name, harga, is_ready, rak } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Gambar tidak ditemukan' });
    }

    const mediaFile = req.file.path.replace(/^public[\\/]/, '').replace(/\\/g, '/');

    const [result] = await db.query(
      'INSERT INTO products (name, harga, is_ready, gambar, rak) VALUES (?, ?, ?, ?, ?)',
      [name, harga, is_ready, mediaFile, rak]
    );

    res.status(201).json({
      message: 'Produk berhasil ditambahkan',
      productId: result.insertId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update produk
const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { kode, name, harga, rak, is_ready } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    const produkLama = rows[0];
    if (!produkLama) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    let gambarBaru = produkLama.gambar;
    if (req.file) {
      const pathLama = path.join(__dirname, '../public', produkLama.gambar);
      if (fs.existsSync(pathLama)) fs.unlinkSync(pathLama);

      gambarBaru = req.file.path.replace(/^public[\\/]/, '').replace(/\\/g, '/');
    }

    await db.query(
      'UPDATE products SET kode=?, name=?, harga=?, gambar=?, is_ready=?, rak=? WHERE id=?',
      [kode, name, harga, gambarBaru, is_ready, rak, id]
    );

    res.json({ message: 'Produk berhasil diupdate' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal update produk', error: err.message });
  }
};

// DELETE produk
const deleteProduct = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    const produk = rows[0];

    if (!produk) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    // Hapus file gambar
    const filePath = path.join(__dirname, '../public', produk.gambar);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    const [result] = await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);

    res.json({ message: 'Produk berhasil dihapus', affectedRows: result.affectedRows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
