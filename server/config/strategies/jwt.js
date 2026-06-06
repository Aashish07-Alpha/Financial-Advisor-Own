const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../../models/User');

const customExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['token'];
  }
  if (!token) {
    token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  }
  return token;
};

module.exports = (passport) => {
  passport.use(new JwtStrategy({
    jwtFromRequest: customExtractor,
    secretOrKey: process.env.JWT_SECRET
  }, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }));
};
