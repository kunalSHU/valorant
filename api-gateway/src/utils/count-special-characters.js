/**
 * Returns the number of special characters that occur in the string.
 *
 * @param {string} string - The string to count special characters of.
 * @returns {number} The number of special characters that occur in the string.
 */
const countSpecialCharacters = (string) => {
  const specialCharacters = [
    "'",
    '%',
    '!',
    '@',
    '#',
    '$',
    '#',
    '^',
    '&',
    '*',
    '(',
    ')',
    '?',
    '/',
    '>',
    '.',
    '<',
    ':',
    ';',
    '\\',
    '}',
    ']',
    '{',
    '[',
    '_',
    '~',
    '`',
    '+',
    '=',
    '-',
    '//',
    '|'
  ];

  let specialCharactersCount = 0;
  let i = parseInt(string.length);

  while (i--) {
    if (specialCharacters.includes(string[parseInt(i)])) {
      specialCharactersCount++;
    }
  }
  return specialCharactersCount;
};

module.exports = countSpecialCharacters;
