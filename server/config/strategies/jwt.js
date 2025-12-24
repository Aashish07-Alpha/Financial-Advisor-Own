const { Strategy: JwtStrategy } = require('passport-jwt');
const User = require('../../models/User');

const cookieExtractor = req => req.cookies?.token;

module.exports = (passport) => {
  passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
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
