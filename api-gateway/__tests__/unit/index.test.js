const request = require('supertest');
const expect = require('chai').expect;
const express = require('express');

const httpStatusCode = require('../../src/utils/http-status-code.js');

const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;

const gatewayServer = require('../../src/index.js').server;
const rateLimiter = require('../../src/middlewares/rate-limiter.js');

describe('Can rate limit requests', () => {
  // eslint-disable-next-line require-jsdoc
  const createMockRateLimitedApp = (maxRequestWindowMs, maxRequestsAllowedPerWindow, tooManyRequestsMessage) => {
    const app = express();
    app.use(
      rateLimiter(maxRequestWindowMs, maxRequestsAllowedPerWindow, (req, res) => {
        res.json({ message: tooManyRequestsMessage });
      })
    );

    app.get('/', (req, res) => {
      res.status(httpStatusCode.OK).json({ message: 'Test endpoint reached' });
    });

    return app;
  };

  it('should allow the first request through', (done) => {
    const app = createMockRateLimitedApp(10000, 1, 'Too many requests. Please try again later');
    request(app).get('/').expect(httpStatusCode.OK);
    done();
  });

  it('should refuse any additional requests', async () => {
    const app = createMockRateLimitedApp(10000, 1, 'Too many requests. Please try again later');
    // Make requests to get
    await request(app).get('/').expect(httpStatusCode.OK);
    const rateLimitedResponse = await request(app).get('/').expect(httpStatusCode.CLIENT_TOO_MANY_REQUESTS);
    expect(rateLimitedResponse.body.message).to.be.a('string').to.be.equal('Too many requests. Please try again later');
  });
});

describe('Can be pinged', () => {
  it("should get a response from '/' route", (done) => {
    request(gatewayServer)
      .get('/')
      .expect(httpStatusCode.OK)
      .end((err, res) => {
        expect(res.body.message).to.be.a('string').to.be.equal('Test endpoint reached');
        done();
      });
  });
});

after(() => {
  console.log('Closing index.test.js (API Gateway) test suite');
});
