const express = require('express');
const bodyParserMiddleware = require('body-parser');
const cookieParserMiddleware = require('cookie-parser');
const process = require('process');

const expressIpMiddleware = require('express-ip');
const corsMiddleware = require('./middlewares/cors-middleware.js');
const rateLimiterMiddleware = require('./middlewares/rate-limiter-middleware.js');

const environmentConfig = require('./environment-config.json');

const PORT = process.env.PORT || environmentConfig.application.port;
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
