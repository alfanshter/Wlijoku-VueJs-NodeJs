const express = require('express');
const router = express.Router();
const keranjangController = require('../controllers/keranjangController');

router.get('/', keranjangController.getKeranjang);
router.post('/', keranjangController.tambahKeranjang);
router.delete('/:id', keranjangController.hapusKeranjang);
router.delete('/', keranjangController.hapusSemuaKeranjang);

module.exports = router;
