const rateLimit = require('express-rate-limit');

const httpStatus = require('../network-utils/http-status-code.js');

/**
 * Allows a maximum number of requests to the server from a client within a certain timeframe. Uses defaults of (maxRequestWindowMs = 1000, maxRequestsAllowedPerWindow=200).
 *
 * @example
 * Only allow 10 requests per minute: rateLimiter(60000, 10, onMaxRequestsExceeded)
 *
 * @param {number} [maxRequestWindowMs] - The length of the rate limiting time window in milliseconds.
 * @param {number} [maxRequestsAllowedPerWindow] - The maximum amount of requests that can be made within the time window.
 * @param {Function} onMaxRequestsExceeded - The function that will run when the maximum number of requests have been exceeded by the client.
 * @returns {void}
 */
const rateLimiter = (maxRequestWindowMs = 1000, maxRequestsAllowedPerWindow = 200, onMaxRequestsExceeded) =>
  new rateLimit({
    windowMs: maxRequestWindowMs,
    max: maxRequestsAllowedPerWindow,
    skipFailedRequests: true,
    headers: true,
    /**
     * Executes when the MAX_REQUESTS_PER_WINDOW is exceeded by calling the onMaxRequestExceeded function provided to rateLimiter object.
     *
     * @param {express.Request} req - The express request object that is being recieved from the client.
     * @param {express.Response} res - The express response object that will be sent back to the client.
     * @param {Function} [next] - Calls the next middleware in the middleware stack.
     * @returns {void}
     */
    handler: (req, res, next) => {
      res.status(httpStatus.CLIENT_TOO_MANY_REQUESTS);
      onMaxRequestsExceeded(req, res, next);
    }
  });

module.exports = rateLimiter;
