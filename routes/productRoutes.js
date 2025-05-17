const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const upload = require('../middlewares/UploadMiddleware');

// ===== ROUTES =====
router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', upload.single('gambar'), ProductController.createProduct);
router.put('/:id', upload.single('gambar'), ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
