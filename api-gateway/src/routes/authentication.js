const router = require('express').Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const httpStatusCode = require('../utils/http-status-code');

const jwtSecret = require('../environment-config.json').middlewares.authentication.jwtSecret;

const defaultTokenExpiryTimeMs = require('../environment-config.json').middlewares.authentication
  .defaultTokenExpiryTimeMs;

const users = [];

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const currDate = new Date().getTime();
  const jwtToken = jwt.sign({ currDate }, jwtSecret, { expiresIn: defaultTokenExpiryTimeMs });

  const newUser = {
    name,
    email,
    hashedPassword,
    jwtToken
  };

  users.push(newUser);
  res.status(httpStatusCode.OK).json({ auth: true, newUser });
});

module.exports = router;
