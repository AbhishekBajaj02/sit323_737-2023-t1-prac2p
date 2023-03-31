const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const app = express();

// Set up passport middleware
app.use(passport.initialize());

// Define JWT secret key
const secretKey = 'mySecretKey';

// Define authentication middleware
const authenticate = passport.authenticate('jwt', { session: false });

// Define authorization middleware
const authorize = (roles) => (req, res, next) => {
  const userRole = req.user.role;
  if (roles.includes(userRole)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
};

// Define JWT strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // Check if user exists
    const user = users.find((user) => user.id === jwtPayload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
);

// Example route handler with authentication and authorization middleware
app.get('/api/users/:id', authenticate, authorize(['admin']), (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (!user) {
    res.status(404).send('User not found');
  } else {
    res.json(user);
  }
});

// Example route handler for generating a JWT
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    res.status(401).send('Unauthorized');
  } else {
    const token = jwt.sign({ sub: user.id }, secretKey);
    res.json({ token });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
