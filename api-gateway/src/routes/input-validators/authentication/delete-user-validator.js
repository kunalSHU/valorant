const { body } = require('express-validator');

module.exports = [
  body('email', 'Please provide a valid email address')
    .notEmpty()
    .withMessage('Empty email provided')
    .isEmail()
    .normalizeEmail(),
  body('sessionJwtToken', 'Invalid token provided')
    .notEmpty()
    .withMessage('Empty session JWT token provided')
    .isString()
];
