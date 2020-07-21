const express = require('express');
const express_graphql = require('express-graphql');
const buildSchema = require('graphql').buildSchema;
const cors = require('cors');

const PORT = 8081;
// GraphQL schema
const schema = require('./schema');
//import schema from './schema'
// const credentials = require('../client-model');
// credentials.database = 'accounts_db';
// const client = new Client(credentials);

// // Will query the tables here
// const queryFunction = function () {
//   client
//     .connect()
//     .then(() => {
//       console.log('Connected Successfully');
//     })
//     .then(() => client.query('SELECT * FROM accounts_info.accounts_tbl'))
//     .then((result) => {
//       console.table(result.rows);
//     })
//     .catch((e) => console.log(e))
//     .finally(() => client.end());
// };

// // timeout used so connection to db happens after it is started
// setTimeout(queryFunction, 5000);

const Knex = require("knex");
const knex = Knex({
  client: 'pg',
  connection: { 
    host: '142.1.46.70', 
    user: 'postgres', 
    password: 'postgres', 
    database: 'patient_db', 
    port: 8088
    },

});

// Root resolver
const root = {
  message: () => 'Hello this is accounts service connecting to patient record db!',
  addUserInfo: ({userid, addressid, username, first_name, last_name, phone_number, email, birthdate,
    date_became_patient, gender}) => {
      knex("patient_info.patient_basic_info_tbl").insert({
        userid: userid,
        addressid: addressid,
        username: username,
        first_name: first_name,
        last_name: last_name,
        phone_number: phone_number,
        email: email,
        birthdate: birthdate,
        date_became_patient: date_became_patient,
        gender: gender
      }).then((data) => console.log(data))
        .catch((err) => console.log(err))
    }
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
