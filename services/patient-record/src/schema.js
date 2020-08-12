const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
  type Query {
    message: String
    userAddress: [UserAddress]
  }
  type Mutation {
    postUserAddress(
    addressid: String 
    streetname: String
    city: String
    postalCode: String
    province: String
    country: String
    ): UserAddress!
    postUserInfo(
     userid: String
    addressid: String
    first_name: String
    last_name: String
    phone_number: String
    email: String
    birthdate: String
    date_became_patient: String
    sex: String
    ): UserInfo!
  }
  type UserAddress {
    addressid: String
    streetname: String
    city: String
    postalCode: String
    province: String
    country: String
  }
  type UserInfo {
    userid: String
    addressid: String
    first_name: String
    last_name: String
    phone_number: String
    email: String
    birthdate: String
    date_became_patient: String
    sex: String
  }
`);

module.exports = schema;
