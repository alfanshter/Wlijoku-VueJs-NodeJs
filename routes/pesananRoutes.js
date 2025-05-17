const express = require('express');
const router = express.Router();
const PesananController = require('../controllers/pesananController');


// ===== ROUTES =====
router.get('/', PesananController.getAllPesanan);
router.post('/', PesananController.addPesanan);

module.exports = router;
