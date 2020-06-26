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
      date: new Date(),
      time: Date.now(),
      processId: process.pid,
      protocol: req.protocol,
      method: req.method,
      routeRequested: req.path,
      processUptimeSeconds: process.uptime(),
      requestOriginIpInfo: networkInfo.getRequestOriginIpInfo(req),
      serverLocalIp: networkInfo.getServerIpInfo(),
      os: {
        osUptimeSeconds: os.uptime(),
        osType: os.type(),
        osRelease: os.release(),
        osPlatform: os.platform(),
        osUserInfo: os.userInfo()
      },
      hardware: {
        cpuModel: os.cpus()[0].model,
        totalMem: os.totalmem(),
        freeMem: os.freemem(),
        systemLoadAvg: os.loadavg() // See https://nodejs.org/api/os.html#os_os_loadavg
      }
    }
  });
});

module.exports = router;
