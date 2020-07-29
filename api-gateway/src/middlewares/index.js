const bodyParserMiddleware = require('body-parser');
const cookieParserMiddleware = require('cookie-parser');
const expressIpMiddleware = require('express-ip');
const morganHttpLoggerMiddleware = require('morgan');

const corsMiddleware = require('./cors-middleware.js');
const rateLimiterMiddleware = require('./rate-limiter-middleware.js');

const middlewareConfig = require('./middleware-config.js');

/**
 * Attaches middlewares to the given Express app.
 *
 * @param {express.Application} app - An instance of the express app to attach the middlewares to.
 * @returns {void}
 */
const loadMiddlewareStack = (app) => {
  app.use(
    morganHttpLoggerMiddleware(
      (tokens, req, res) => {
        /**
         * Log format: [iso-date] [http|https] [method] [url] [status] [content-length] [remote-addr] [remote-user] [response-time-ms] [user-agent] [accept-encoding] [query-params] [body].
         */
        return [
          tokens.date(req, res, 'iso'),
          req.protocol,
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, 'content-length'),
          '-',
          tokens['remote-addr'](req, res) || '<empty remote-addr>',
          '-',
          tokens['remote-user'](req, res) || '<empty remote-user>',
          '-',
          tokens['response-time'](req, res),
          'ms',
          '-',
          tokens.req(req, res, 'user-agent') || '<empty user-agent>',
          '-',
          tokens.req(req, req, 'accept-encoding') || '<empty accept-encoding>',
          '\n',
          `query-params: ${JSON.stringify(req.query.params) || '<empty query-params>'}\n`,
          `body: ${JSON.stringify(req.body)}`
        ].join(' ');
      },
      {
        stream: require('../logger/logger.js').stream
      }
    )
  );
  app.use(corsMiddleware);
  app.use(bodyParserMiddleware.urlencoded({ extended: false }));
  app.use(bodyParserMiddleware.json());
  app.use(cookieParserMiddleware());
  app.use(expressIpMiddleware().getIpInfoMiddleware);
  app.use(
    rateLimiterMiddleware(
      middlewareConfig.rateLimiter.maxRequestWindowMs,
      middlewareConfig.rateLimiter.maxRequestsAllowedPerWindow,
      (req, res) => {
        res.json({ message: 'Too many requests. Please try again later' });
        return;
      }
    )
  );
};

module.exports = loadMiddlewareStack;
