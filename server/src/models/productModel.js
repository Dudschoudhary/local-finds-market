const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

const ProductSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  productName: { type: String, required: true },
  category: { type: String, required: true },
  quantity: { type: String },
  images: [{ type: String }],
  description: { type: String },
  price: { type: Number, required: true },
  address: { type: String },
  location: { type: LocationSchema },
  ownerId: { type: String, required: false },
  isSold: { type: Boolean, default: false },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Product', ProductSchema);
