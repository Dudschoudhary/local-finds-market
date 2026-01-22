const Product = require('../models/productModel');
const cloudinary = require('cloudinary').v2;

// Configure cloudinary if env vars present
if (process.env.CLOUDINARY_URL) {
  cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const CLOUDINARY_ENABLED = !!(process.env.CLOUDINARY_URL || (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET));

// GET /api/products
const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skip = (page - 1) * limit;

    const { q, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (q) {
      filter.$or = [
        { productName: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { sellerName: { $regex: q, $options: 'i' } },
      ];
    }

    if (category) filter.category = category;
    if (minPrice) filter.price = Object.assign({}, filter.price, { $gte: Number(minPrice) });
    if (maxPrice) filter.price = Object.assign({}, filter.price, { $lte: Number(maxPrice) });

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).exec();

    res.json({ data: products, meta: { total, page, limit } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/products/:id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).exec();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/products
const createProduct = async (req, res) => {
  try {
    const payload = req.body;
    
    // Debug logging
    console.log('Create product request received');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body keys:', payload ? Object.keys(payload) : 'NO BODY');
    
    // Check if body is empty
    if (!payload || Object.keys(payload).length === 0) {
      console.log('ERROR: Request body is empty or not parsed');
      return res.status(400).json({ 
        message: 'Request body is empty. Please check Content-Type header and body size.',
        missingFields: ['entire request body']
      });
    }
    
    // Check each required field individually
    const missingFields = [];
    if (!payload.productName) missingFields.push('productName');
    if (!payload.sellerName) missingFields.push('sellerName');
    if (!payload.contactNumber) missingFields.push('contactNumber');
    
    if (missingFields.length > 0) {
      console.log('Validation failed - Missing fields:', missingFields);
      console.log('Received payload:', { 
        productName: payload.productName || '(missing)', 
        sellerName: payload.sellerName || '(missing)', 
        contactNumber: payload.contactNumber || '(missing)'
      });
      return res.status(400).json({ 
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields: missingFields
      });
    }

    // Determine listing type (default sale)
    payload.listingType = payload.listingType || 'sale';

    // Validate price/rentalPrice based on listing type
    if (payload.listingType === 'sale') {
      if (payload.price == null) {
        return res.status(400).json({ message: 'Price is required for sale listings' });
      }
    } else if (payload.listingType === 'rent') {
      if (payload.rentalPrice == null) {
        return res.status(400).json({ message: 'rentalPrice is required for rent listings' });
      }
      // ensure rental status has a default
      payload.rentalStatus = payload.rentalStatus || 'available';
    }

    // If authentication middleware attached a user, link ownerId
    if (req.user && req.user.id) {
      payload.ownerId = req.user.id;
    }

    // If images are sent as data URIs and Cloudinary is configured, upload them
    if (Array.isArray(payload.images) && payload.images.length > 0 && CLOUDINARY_ENABLED) {
      const uploaded = [];
      for (const img of payload.images) {
        if (typeof img === 'string' && img.startsWith('data:')) {
          try {
            const result = await cloudinary.uploader.upload(img, { folder: 'localmart/products' });
            uploaded.push(result.secure_url || result.url);
          } catch (err) {
            console.error('Cloudinary upload failed for one image, keeping original data URL', err);
            // Fallback: keep original (will be large). Alternatively you could reject the request.
            uploaded.push(img);
          }
        } else {
          uploaded.push(img);
        }
      }
      payload.images = uploaded;
    }

    const product = new Product(payload);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/products/:id
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findById(id).exec();
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Ownership enforcement: if product has an ownerId, only that owner may update
    if (product.ownerId) {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (String(product.ownerId) !== String(req.user.id)) {
        return res.status(403).json({ message: 'Forbidden: you are not the owner of this product' });
      }
    }

    // Prevent changing ownerId through updates
    if (updates.ownerId) delete updates.ownerId;

    // If product is already sold, disallow edits except allowing owner to set isSold=false explicitly (optional)
    if (product.isSold) {
      return res.status(400).json({ message: 'Cannot edit a sold product' });
    }

    const updated = await Product.findByIdAndUpdate(id, updates, { new: true }).exec();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).exec();
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Only owner may delete
    if (product.ownerId) {
      if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });
      if (String(product.ownerId) !== String(req.user.id)) {
        return res.status(403).json({ message: 'Forbidden: you are not the owner of this product' });
      }
    }

    await Product.findByIdAndDelete(id).exec();
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/products/:id/sell  - mark as sold (owner only)
const markAsSold = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).exec();
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.ownerId) {
      if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });
      if (String(product.ownerId) !== String(req.user.id)) {
        return res.status(403).json({ message: 'Forbidden: you are not the owner of this product' });
      }
    }

    if (product.isSold) return res.status(400).json({ message: 'Product already marked as sold' });

    product.isSold = true;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/products/:id/rent - mark as rented (owner only)
const markAsRented = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).exec();
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Ensure this is a rental listing
    if (product.listingType !== 'rent') {
      return res.status(400).json({ message: 'Product is not a rental listing' });
    }

    if (product.ownerId) {
      if (!req.user || !req.user.id) return res.status(401).json({ message: 'Unauthorized' });
      if (String(product.ownerId) !== String(req.user.id)) {
        return res.status(403).json({ message: 'Forbidden: you are not the owner of this product' });
      }
    }

    if (product.rentalStatus === 'rented') return res.status(400).json({ message: 'Product already marked as rented' });

    product.rentalStatus = 'rented';
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  markAsSold,
  markAsRented,
};
