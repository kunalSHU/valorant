/* eslint-disable require-jsdoc */
const express = require('express');
const expressGraphQL = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const process = require('process');

const loadMiddlewareStack = require('./src/middlewares');
const database = require('./src/db');

const healthcheckController = require('./src/controllers/healthcheck-controller.js');
const httpStatusCode = require('./src/utils/http-status-code.js');

const APP_PORT = process.env.APP_PORT || 8085;

database.connect(
  process.env.POSTGRES_DB_HOST || '127.0.0.1',
  process.env.POSTGRES_DB_NAME || 'accounts_db',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || 'postgres'
);

const app = express();

loadMiddlewareStack(app);

const rootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'Say hello',
      resolve() {
        return 'Hello World!';
      }
    }
  })
});

const schema = new GraphQLSchema({ query: rootQuery });

// Create GraphQL endpoint
app.use(
  '/api',
  expressGraphQL({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development' ? true : false
  })
);

app.use('/healthcheck', (req, res) => {
  res.status(httpStatusCode.OK).json({
    serviceName: 'API Gateway',
    message: `Pinging /healthcheck on API Gateway`,
    data: healthcheckController.getHealthcheckInfo(req)
  });
});

// Match any route if it is not found within allRoutes
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Route does not exist',
    method: req.method,
    routeRequested: req.originalUrl
  });
  next();
});

const server = app
  .listen(APP_PORT, () => {
    console.log(`API Gateway running on localhost:${APP_PORT} in ${process.env.NODE_ENV} mode`);
  })
  .on('error', (error) => {
    console.error(error);
  });

module.exports = {
  app,
  server
};
