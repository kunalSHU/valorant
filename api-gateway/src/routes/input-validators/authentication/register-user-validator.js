const { check } = require('express-validator');

const validatePassword = require('../password-validator.js');

module.exports = [
  check('name', 'Please enter a valid name')
    .isAlpha()
    .withMessage('Name must be alphabetic')
    .isLength({ min: 2 })
    .withMessage('Name must be atleast two characters'),
  check('email', 'Email must be a valid address').isEmail().normalizeEmail(),
  check('password', 'Invalid password entry').custom((password) => {
    const passwordValidationErrors = validatePassword(password, {
      minLength: 6,
      maxLength: 128,
      minDigits: 1,
      minSpecialCharacters: 1,
      minLowercaseLetters: 1,
      minUppercaseLetters: 1
    });

    if (passwordValidationErrors.length !== 0) {
      return Promise.reject(passwordValidationErrors);
    } else {
      return Promise.resolve(true);
    }
  })
];
