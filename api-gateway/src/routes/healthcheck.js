// TODO remove repetitive usage of Router() in route files

const router = require('express').Router();
const process = require('process');
const os = require('os');

const networkInfo = require('../utils/network-info.js');

const httpStatusCode = require('../utils/http-status-code.js');
const environmentConfig = require('../environment-config.json');

router.get('/', (req, res) => {
  res.status(httpStatusCode.OK).json({
    message: `Pinging /healthcheck on ${environmentConfig.application.serviceName}`,
    data: {
      serviceName: environmentConfig.application.serviceName,
      serverDateTimeUtc: new Date().toUTCString(),
      processId: process.pid,
      protocol: req.protocol,
      method: req.method,
      routeRequested: `${req.originalUrl}`,
      processUptimeSeconds: process.uptime(),
      requestOriginIpInfo: networkInfo.getRequestOriginIpInfo(req),
      serverIpInfo: networkInfo.getServerIpInfo(),
      os: {
        osArch: os.arch(),
        osUptimeSeconds: os.uptime(),
        osType: os.type(),
        osRelease: os.release(),
        osPlatform: os.platform(),
        osUserInfo: os.userInfo()
      },
      hardware: {
        cpuModel: os.cpus()[0].model,
        totalMemBytes: os.totalmem(),
        freeMemBytes: os.freemem(),
        systemLoadAvg: os.loadavg() // See https://nodejs.org/api/os.html#os_os_loadavg
      }
    }
  });
});

module.exports = router;
