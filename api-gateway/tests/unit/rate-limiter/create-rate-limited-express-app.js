const express = require('express');

const httpStatusCode = require('../../../src/network-utils/http-status-code.js');
const rateLimiter = require('../../../src/middlewares/rate-limiter-middleware.js');

/**
 * Creates an Express server with the rate limiter middleware applied.
 *
 * @param {number} maxRequestWindowMs - The length of the rate limiting time window in milliseconds.
 * @param {number} maxRequestsAllowedPerWindow - The maximum amount of requests that can be made within the time window.
 * @param {string} tooManyRequestsMessage - The string to return to the client when it has exceeded maximum requests allowed per request window.
 *
 * @returns {object} An instance of an Express app with the rate middelware applied.
 */
const createMockRateLimitedApp = (maxRequestWindowMs, maxRequestsAllowedPerWindow, tooManyRequestsMessage) => {
  const app = express();
  app.use(
    rateLimiter(maxRequestWindowMs, maxRequestsAllowedPerWindow, (req, res) => {
      res.json({ message: tooManyRequestsMessage });
    })
  );

  app.get('/', (req, res) => {
    res.status(httpStatusCode.OK).json({ message: 'Test endpoint reached' });
  });

  return app;
};

module.exports = createMockRateLimitedApp;
