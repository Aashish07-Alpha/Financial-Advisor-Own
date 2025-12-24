const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to ensure user is authenticated
const ensureAuthenticated = async (req, res, next) => {
  try {
    // Check for token in cookies first (primary method)
    let token = req.cookies?.token;
    
    // If no token in cookies, check Authorization header
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      } else {
        // Handle case where frontend sends user ID instead of JWT
        const userId = authHeader.replace('Bearer ', '');
        if (userId && userId !== 'anonymous') {
          // Find user by ID or email
          const user = await User.findOne({
            $or: [
              { _id: userId },
              { email: userId },
              { id: userId }
            ]
          });
          if (user) {
            req.user = user;
            return next();
          }
        }
      }
    }
    
    // If no token found, allow the request but set user as null
    if (!token) {
      req.user = null;
      return next();
    }
    
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user
      const user = await User.findById(decoded.sub);
      if (!user) {
        req.user = null;
        return next();
      }
      
      // Set user in request
      req.user = user;
      next();
    } catch (jwtError) {
      console.log('JWT verification failed, trying alternative auth...');
      // If JWT fails, try to find user by the token as user ID
      const user = await User.findOne({
        $or: [
          { _id: token },
          { email: token },
          { id: token }
        ]
      });
      
      if (user) {
        req.user = user;
        next();
      } else {
        req.user = null;
        next();
      }
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    // Don't block the request, just set user as null
    req.user = null;
    next();
  }
};

// Middleware to require authentication
const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  next();
};

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  
  next();
};

module.exports = {
  ensureAuthenticated,
  requireAuth,
  requireAdmin
};
