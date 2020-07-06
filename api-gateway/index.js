const express = require('express');
const process = require('process');

const loadMiddlewareStack = require('./src/middlewares');
const allRoutes = require('./src/routes');
const database = require('./src/db');

const APP_PORT = process.env.APP_PORT || 8085;

database.connect(
  process.env.POSTGRES_DB_HOST || '127.0.0.1',
  process.env.POSTGRES_DB_NAME || 'accounts_db',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || 'postgres'
);

const app = express();

loadMiddlewareStack(app);
app.use('/', allRoutes);

// Match any route if it is not found within allRoutes
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Not found',
    method: req.method,
    routeRequested: req.originalUrl
  });
  next();
});

const server = app
  .listen(APP_PORT, () => {
    console.log(`API Gateway running on localhost:${APP_PORT} in ${process.env.NODE_ENV} mode`);
  })
  .on('error', (error) => {
    console.error(error);
  });

module.exports = {
  app,
  server
};
