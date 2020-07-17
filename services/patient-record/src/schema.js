const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
type Query {
  message: String}
`);

module.exports = schema;