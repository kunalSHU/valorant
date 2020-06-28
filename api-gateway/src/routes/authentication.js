const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { validationResult, body } = require('express-validator');

const authenticationController = require('../controllers/authentication-controller.js');

const httpStatusCode = require('../utils/http-status-code.js');
const jwtSecret = require('../environment-config.json').middlewares.authentication.jwtSecret;

const validateNewUserInput = require('../input-validators/new-user-validator.js');

const defaultTokenExpiryTimeMs = require('../environment-config.json').middlewares.authentication
  .defaultTokenExpiryTimeMs;

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

    const wasUserAdded = authenticationController.addUser(name, email, hashedPassword, sessionJwtToken);

    const newUser = {
      name,
      email,
      hashedPassword,
      sessionJwtToken
    };

    if (wasUserAdded === true) {
      res.status(httpStatusCode.CREATED).json({ message: 'User has been registered', newUser });
    } else {
      res.status(httpStatusCode.OK).json({ message: 'User already exists in DB' });
    }
  }
});

router.delete('/delete', [body('email', 'Email must be a valid address').isEmail().normalizeEmail()], (req, res) => {
  const inputValidationErrors = validationResult(req);
  if (inputValidationErrors.errors.length !== 0) {
    res.status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY).json({ errors: inputValidationErrors.array() });
  } else {
    const { email } = req.body;

    if (authenticationController.deleteUser(email) === true) {
      res.status(httpStatusCode.OK).json({ message: 'User has been deleted' });
    } else {
      res.status(httpStatusCode.OK).json({ message: 'User was not found in DB' });
    }
  }
});

module.exports = router;
