const nodeIp = require('ip');

const networkInfo = {
  /**
   * Returns the IP and geographic information of the client that requested the resource.
   *
   * @param {express.Request} req - The express request object that is being recieved from the client.
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
