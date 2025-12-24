const passport = require('passport');

// Import strategies
require('./strategies/google-login')(passport); // Google OAuth enabled
require('./strategies/jwt')(passport);
require('./strategies/local')(passport);

module.exports = passport;
