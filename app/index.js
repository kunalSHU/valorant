var express = require("express");
var express_graphql = require("express-graphql");
var { buildSchema } = require("graphql");
var cors = require("cors");

const PORT = process.env.APP_PORT || 8085;
// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
var root = {
  message: () => "Hello World!",
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use(cors());
app.use(
  "/graphql",
  express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app
  .listen(PORT, () =>
    console.log(
      `Express GraphQL Server Now Running On localhost:${PORT}/graphql`
    )
  )
  .on("error", () => {
    console.log("Port in use. Existing program");
    process.exit(1);
  });
