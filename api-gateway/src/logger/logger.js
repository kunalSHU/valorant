const appRoot = require('app-root-path');
const winston = require('winston');
const format = winston.format;

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: false,
    maxsize: 10000000, // 10MB in bytes
    maxFiles: 10,
    colorize: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: format.combine(format.colorize(), format.simple())
  }
};

const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file)],
  exitOnError: false
});

// Log to the console if not in production
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console(options.console));
}

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  }
};

module.exports = logger;
