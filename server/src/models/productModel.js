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
  price: { type: Number, required: false },
  address: { type: String },
  location: { type: LocationSchema },
  ownerId: { type: String, required: false },
  isSold: { type: Boolean, default: false },

  // Rental / listing fields
  listingType: { type: String, enum: ['sale', 'rent'], default: 'sale' }, // 'sale' or 'rent'
  rentalType: { type: String, required: false }, // e.g. 'machine', 'vehicle', 'shop', 'room'
  rentalStatus: { type: String, enum: ['available', 'rented'], default: 'available' },
  rentalPrice: { type: Number, required: false },

  // Unit fields for quantity and price
  quantityUnit: { type: String, required: false }, // e.g. kg, piece, etc.
  quantityMode: { type: String, enum: ['item', 'combo'], required: false }, // used for rent
  priceUnit: { type: String, required: false },
}, {
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

module.exports = mongoose.model('Product', ProductSchema);
