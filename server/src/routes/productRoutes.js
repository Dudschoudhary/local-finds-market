const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  markAsSold,
  markAsRented,
} = require('../controllers/productController');
const { requireAuth } = require('../middleware/auth');

// GET /api/products - list, with optional query params for pagination/search
router.get('/', getProducts);
// GET /api/products/:id
router.get('/:id', getProductById);
// POST /api/products - requires auth
router.post('/', requireAuth, createProduct);
// PUT /api/products/:id - requires auth
router.put('/:id', requireAuth, updateProduct);
// DELETE /api/products/:id - requires auth
router.delete('/:id', requireAuth, deleteProduct);
// POST /api/products/:id/sell - mark as sold (owner only)
router.post('/:id/sell', requireAuth, markAsSold);
// POST /api/products/:id/rent - mark rental as rented (owner only)
router.post('/:id/rent', requireAuth, markAsRented);

module.exports = router;
