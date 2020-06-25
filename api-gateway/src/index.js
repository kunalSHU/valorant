const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const environmentConfig = require('./environment-config.json');

const rateLimiter = require('./middlewares/rate-limiter.js');
const httpStatusCode = require('./utils/http-status-code.js');

const PORT = environmentConfig.application.port || 8085;

const whitelistedCorsDomains = environmentConfig.application.whitelistedCorsDomains;

const corsOptions = {
  /**
   * Checks the requester URL against a whitelist of domains to determine if its allowed to send CORS requests.
   *
   * @param {string} origin - The requester UrL.
   * @param {Function} callback - Callback function.
   * @returns {boolean} - Whether the origin exists in the whitelisted or not.
   */
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (whitelistedCorsDomains.indexOf(origin) === -1) {
      return callback(
        new Error('The CORS policy for this origin does not allow access from the particular origin'),
        false
      );
    }
    return callback(null, true);
  }
};

// Create an express server and a GraphQL endpoint
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
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
