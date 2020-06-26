const nodeIp = require('ip');

const networkInfo = {
  /**
   * Returns the IP address of the client that requested the resource (i.e the origin IP).
   *
   * @param {express.Request} req - The express request object that is being recieved from the client.
   *
   * @typedef {object} jsonObject - The JSON object returned by this function
   * @property {string} jsonObject.ip - The IPv2 or IPv6 address.
   * @property {string} jsonObject.timezone - "Country/Zone" Timezone from IANA timezone database (https://www.iana.org/time-zones).
   * @property {string} jsonObject.country - 2 letter ISO-3166-1 country code from the IBAN country-codes database(https://www.iban.com/country-codes).
   *
   * @returns {jsonObject} A JSON object representing the request's origin IP info.
   */
  getRequestOriginIpInfo: (req) => {
    const { ip, timezone, country } = req.ipInfo;
    return { ip, timezone, country };
  },

  /**
   * Returns the IP address of the server running the app.
   *
   * @returns {string} The local IPv2 or IPv6 address of the server.
   */
  getServerIpInfo: () => {
    return nodeIp.address();
  }
};

module.exports = networkInfo;
