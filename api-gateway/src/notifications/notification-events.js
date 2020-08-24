const eventTypes = {
  onRequestAllNotifications: 'requestAllNotifications'
};

/**
 *
 * @param {*} client
 */
const onRequestAllNotifications = (client) => {
  client.on(eventTypes.onRequestAllNotifications, (data) => {
    console.log(data);
  });
};

module.exports = { onRequestAllNotifications };
