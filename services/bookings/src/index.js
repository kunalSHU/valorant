const express = require('express');
const express_graphql = require('express-graphql');
const buildSchema = require('graphql').buildSchema;
const cors = require('cors');
const { Client } = require('pg');

const PORT = process.env.APP_PORT || 8085;
// GraphQL schema
const schema = buildSchema(`
type Query {
        message: String
    }
`);

const credentials = require('../client-model');
credentials.database = 'bookings_db';
const client = new Client(credentials);

// Will query the tables here
const queryFunction = function () {
  client
    .connect()
    .then(() => {
      console.log('Connected Successfully');
    })
    .then(() => client.query('SELECT * FROM bookings_info.appointments_info_basic_tbl'))
    .then((result) => {
      console.table(result.rows);
    })
    .catch((e) => console.log(e))
    .finally(() => client.end());
};

// timeout used so connection to db happens after it is started
setTimeout(queryFunction, 5000);

// Root resolver
const root = {
  message: () => 'Hello World!'
};

// Create an express server and a GraphQL endpoint
const app = express();
app.use(cors());
app.use(
  '/graphql',
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

const server = app
  .listen(PORT, () => {
    console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`);
  })
  .on('error', (error) => {
    console.log('Port in use. Existing program');
    console.error(error);
    process.exit(1);
  });

module.exports = server;
