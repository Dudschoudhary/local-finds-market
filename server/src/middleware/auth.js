// Simple authentication middleware for demo purposes
// Accepts either Authorization: Bearer <userId> or x-user-id header

const requireAuth = (req, res, next) => {
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

  // Attach a minimal user object to req. In real app this would verify a JWT/session.
  req.user = { id: userId };
  next();
};

module.exports = { requireAuth };
