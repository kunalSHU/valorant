var pg = require('pg');
var EventEmitter = require('events');
var util = require('util');
const amqp = require('amqplib/callback_api');

function DbEventEmitter(){
	EventEmitter.call(this);
}

util.inherits(DbEventEmitter, EventEmitter);
var dbEventEmitter = new DbEventEmitter;

dbEventEmitter.on('update_status', (msg) => {
	console.log('Status updated');
});

console.log("OK WE HERE?");
const config = {
	user: 'postgres',
	database: 'bookings_db',
	password: 'postgres',
	port: 8083
};

const pool = new pg.Pool(config);

pool.connect(function(err, client, done) {
	console.log("NOW HERE");
	if(err){
		console.log(err);
	}
	
	client.on('notification', function(msg) {
		let payload = JSON.parse(msg.payload);
		console.log(payload);
		console.log('PAY LOAD ENDED');

		if(payload!= null){
			amqp.connect('amqp://142.1.46.70:8089', function (error0, connection) {
				if (error0) {
					throw error0;
				}

				connection.createChannel(function (error1, channel) {
				if (error1) {
							                throw error1;
							            }

					            var queue = 'hello';
					            var msg = `Appointment ID ${payload.appointmentid} status has been changed to ${payload.status_appt}`;

					            channel.assertQueue(queue, {
							                durable: false
							            });

					            channel.sendToQueue(queue, Buffer.from(msg));

					            console.log(" [x] Sent %s", msg);
					        });
				
			});
		}
	});

	client.query('LISTEN update_status');
});

//const pgClient = new pg.Client(connectionString);
//console.log('CONNECTED WOHOO');
//pgClient.connect();
//console.log("OK NOW WHAT?");

//const query = pg.Client.query('LISTEN');
//console.log('AM I LISTENING?');
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
