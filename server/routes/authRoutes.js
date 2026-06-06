const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/AuthController');

// Google OAuth routes
router.get('/google', (req, res, next) => {
  console.log('🔍 GET /api/auth/google route hit. Initiating redirect to Google consent screen...');
  console.log('   Headers Info - Origin:', req.headers.origin || 'None', 'Referer:', req.headers.referer || 'None');
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req, res, next) => {
  console.log('🔍 GET /api/auth/google/callback route hit.');
  console.log('   Query parameters:', {
    code: req.query.code ? 'PRESENT (Auth Code)' : 'NOT PRESENT',
    state: req.query.state ? 'PRESENT (CSRF State)' : 'NOT PRESENT',
    error: req.query.error || 'None'
  });
  next();
},
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=google_auth_failed`
  }),
  authController.googleCallback
);

// Email/Password authentication routes
router.post('/login', 
  passport.authenticate('local', { session: false }),
  authController.login
);

router.post('/register', authController.register);

// User management routes
router.get('/user',
  passport.authenticate('jwt', { session: false }),
  authController.getUser
);

router.post('/logout', authController.logout);

router.get('/verify',
  authController.verifyToken
);

// Profile update route
router.put('/profile',
  passport.authenticate('jwt', { session: false }),
  authController.updateProfile
);

// Temporarily comment out error handling to see actual errors
// router.use((error, req, res, next) => {
//   console.error('❌ Auth route error:', error);
//   res.status(500).json({ message: 'Internal server error' });
// });

module.exports = router;
