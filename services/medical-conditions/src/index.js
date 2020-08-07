const express = require('express');
const express_graphql = require('express-graphql');
const buildSchema = require('graphql').buildSchema;
const cors = require('cors');
const { Client } = require('pg');
const schema = require('./schema');
const PORT = process.env.APP_PORT || 8080;

// const PORT = 8080;
// // GraphQL schema
// const schema = buildSchema(`
// type Query {
//         message: String
//     }
// `);

//const credentials = require('../client-model');
//credentials.database = 'bookings_db';
//const client = new Client(credentials);

// Will query the tables here
// const queryFunction = function () {
//   client
//     .connect()
//     .then(() => {
//       console.log('Connected Successfully');
//     })
//     .then(() => client.query('SELECT * FROM bookings_info.prescribed_medications_tbl'))
//     .then((result) => {
//       console.table(result.rows);
//     })
//     .catch((e) => console.log(e))
//     .finally(() => client.end());
// };

const Knex = require("knex");
const knex = Knex({
  client: 'pg',
  connection: { 
    host: '142.1.46.70', 
    user: 'postgres', 
    password: 'postgres', 
    database: 'bookings_db', 
    port: 8083
    },

});

// Root resolver
const root = {
    message: () => 'Hello this is medical recording!',
    medicalCondition: () => knex("bookings_info.allergy_tbl").select("*"),
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
