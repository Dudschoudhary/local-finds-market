const Review = require('../models/reviewModel');

// Admin phone number that can upload reviews
const ADMIN_PHONE = '9587449072';

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private (Admin only - phone: 9587449072)
const createReview = async (req, res) => {
  try {
    const { description, name, address } = req.body;

    // Check if user is admin
    if (!req.user || req.user.contactNumber !== ADMIN_PHONE) {
      return res.status(403).json({ message: 'Access denied. Only admin can add reviews.' });
    }

    if (!description || !name || !address) {
      return res.status(400).json({ message: 'Please provide all fields: description, name, address' });
    }

    const review = await Review.create({
      description,
      name,
      address,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private (Admin only)
const deleteReview = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.contactNumber !== ADMIN_PHONE) {
      return res.status(403).json({ message: 'Access denied. Only admin can delete reviews.' });
    }

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    await review.deleteOne();
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private (Admin only)
const updateReview = async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user || req.user.contactNumber !== ADMIN_PHONE) {
      return res.status(403).json({ message: 'Access denied. Only admin can update reviews.' });
    }

    const { description, name, address } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.description = description || review.description;
    review.name = name || review.name;
    review.address = address || review.address;

    const updatedReview = await review.save();
    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getReviews,
  createReview,
  deleteReview,
  updateReview,
};
