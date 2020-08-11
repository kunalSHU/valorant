const appRoot = require('app-root-path');
const winston = require('winston');
const format = winston.format;

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app-${new Date().toISOString()}.log`,
    handleExceptions: true,
    json: true,
    maxsize: 10000000, // 10MB in bytes
    maxFiles: 10,
    colorize: true,
    timestamps: true,
    prettyPrint: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: true,
    colorize: true,
    timestamps: true,
    prettyPrint: true,
    format: format.combine(format.colorize(), format.simple())
  }
};

const logger = winston.createLogger({
  transports: [new winston.transports.File(options.file)],
  exitOnError: false
});

// Initialize environment specific loggers
switch (process.env.NODE_ENV) {
  case 'development':
    logger.add(new winston.transports.Console(options.console));
    break;
  case 'production':
    logger.add(new winston.transports.Console(options.file));
    break;
  default:
    break;
}

logger.stream = {
  write: (message) => logger.info(message)
};

module.exports = logger;
