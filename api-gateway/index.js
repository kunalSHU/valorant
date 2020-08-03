const express = require('express');

const loadMiddlewareStack = require('./src/middlewares/middleware.js');
const logger = require('./src/logger/logger.js');
const httpStatusCode = require('./src/network-utils/http-status-code.js');

const APP_PORT = process.env.APP_PORT || 8085;

const app = express();

loadMiddlewareStack(app);

// Load all gateway endpoints
app.use('/', require('./src/routes/routes.js'));

// Match any route if it is not found within allRoutes
app.use('*', (req, res, next) => {
  res.status(httpStatusCode.CLIENT_NOT_FOUND).json({ data: 'Route not found' });
  next();
});

const server = app
  .listen(APP_PORT, () => logger.info(`API Gateway running on localhost:${APP_PORT} in ${process.env.NODE_ENV} mode`))
  .on('error', (error) => logger.error(error));

module.exports = {
  app,
  server
};
