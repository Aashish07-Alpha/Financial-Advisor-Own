const User = require('../../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
  const rawBackendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
  const backendUrl = rawBackendUrl.replace(/\/$/, "");
  const callbackURL = (process.env.GOOGLE_CALLBACK_URL || `${backendUrl}/api/auth/google/callback`).replace(/\/$/, "");

  console.log('⚙️ Google Strategy configuration details:');
  console.log('  - Raw Backend URL:', rawBackendUrl);
  console.log('  - Normalized Backend URL:', backendUrl);
  console.log('  - Configured Callback URL:', callbackURL);
  console.log('  - Client ID status:', process.env.GOOGLE_CLIENT_ID ? 'SET' : 'NOT SET');
  console.log('  - Client Secret status:', process.env.GOOGLE_CLIENT_SECRET ? 'SET' : 'NOT SET');

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.warn('⚠️ WARNING: Google Client ID or Secret is not configured. OAuth redirect may fail.');
  }

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'placeholder-client-id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'placeholder-client-secret',
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
