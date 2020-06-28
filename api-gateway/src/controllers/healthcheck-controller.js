const process = require('process');
const os = require('os');

const networkInfo = require('../utils/network-info.js');

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
 * Returns the state of the machine hardware, OS, and server process information.
 *
 * @param {express.Request} req - The express request object that is being recieved from the client.
 * @returns {JsonObject} An object representing the machine hardware, OS, and server process information.
 */
const getHealthcheckInfo = (req) => {
  const { ip, timezone: ianaTimezone, country: isoCountryCode } = networkInfo.getRequestOriginIpInfo(req);

  return {
    serverDateTimeUtc: new Date().toUTCString(),
    processId: process.pid,
    protocol: req.protocol,
    method: req.method,
    routeRequested: req.originalUrl,
    processUptimeSeconds: process.uptime(),
    requestOriginInfo: { ip, ianaTimezone, isoCountryCode, userAgent: req.header('user-agent') },
    serverIpInfo: networkInfo.getServerIpInfo(),
    machineOSInfo,
    machineHardwareInfo
  };
};

module.exports = { getHealthcheckInfo };
