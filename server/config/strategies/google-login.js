const User = require('../../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
  const callbackURL = process.env.GOOGLE_CALLBACK_URL || `${process.env.BACKEND_URL || 'http://localhost:8080'}/api/auth/google/callback`;

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile?.emails?.[0]?.value?.toLowerCase();
      const picture = profile?.photos?.[0]?.value;

      if (!email) {
        return done(new Error('Google account did not return an email address.'), null);
      }

      // Check if user already exists
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        // Update last login
        if (picture) user.picture = picture;
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }
      
      // Check if user exists with same email but different auth method
      user = await User.findOne({ email });
      
      if (user) {
        // Link Google account to existing user
        user.googleId = profile.id;
        if (picture) user.picture = picture;
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }
      
      // Create new user
      user = new User({
        googleId: profile.id,
        name: profile.displayName || email.split('@')[0],
        email,
        username: email.split('@')[0] + '_' + Date.now(), // Generate unique username
        picture: picture || undefined,
        isEmailVerified: true // Google emails are verified
      });
      
      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
};
