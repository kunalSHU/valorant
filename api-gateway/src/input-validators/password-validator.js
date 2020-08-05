const countSpecialCharacters = require('../../utils/count-special-characters.js');

//TODO add unit tests

const defaultPasswordRules = {
  minLength: 6,
  maxLength: 128,
  minDigits: 1,
  minSpecialCharacters: 1,
  minLowercaseLetters: 1,
  minUppercaseLetters: 1
};

/**
 * Validates the password against a set of password rules specified to determine if it meets the criteria.
 *
 * @param {string} password - The password that needs to be validated.
 *
 * @param {object} passwordRules - An object representing the password rules.
 * @param {number} passwordRules.minLength - The minimum length of the password (absolute minimum is always 6 characters).
 * @param {number} passwordRules.maxLength - The maximum length of the password.
 * @param {number} passwordRules.minDigits - The minimum number of digits the password must contain (absolute minimum is always 1).
 * @param {number} passwordRules.minSpecialCharacters - The minimum number of special characters (absolute minimum is always 1).
 * @param {number} passwordRules.minLowercaseLetters - The minimum number of lowercase letters (absolute minimum is always 1).
 * @param {number} passwordRules.minUppercaseLetters - The minimum number of uppercase letters (absolute minimum is always 1).
 *
 * @returns {object} A list of criteria that the password does not satisfy.
 */
const validatePassword = (password, passwordRules = defaultPasswordRules) => {
  const validationErrors = [];

  let {
    minLength,
    maxLength,
    minDigits,
    minSpecialCharacters,
    minLowercaseLetters,
    minUppercaseLetters
  } = passwordRules;

  minLength = minLength < defaultPasswordRules.minLength ? defaultPasswordRules.minDigits : minLength;

  maxLength = maxLength < defaultPasswordRules.minLength + 1 ? defaultPasswordRules.maxLength : maxLength;

  minDigits = minDigits < defaultPasswordRules.minDigits ? defaultPasswordRules.minDigits : minDigits;

  minSpecialCharacters =
    minSpecialCharacters < defaultPasswordRules.minSpecialCharacters
      ? defaultPasswordRules.minSpecialCharacters
      : minSpecialCharacters;

  minLowercaseLetters =
    minLowercaseLetters < defaultPasswordRules.minLowercaseLetters
      ? defaultPasswordRules.minLowercaseLetters
      : minLowercaseLetters;

  minUppercaseLetters =
    minUppercaseLetters < defaultPasswordRules.minUppercaseLetters
      ? defaultPasswordRules.minUppercaseLetters
      : minUppercaseLetters;

  if (!password || password.length === 0 || password.localeCompare('') === 0) {
    validationErrors.push('Password is required');
  }

  if (password.length < minLength || password.length > maxLength) {
    validationErrors.push(`Password must be between ${minLength} and ${maxLength} characters`);
  }

  if (countSpecialCharacters(password) < minSpecialCharacters) {
    validationErrors.push(`Password must include at least ${minSpecialCharacters} special character(s)`);
  }

  if (password.split('').filter((character) => !isNaN(parseInt(character)) && isFinite(character)).length < minDigits) {
    validationErrors.push(`Password must include at least ${minDigits} digit(s)`);
  }

  if (password.split('').filter((character) => character !== character.toUpperCase()).length < minLowercaseLetters) {
    validationErrors.push(`Password must include at least ${minLowercaseLetters} lowercase character(s)`);
  }

  if (password.split('').filter((character) => character !== character.toLowerCase()).length < minUppercaseLetters) {
    validationErrors.push(`Password must include at least ${minUppercaseLetters} uppercase character(s)`);
  }

  return validationErrors;
};

module.exports = validatePassword;
