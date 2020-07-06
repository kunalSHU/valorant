const express = require('express');
const process = require('process');

const loadMiddlewareStack = require('./src/middlewares');
const db = require('./src/db');

const APP_PORT = process.env.APP_PORT || 8085;

// Create DB connection
db(
  process.env.POSTGRES_DB_HOST || '127.0.0.1',
  process.env.POSTGRES_DB_NAME || 'accounts_db',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || 'postgres'
);

const app = express();

loadMiddlewareStack(app);

// Load routes
app.use('/', require('./src/routes/routes.js'));

const server = app
  .listen(APP_PORT, () => {
    console.log(`API Gateway running on localhost:${APP_PORT} in ${process.env.NODE_ENV} mode`);
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
