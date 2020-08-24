const logger = require('../logger/logger.js');

/**
 * Listens for messages from a queue located within the provided chanel.
 *
 * @param {object} channel - The RabbitMQ channel where the queue is located.
 * @param {string} queueName - The name of the queue to listen for messages from.
 * @returns {void}
 */
const listenOnQueue = (channel, queueName) => {
  channel.assertQueue(queueName, { durable: false });
  logger.info(`Waiting for messages from queue: ${queueName}`);

  channel.consume(queueName, (message) => {
    const messageContent = message.content.toString();
    logger.info(`Recieved message from ${queueName}: ${messageContent}`);
  });
};

module.exports = { listenOnQueue };
