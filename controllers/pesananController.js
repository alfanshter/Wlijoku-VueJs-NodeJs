const db = require('../config/db');

// Ambil semua pesanan
exports.getAllPesanan = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM pesanan');
    res.status(200).json({ message: 'Data pesanan berhasil diambil', data: results });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data pesanan', error: err });
  }
};


// Tambah pesanan baru
exports.addPesanan = (req, res) => {
  const { id_keranjang } = req.body;

 
 return res.status(200).json({ message: 'Data pesanan tidak lengkap!' });


  if (!nama_sayur || !jumlah_pemesanan || !alamat) {
    return res.status(400).json({ message: 'Data pesanan tidak lengkap!' });
  }

  const query = 'INSERT INTO pesanan (nama_sayur, jumlah_pemesanan, alamat, total_harga) VALUES (?, ?, ?, ?)';
  db.query(query, [nama_sayur, jumlah_pemesanan, alamat, total_harga], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Gagal menambahkan pesanan', error: err });
    }
    res.status(201).json({ message: 'Pesanan berhasil ditambahkan', data: { id: result.insertId, ...req.body } });
  });
};
