var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        user(userId: Int!): User
    },
    type User {
        userId: Int
        firstName: String
        lastName: String
        email: String
        phoneNumber: String
        birthday: String
    }
`);
var Users = [
    {
        userId: 1,
        firstName: 'Swetha',
        lastName: 'Maramganty',
        email: 'swetha@gmail.com',
        phoneNumber: '000-000-0000',
        birthday: 'April 12, 1997'
    },
    {
        userId: 2,
        firstName: 'Shaballs',
        lastName: 'Baddie',
        email: 'shabby@gmail.com',
        phoneNumber: '000-000-0001',
        birthday: 'December 21, 1996'
    },
    {
        userId: 3,
        firstName: 'Kamal',
        lastName: 'Shukla',
        email: 'kunkun@gmail.com',
        phoneNumber: '000-000-0002',
        birthday: 'November 1, 1996',
    },
    {
        userId: 4,
        firstName: 'Willy',
        lastName: 'Bear',
        email: 'willy@gmail.com',
        phoneNumber: '000-000-0003',
        birthday: 'August 23, 1997'
    }
]
var getSingleUser = function(args) { 
    var userId = args.userId;
    return Users.filter(user => {
        return user.userId == userId;
    })[0];
}
var getUsers = function(args) {
    if (args.firstName) {
        var firstName = args.firstName;
        return Users.filter(user => user.firstName === firstName);
    } else {
        return Users;
    }
}
var root = {
    user: getSingleUser,
    users: getUsers
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8080, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));