const process = require('process');
const os = require('os');
const nodeIp = require('ip');

const machineOSInfo = {
  osArch: os.arch(),
  osUptimeSeconds: os.uptime(),
  osType: os.type(),
  osRelease: os.release(),
  osPlatform: os.platform(),
  osUserInfo: os.userInfo()
};

const machineHardwareInfo = {
  cpuModel: os.cpus()[0].model,
  totalMemBytes: os.totalmem(),
  freeMemBytes: os.freemem(),
  systemLoadAvg: os.loadavg() // See https://nodejs.org/api/os.html#os_os_loadavg
};

/**
 * Returns the IP and geographic information of the client that requested the resource.
 *
 * @param {express.Request} req - The express request object that is being recieved from the client.
 * @returns {jsonObject} A JSON object representing the request's origin IP info.
 */
const getRequestOriginIpInfo = (req) => {
  const { timezone, country } = req.ipInfo;
  let { ip } = req.ipInfo;
  if (ip === '::1') {
    ip = '127.0.0.1';
  }
  return { ip, timezone, country };
};

/**
 * Returns the state of the machine hardware, OS, and server process information.
 *
 * @param {express.Request} req - The express request object that is being recieved from the client.
 * @returns {JsonObject} An object representing the machine hardware, OS, and server process information.
 */
const getHealthcheckInfo = (req) => {
  const { ip, timezone: ianaTimezone, country: isoCountryCode } = getRequestOriginIpInfo(req);

  return {
    serverDateTimeUtc: new Date().toUTCString(),
    processId: process.pid,
    protocol: req.protocol,
    method: req.method,
    routeRequested: req.originalUrl,
    processUptimeSeconds: process.uptime(),
    requestOriginInfo: {
      ip,
      ianaTimezone,
      isoCountryCode,
      userAgent: req.header('user-agent')
    },
    serverIpInfo: {
      publicIpv4: nodeIp.address('public', 'ipv4'),
      privateIpv4: nodeIp.address('private', 'ipv4')
    },
    machineOSInfo,
    machineHardwareInfo
  };
};

module.exports = { getHealthcheckInfo };
