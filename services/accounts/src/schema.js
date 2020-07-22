const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
  type Query {
    message: String
    userInfo: [UserInfo]
    userAddress: [UserAddress]
  }
  type Mutation {
    addUserAddress(
    addressid: Int
    streetname: String
    city: String
    postalCode: String
    province: String
    country: String
    otherdetails: String
    ): UserAddress!

    addUserInfo(
        userid: Int
        addressid: Int
        username: String
        first_name: String
        last_name: String
        phone_number: Int
        email: String
        birthdate: Date
        date_became_patient: Date
        gender: String
    ): UserInfo!
  }

  type UserAddress {
    addressid: Int
    streetname: String
    city: String
    postal_code: String
    province: String
    country: String
    otherdetails: String
  }

  type UserInfo {
    userid: Int
    addressid: Int
    username: String
    first_name: String
    last_name: String
    phone_number: Int
    email: String
    birthdate: Date
    date_became_patient: Date
    gender: String
  }
`);
module.exports = schema;