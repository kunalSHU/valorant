const express = require('express');
const bodyParserMiddleware = require('body-parser');
const cookieParserMiddleware = require('cookie-parser');
const process = require('process');
const { Sequelize } = require('sequelize');

const expressIpMiddleware = require('express-ip');
const corsMiddleware = require('./middlewares/cors-middleware.js');
const rateLimiterMiddleware = require('./middlewares/rate-limiter-middleware.js');

const environmentConfig = require('./environment-config.json');
const DEFAULT_GATEWAY_PORT = 8085;

const PORT = process.env.APP_PORT || DEFAULT_GATEWAY_PORT;
const app = express();

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

app.use('/', require('./routes/routes.js'));

const POSTGRES_DB_HOST = process.env.POSTGRES_DB_HOST || '127.0.0.1';
const POSTGRES_DB_NAME = process.env.POSTGRES_DB_NAME || 'accounts_db';
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';

const DB_URI = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB_HOST}:5432/${POSTGRES_DB_NAME}`;

const connection = new Sequelize(DB_URI, {
  dialect: 'postgres',
  logging: true,
  operatorsAliases: Sequelize.Op
});

console.info(`Connecting to database: ${DB_URI}`);

connection
  .authenticate()
  .then(() => {
    console.info(`INFO - Connecting to database: ${DB_URI}`);
  })
  .catch((err) => {
    console.error('ERROR - Unable to connect to the database:', err);
  });

const server = app
  .listen(PORT, () => {
    console.log(`API Gateway running on localhost:${PORT} in ${process.env.NODE_ENV} mode`);
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
