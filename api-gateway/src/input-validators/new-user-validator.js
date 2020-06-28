const { check } = require('express-validator');

const validatePassword = require('./password-validator.js');

module.exports = [
  check('name').isAlpha().notEmpty().isLength({ min: 2 }),
  check('email', 'Please enter a valid email').isEmail().normalizeEmail(),
  check('password').custom((password) => {
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
      return Promise.resolve(passwordValidationErrors);
    }
  })
];
