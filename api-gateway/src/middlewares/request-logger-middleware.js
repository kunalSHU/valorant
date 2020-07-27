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
  const currDateTime = new Date().toISOString();

  console.log(`\n========== Request from ${req.ipInfo.ip} @ ${currDateTime} ==========`);
  console.log(`[Request] Protocol: ${req.protocol}`);
  console.log(`[Request] OriginalUrl: ${req.originalUrl}`);
  console.log(`[Request] Path: ${req.path}`);
  console.log(`[Header] Host: ${req.headers.host}`);
  console.log(`[Header] Agent: ${req.headers.userAgent}`);
  console.log(`[Header] Accept: ${req.headers.accept}`);
  console.log(`[Header] Accept-Encoding: ${req.headers.acceptEncoding || '<empty>'}`);
  console.log(`[Header] Content-Type: ${req.is() || '<empty>'}`);
  console.log(`[Query Params]: ${JSON.stringify(req.query.params) || '<empty>'}`);
  console.log(`[Body]: ${JSON.stringify(req.body) || '<empty>'}`);
  console.log('====================');

  next();
};

module.exports = requestLoggerMiddleware;
