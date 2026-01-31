const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  description: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Review', ReviewSchema);
