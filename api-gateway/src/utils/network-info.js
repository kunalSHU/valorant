const nodeIp = require('ip');

const networkInfo = {
  /**
   * Returns the IP and geographic information of the client that requested the resource.
   *
   * @param {express.Request} req - The express request object that is being recieved from the client.
   *
   * @typedef {object} jsonObject - The JSON object returned by this function
   * @property {string} jsonObject.ip - The IPv4 or IPv6 address.
   * @property {string} jsonObject.timezone - "Country/Zone" Timezone from IANA timezone database (https://www.iana.org/time-zones).
   * @property {string} jsonObject.country - 2 letter ISO-3166-1 country code from the IBAN country-codes database(https://www.iban.com/country-codes).
   *
   * @returns {jsonObject} A JSON object representing the request's origin IP info.
   */
  getRequestOriginIpInfo: (req) => {
    const { timezone, country } = req.ipInfo;
    let { ip } = req.ipInfo;
    if (ip === '::1') {
      ip = '127.0.0.1';
    }
    return { ip, timezone, country };
  },

  /**
   * Returns the public and private IPv4 addresses of the server running the app (From the NIC).
   *
   * @typedef {object} jsonObject - The JSON object returned by this function
   * @property {string} jsonObject.publicIpv4` - The public IPv4 address of the server NIC.
   * @property {string} jsonObject.privateIpv4` - The private IPv4 address of the server NIC.
   *
   * @returns {jsonObject} A JSON object representing the server's public and private IPs on the NIC.
   */
  getServerIpInfo: () => {
    return {
      publicIpv4: nodeIp.address('public', 'ipv4'),
      privateIpv4: nodeIp.address('private', 'ipv4')
    };
  }
};

module.exports = networkInfo;
