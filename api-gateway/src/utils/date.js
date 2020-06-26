const date = {
  /**
   * Returns the current date in the format YYYY/MM/DD.
   *
   * @returns {string} The date string in the format YYYY/MM/DD.
   */
  getCurrentDate: () => {
    const currDate = new Date();
    return `${currDate.getFullYear()}/${(currDate.getMonth() + 1).toString().padStart(2, '0')}/${currDate.getDate()}`;
  }
};

module.exports = date;
