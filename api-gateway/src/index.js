const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const process = require('process');
const os = require('os');
const expressIp = require('express-ip');

const environmentConfig = require('./environment-config.json');

const rateLimiter = require('./middlewares/rate-limiter.js');
const networkUtils = require('./utils/network-info.js');
const httpStatusCode = require('./utils/http-status-code.js');

const PORT = environmentConfig.application.port || 8085;
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

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressIp().getIpInfoMiddleware);
app.use(
  rateLimiter(
    environmentConfig.middlewares.rateLimiter.maxRequestWindowMs,
    environmentConfig.middlewares.rateLimiter.maxRequestsAllowedPerWindow,
    (req, res) => {
      res.json({ message: 'Too many requests. Please try again later' });
    }
  )
);

app.get('/', (req, res) => {
  res.status(httpStatusCode.OK).json({ message: 'Test endpoint reached' });
});

app.get('/healthcheck', (req, res) => {
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
      },
      requestOriginIpInfo: networkUtils.getRequestOriginIpInfo(req),
      serverLocalIp: networkUtils.getServerIpInfo()
    }
  });
});

const server = app
  .listen(PORT, () => {
    console.log(`API Gateway running on localhost:${PORT}`);
  })
  .on('error', (error) => {
    console.error('Port in use. Existing program!');
    console.error(error);
    process.exit(1);
  });

module.exports = {
  app,
  server
};
