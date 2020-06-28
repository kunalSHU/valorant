const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { validationResult } = require('express-validator');

const httpStatusCode = require('../utils/http-status-code');
const jwtSecret = require('../environment-config.json').middlewares.authentication.jwtSecret;

const validateNewUserInput = require('../input-validators/new-user-validator.js');

const defaultTokenExpiryTimeMs = require('../environment-config.json').middlewares.authentication
  .defaultTokenExpiryTimeMs;

const users = [];

router.post('/register', validateNewUserInput, (req, res) => {
  const inputValidationErrors = validationResult(req);
  if (inputValidationErrors.errors.length !== 0) {
    res.status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY).json({ errors: inputValidationErrors.array() });
  } else {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    const currDate = new Date().getTime();
    const sessionJwtToken = jwt.sign({ currDate }, process.env.JWT_SECRET || jwtSecret, {
      expiresIn: defaultTokenExpiryTimeMs
    });

    const newUser = {
      name,
      email,
      hashedPassword,
      sessionJwtToken
    };

    users.push(newUser);
    res.status(httpStatusCode.OK).json({ auth: true, ...newUser });
  }
});

module.exports = router;
