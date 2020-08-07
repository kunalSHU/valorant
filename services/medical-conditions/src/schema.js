const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
  type Query {
    message: String
    medicalCondition: [medicalCondition]
  }
  type Mutation {
    post(
    allergyid: Int, 
    allergyName: String
    otherFacts: String
    ): medicalCondition!
  }
  type medicalCondition {
    allergyid: Int, 
    allergyName: String
    otherFacts: String
  }
`);

module.exports = schema;