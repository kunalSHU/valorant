//Kafka consumer will go here
//Producer in the booking service
//Need to provide the topic name that we are going to listen from 
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(
        client,
        [
            { topic: '', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );

consumer.on('message', function (message) {
    console.log(message);
});