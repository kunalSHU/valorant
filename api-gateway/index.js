/* eslint-disable security/detect-object-injection */
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

// Messaging Queue config
const NOTIFICATION_QUEUE_NAME = process.env.NOTIFICATIONS_QUEUE_NAME || 'hello';
const AMPQ_MESSAGING_BUS_ENDPOINT = process.env.AMPQ_MESSAGING_BUS_ENDPOINT || '142.1.46.70:8089';

const app = express();

const userNotifications = {};

loadMiddlewareStack(app);

// Load all gateway endpoints
app.use('/', require('./src/routes/routes.js'));

app.get('/notifications', (req, res) => {
  const { accountId } = req.query;
  res.status(httpStatusCode.OK).json(userNotifications[accountId]);
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

    channel.assertQueue(NOTIFICATION_QUEUE_NAME, { durable: false });
    logger.info(`Waiting for messages from ${NOTIFICATION_QUEUE_NAME}`);

    try {
      channel.consume(NOTIFICATION_QUEUE_NAME, (message) => {
        const messageContent = message.content.toString();

        if (messageContent[0] === '{') {
          const updatedAppointment = JSON.parse(messageContent);
          const accountId = updatedAppointment.userid;

          if (userNotifications[accountId] === undefined) {
            userNotifications[accountId] = [];
          }

          userNotifications[accountId].push(updatedAppointment);
        }

        logger.info(`Recieved message from ${NOTIFICATION_QUEUE_NAME}: ${messageContent}`);
      });
    } catch (err) {
      logger.error(`Error consuming in channel ${channel} from queue ${NOTIFICATION_QUEUE_NAME}`);
    }
  });
});

// Match any route if it is not found within allRoutes
app.use('*', (req, res) => {
  return res.status(httpStatusCode.CLIENT_NOT_FOUND).json({ data: 'Route not found' });
});

const server = app
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
