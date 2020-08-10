const { ApolloServer, gql } = require('apollo-server');
const { makeExecutableSchema } = require('graphql-tools');

const allStrings = ['String 1', 'String 2'];

/**
 * Create a mock GraphQL server that adds and retrieves strings from a list.
 *
 * @returns {object} An instance of ApolloServer.
 */
const createMockGqlServer = () => {
  const typeDefs = gql`
    type Query {
      getAllStrings: [String]
    }
    type Mutation {
      addString(stringToAdd: String): String
    }
  `;

  const resolvers = {
    Query: {
      getAllStrings: () => allStrings
    },
    Mutation: {
      addString: (root, { stringToAdd }) => {
        allStrings.push(stringToAdd);
        return stringToAdd;
      }
    }
  };

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  return new ApolloServer({
    schema
  });
};

module.exports = createMockGqlServer;
