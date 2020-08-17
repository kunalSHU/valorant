const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
  type Query {
    message: String
    test: String
    userAddress: [UserAddress]
    getUserInfo: [UserInfo]
    getUserInfoByEmail(email: String): [UserInfo]
  }
  type Mutation {
    postUserAddress(
    streetname: String
    city: String
    postal_code: String
    province: String
    ): UserAddress!
    postUserInfo(
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
    addressid: Int
    streetname: String
    city: String
    postal_code: String
    province: String
  }
  type UserInfo {
    userid: Int
    addressid: Int
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
