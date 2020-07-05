const cors = require('cors');

const environmentConfig = require('../../environment-config.json');
const whitelistedCorsDomains = environmentConfig.application.whitelistedCorsDomains;

const corsOptions = {
  /**
   * Checks the request's origin URL against a whitelist of domains to determine if its allowed to send CORS requests.
   *
   * @param {string} origin - The requester UrL.
   * @param {Function} onOriginWhitelistCheck - The function that will called when the origin check has occured. It will return an error (if origin is not whitelisted) and a boolean indicating whether the origin is allowed to send CORS requests.
   * @returns {boolean} - Whether the origin exists in the whitelisted or not.
   */
  origin: function isCorsAccessAllowedForOrigin(origin, onOriginWhitelistCheck) {
    if (!origin) return onOriginWhitelistCheck(null, true);
    if (whitelistedCorsDomains.indexOf(origin) === -1) {
      return onOriginWhitelistCheck(
        new Error('The CORS policy for this origin does not allow access from the particular origin'),
        false
      );
    }
    return onOriginWhitelistCheck(null, true);
  }
};

module.exports = cors(corsOptions);
