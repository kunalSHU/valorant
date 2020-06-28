const express = require('express');
const express_graphql = require('express-graphql');
const buildSchema = require('graphql').buildSchema;
const cors = require('cors');
const { Pool, Client } = require('pg');
//pg_ctl -D /var/lib/postgresql/data -l logfile start
const PORT = 8080;
// GraphQL schema
const schema = buildSchema(`
type Query {
        message: String
    }
`);

const client = new Client({
  user: 'postgres',
  password: 'postgres',
  host: '198.91.129.107',
  port: 8080,
  database: 'medical-conditions-db'
})

// Will query the tables here
const queryFunction = function () {
  client.connect()
  .then(() => {console.log('Connected Successfully')})
  .then(() => client.query('SELECT * FROM people'))
  .then((result) => {console.table(result.rows)})
  .catch(e => console.log(e))
  .finally(() => client.end())
}
  
// timeout used so connection to db happens after it is started
setTimeout(queryFunction , 5000)

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
