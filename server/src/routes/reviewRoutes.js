const express = require('express');
const router = express.Router();
const { getReviews, createReview, deleteReview, updateReview } = require('../controllers/reviewController');
const { requireAuth } = require('../middleware/auth');

// Public route - Get all reviews
router.get('/', getReviews);

// Protected routes - Admin only
router.post('/', requireAuth, createReview);
router.put('/:id', requireAuth, updateReview);
router.delete('/:id', requireAuth, deleteReview);

module.exports = router;
