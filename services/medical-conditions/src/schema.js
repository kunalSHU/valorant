const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
  type Query {
    message: String
    medicalCondition: [medicalCondition]
  }
  type Mutation {
    post(
    allergyid: Int 
    allergyname: String
    otherfacts: String
    ): medicalCondition!
  }
  type medicalCondition {
    allergyid: Int 
    allergyname: String
    otherfacts: String
  }
`);

module.exports = schema;
