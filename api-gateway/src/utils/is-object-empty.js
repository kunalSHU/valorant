/**
 * Returns whether the object (obj) is empty (i.e if obj is {}).
 *
 * @param {object} obj - The object to check for emptiness.
 * @returns {boolean} True if the object is empty, false if the object is not empty.
 */
const isObjectEmpty = (obj) => {
  for (const key in obj) {
    return false;
  }
  return true;
};

module.exports = isObjectEmpty;
