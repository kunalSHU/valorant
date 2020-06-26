const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const process = require('process');
const expressIp = require('express-ip');

const environmentConfig = require('./environment-config.json');

const rateLimiter = require('./middlewares/rate-limiter.js');

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

app.use('/', require('./routes/routes.js'));

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
