const request = require('supertest');
const { describe, it } = require('mocha');

const chai = require('chai');
const should = chai.should();

const httpStatusCode = require('../../../src/network-utils/http-status-code.js');
const createMockRateLimitedExpressApp = require('./create-rate-limited-express-app.js');

describe('Can rate limit requests', () => {
  const app = createMockRateLimitedExpressApp(10000, 1, 'Too many requests. Please try again later');

  it('should allow the one request through', () => {
    request(app).get('/').expect(httpStatusCode.OK);
  });

  it('should refuse any additional requests', async () => {
    // Make first request
    await request(app).get('/').expect(httpStatusCode.OK);
    // Make second request (rate limit response)
    const rateLimitedResponse = await request(app).get('/');

    rateLimitedResponse.should.have.property('statusCode').to.be.equal(httpStatusCode.CLIENT_TOO_MANY_REQUESTS);

    rateLimitedResponse.body.should.have
      .property('message')
      .to.be.a('string')
      .to.be.equal('Too many requests. Please try again later');
  });
});
