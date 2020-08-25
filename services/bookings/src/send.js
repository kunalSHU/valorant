const pg = require('pg');
const EventEmitter = require('events');
const util = require('util');
const amqp = require('amqplib/callback_api');

/**
 *
 */
function DbEventEmitter() {
  EventEmitter.call(this);
}

util.inherits(DbEventEmitter, EventEmitter);
const dbEventEmitter = new DbEventEmitter();

dbEventEmitter.on('update_status', (msg) => {
  console.log('Status updated');
});

const config = {
  user: 'postgres',
  database: 'bookings_db',
  password: 'postgres',
  port: 8083
};

const pool = new pg.Pool(config);

pool.connect((err, client, done) => {
  console.log('NOW HERE');
  if (err) {
    console.log(err);
  }

  //Gets the payload if the trigger is executed
  client.on('notification', (msg) => {
    const payload = JSON.parse(msg.payload);
    console.log(payload);
    console.log('PAY LOAD ENDED');

    //If there is a payload, then send that payload to rabbitMQ
    if (payload != null) {
      amqp.connect('amqp://142.1.46.70:8089', (error0, connection) => {
        if (error0) {
          throw error0;
        }

        connection.createChannel((error1, channel) => {
          if (error1) {
            throw error1;
          }
          const queue = 'hello';

          channel.assertQueue(queue, {
            durable: false
          });

          channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));
          console.log(' [x] Sent %s', msg);
        });
      });
    }
  });
  client.query('LISTEN update_status');
});
