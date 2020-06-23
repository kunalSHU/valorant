const express = require('express');
const express_graphql = require('express-graphql');
const buildSchema = require('graphql').buildSchema;
const cors = require('cors');

const PORT = process.env.APP_PORT || 8085;
// GraphQL schema
const schema = buildSchema(`
type Query {
        message: String
    }
`);

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