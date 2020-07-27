/* eslint-disable dot-notation */

/**
 * Logs all requests made to the server by Clients.
 *
 * @param {express.Request} req - The express request object.
 * @param {express.Response} res - The express response object.
 * @param {Function} next - The next function in the middleware stack to call.
 *
 * @returns {void}
 */
const requestLoggerMiddleware = (req, res, next) => {
  console.log(req.headers);
  console.log('\n--------------- REQUEST LOGGER ---------------');
  console.log(`[Request] Protocol: ${req.protocol}`);
  console.log(`[Request] OriginalUrl: ${req.originalUrl}`);
  console.log(`[Request] Path: ${req.path}`);
  console.log(`\n[Headers] Host: ${req.headers['host']}`);
  console.log(`[Headers] Agent: ${req.headers['user-agent']}`);
  console.log(`[Headers] Accept: ${req.headers['accept']}`);
  console.log(`[Headers] AcceptEncoding: ${req.headers['accept-encoding'] || '<empty>'}`);
  console.log(`\n[Body]: ${JSON.stringify(req.body) || '<empty>'}`);
  console.log('----------------------------------------------');

  next();
};

module.exports = requestLoggerMiddleware;

// api_gateway_app | [Request Logger] - Header: {"host":"localhost:8080","user-agent":"curl/7.64.1","accept":"*/*"}
