const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
};

const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  // Check if the token has expired
  if (Date.now() > payload.exp) {
    return done(null, false, { message: 'Token has expired' });
  }
  
  // Check if the user exists
  const user = findUser(payload.sub);
  if (!user) {
    return done(null, false, { message: 'User not found' });
  }
  
  // Authenticate the request
  return done(null, user);
});

passport.use(jwtStrategy);
