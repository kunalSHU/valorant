const bodyParserMiddleware = require('body-parser');
const cookieParserMiddleware = require('cookie-parser');
const expressIpMiddleware = require('express-ip');

const corsMiddleware = require('./cors-middleware.js');
const rateLimiterMiddleware = require('./rate-limiter-middleware.js');

const environmentConfig = require('../../environment-config.json');

/**
 * Attaches middlewares to the given Express app.
 *
 * @param {express.Application} app - An instance of the express app to attach the middlewares to.
 * @returns {void}
 */
const loadMiddlewareStack = (app) => {
  app.use(corsMiddleware);
  app.use(bodyParserMiddleware.urlencoded({ extended: false }));
  app.use(bodyParserMiddleware.json());
  app.use(cookieParserMiddleware());
  app.use(expressIpMiddleware().getIpInfoMiddleware);
  app.use(
    rateLimiterMiddleware(
      environmentConfig.middlewares.rateLimiter.maxRequestWindowMs,
      environmentConfig.middlewares.rateLimiter.maxRequestsAllowedPerWindow,
      (req, res) => {
        res.json({ message: 'Too many requests. Please try again later' });
        return;
      }
    )
  );
};

module.exports = loadMiddlewareStack;
