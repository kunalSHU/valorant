const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const rabbitMq = require('amqplib/callback_api');

const loadMiddlewareStack = require('./src/middlewares/middleware.js');
const logger = require('./src/logger/logger.js');
const httpStatusCode = require('./src/network-utils/http-status-code.js');

const { onRequestAllNotifications } = require('./src/notifications/notification-events.js');
const { listenOnQueue } = require('./src/notifications/messaging-provider.js');

const APP_PORT = process.env.APP_PORT || 8085;

// Socketserver config
const SOCKET_NOTIFICATIONS_ENDPOINT_PATH = process.env.SOCKET_NOTIFICATIONS_ENDPOINT_PATH || '/notifications';

// Messaging Queue config
const NOTIFICATION_QUEUE_NAME = process.env.NOTIFICATIONS_QUEUE_NAME || 'hello';
const AMPQ_MESSAGING_BUS_ENDPOINT = process.env.AMPQ_MESSAGING_BUS_ENDPOINT || '142.1.46.70:8089';

const app = express();
const appServer = http.Server(app);
const socketServer = socketio(appServer, {
  transports: ['websocket']
});

loadMiddlewareStack(app);

// Load all gateway endpoints
app.use('/', require('./src/routes/routes.js'));

// Listen to all notificationssent to /notifications endpoint
socketServer.of(SOCKET_NOTIFICATIONS_ENDPOINT_PATH).on('connection', (client) => {
  onRequestAllNotifications(client);
});

// Initialize RabbitMQ messagingsystem
rabbitMq.connect(`amqp://${AMPQ_MESSAGING_BUS_ENDPOINT}`, (connectionError, connection) => {
  if (connectionError) {
    logger.error(
      `Could not connect to the rabbitMQ messaging system at ampq://${AMPQ_MESSAGING_BUS_ENDPOINT} : ${connectionError}`
    );
    throw connectionError;
  }

  connection.createChannel((channelError, channel) => {
    if (channelError) {
      logger.error(`Could not establish a connection to the notifications channel: ${channelError}`);
      throw channelError;
    }

    listenOnQueue(channel, NOTIFICATION_QUEUE_NAME);
  });
});

// Match any route if it is not found within allRoutes
app.use('*', (req, res, next) => {
  return res.status(httpStatusCode.CLIENT_NOT_FOUND).json({ data: 'Route not found' });
});

const server = appServer
  .listen(APP_PORT, () => {
    logger.info(`API Gateway running on localhost:${APP_PORT} in ${process.env.NODE_ENV} mode`);
  })
  .on('error', (error) => {
    logger.error(error);
  });

module.exports = {
  app,
  server
};
