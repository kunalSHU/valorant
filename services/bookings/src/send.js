const config = {
    user: 'postgres',
    password: 'postgres',
    host: '142.1.46.70:8083',
    db: 'bookings_db',
    table: 'bookings_info.appointments_info_basic_tbl'
}

const connectionString = 'postgres://postgres:postgres@142.1.46.70:8083/bookings_db';

const pgClient = new pg.Client(connectionString);
pgClient.connect();
// const amqp = require('amqplib/callback_api');

// amqp.connect('amqp://142.1.46.70:8089', function (error0, connection) {
//     if (error0) {
//         throw error0;
//     }

//     connection.createChannel(function (error1, channel) {
//         if (error1) {
//             throw error1;
//         }

//         var queue = 'hello';
//         var msg = 'Hello World!';

//         channel.assertQueue(queue, {
//             durable: false
//         });

//         channel.sendToQueue(queue, Buffer.from(msg));

//         console.log(" [x] Sent %s", msg);
//     });
//     setTimeout(function () {
//         connection.close();
//         process.exit(0);
//     }, 500);
// });
