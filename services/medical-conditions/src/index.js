const express = require('express');
const express_graphql = require('express-graphql');
const cors = require('cors');
//const { Client } = require('pg');
const schema = require('./schema');
const PORT = process.env.APP_PORT || 8080;

const Knex = require('knex');
const knex = Knex({
  client: 'pg',
  connection: {
    host: '142.1.46.70',
    user: 'postgres',
    password: 'postgres',
    database: 'bookings_db',
    port: 8083
  }
});

// Root resolver
const root = {
  message: () => 'Hello this is medical recording!',
  medicalCondition: () => knex('bookings_info.allergy_tbl').select('*')
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
    console.log('Port in se. Existing program');
    console.error(error);
    process.exit(1);
  });

module.exports = server;
