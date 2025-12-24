const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      // Find user by email
      const user = await User.findOne({ email: email.toLowerCase() });
      
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // Check if user has password (not Google OAuth only)
      if (!user.password) {
        return done(null, false, { message: 'Please login with Google' });
      }
      
      // Verify password
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }
      
      // Update last login
      user.lastLogin = new Date();
      await user.save();
      
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
};
