// Simple authentication middleware for demo purposes
// Accepts either Authorization: Bearer <userId> or x-user-id header

const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const auth = req.headers.authorization || req.headers['x-user-id'];
  if (!auth) {
    return res.status(401).json({ message: 'Unauthorized: missing credentials' });
  }

  let userId = null;
  if (typeof auth === 'string' && auth.startsWith('Bearer ')) {
    userId = auth.slice(7).trim();
  } else if (typeof auth === 'string') {
    userId = auth;
  }

  if (!userId) return res.status(401).json({ message: 'Unauthorized: invalid credentials' });

  try {
    // Fetch user from database to get contactNumber
    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized: user not found' });
    }
    
    // Attach user object with contactNumber to req
    req.user = { id: userId, contactNumber: user.contactNumber, name: user.name };
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: invalid credentials' });
  }
};

module.exports = { requireAuth };
