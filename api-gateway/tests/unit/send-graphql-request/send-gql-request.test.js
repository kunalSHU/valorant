const { describe, it } = require('mocha');

const httpStatusCode = require('../../../src/network-utils/http-status-code.js');
const createMockGqlServer = require('./create-mock-graphql-server.js');

const { sendGqlRequest } = require('../../../src/network-utils/gql-requests.js');

describe('[send-gql-request.test.js]', () => {
  const gqlServer = createMockGqlServer().listen();

  context('Send queries/mutations to a GQL server', () => {
    it('should be able to send a valid query', (done) => {
      gqlServer.then(({ url: gqlServerUrl }) => {
        sendGqlRequest(gqlServerUrl, 'query {\n    getAllStrings\n}', {})
          .then((validGqlResponse) => {
            const { data: validGqlResponseBodyData } = validGqlResponse;

            validGqlResponse.should.have.property('status').to.be.equal(httpStatusCode.OK);
            validGqlResponseBodyData.getAllStrings.should.have.lengthOf(2);
            validGqlResponseBodyData.getAllStrings.should.be.eql(['String 1', 'String 2']);
            done();
          })
          .catch((err) => done(new Error(err)));
      });
    });

    it('should default to an empty gqlVariables object if and send a valid query without the provided object', (done) => {
      gqlServer.then(({ url: gqlServerUrl }) => {
        sendGqlRequest(gqlServerUrl, 'query {\n    getAllStrings\n}')
          .then((validGqlResponse) => {
            const { data: validGqlResponseBodyData } = validGqlResponse;

            validGqlResponse.should.have.property('status').to.be.equal(httpStatusCode.OK);
            validGqlResponseBodyData.getAllStrings.should.have.lengthOf(2);
            validGqlResponseBodyData.getAllStrings.should.be.eql(['String 1', 'String 2']);
            done();
          })
          .catch((err) => done(new Error(err)));
      });
    });

    it('should be able to send a valid mutation', (done) => {
      gqlServer.then(({ url: gqlServerUrl }) => {
        sendGqlRequest(gqlServerUrl, 'mutation {\n    addString(stringToAdd: "Hello World")\n}', {})
          .then((validGqlResponse) => {
            const { data: validGqlResponseBodyData } = validGqlResponse;

            validGqlResponse.should.have.property('status').to.be.equal(httpStatusCode.OK);
            validGqlResponseBodyData.addString.should.be.eql('Hello World');
            done();
          })
          .catch((err) => done(new Error(err)));
      });
    });
  });

  context('Should not send queries if invalid parameters are provided', () => {
    it('should throw a TypeError if no GQL query (i.e. empty, undefined, or null) is provided', (done) => {
      // Checking for specfic error type being thrown from function, should.throws() was not working
      gqlServer.then(({ url: gqlServerUrl }) => {
        sendGqlRequest(gqlServerUrl, '', {}).catch((err) => {
          return err instanceof TypeError ? done() : done('Invalid parameters did not raise a TypeError');
        });
      });
    });

    it('should throw an Error if a non-existent URL and valid query are provided', (done) => {
      gqlServer.then(() => {
        sendGqlRequest(
          'http://somerandomurl35614083853.com',
          'mutation {\n    addString(stringToAdd: "Hello World")\n}',
          {}
        ).catch((err) => {
          return err instanceof Error ? done() : done('Invalid parameters did not raise an Error');
        });
      });
    });
  });
});
