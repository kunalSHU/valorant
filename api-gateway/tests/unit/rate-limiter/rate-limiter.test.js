const request = require('supertest');
const { describe, it } = require('mocha');

const httpStatusCode = require('../../../src/network-utils/http-status-code.js');
const createMockRateLimitedExpressApp = require('./create-rate-limited-express-app.js');

describe('[rate-limiter.test.js]', () => {
  context('Can rate limit requests with maxRequestWindowMs=10000 and maxRequestsAllowedPerWindow=1. ', () => {
    const app = createMockRateLimitedExpressApp(10000, 1, 'Too many requests. Please try again later');

    it('should allow the one request through', async () => {
      // Make first request
      const nonRateLimitedResponse = await request(app).get('/');
      nonRateLimitedResponse.should.have.property('statusCode').to.be.equal(httpStatusCode.OK);
    });

    it('should refuse any additional requests', async () => {
      // Make second request (rate limit response)
      const rateLimitedResponse = await request(app).get('/');

      rateLimitedResponse.should.have.property('statusCode').to.be.equal(httpStatusCode.CLIENT_TOO_MANY_REQUESTS);

      rateLimitedResponse.body.should.have
        .property('message')
        .to.be.a('string')
        .to.be.equal('Too many requests. Please try again later');
    });
  });
});
