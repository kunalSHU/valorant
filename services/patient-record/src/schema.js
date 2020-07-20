const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
  type Query {
    message: String
    userAddress: [UserAddress]
  }
  type Mutation {
    post(
    addressid: String, 
    streetname: String
    city: String
    postalCode: String
    province: String
    country: String
    otherdetails: String
    ): UserAddress!
  }
  type UserAddress {
    addressid: String
    streetname: String
    city: String
    postalCode: String
    province: String
    country: String
    otherdetails: String
  }
`);

module.exports = schema;
