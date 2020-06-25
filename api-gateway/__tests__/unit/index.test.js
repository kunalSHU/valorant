/* eslint-disable no-use-before-define */
/* eslint-disable require-jsdoc */
const request = require('supertest');
const expect = require('chai').expect;
const express = require('express');

const httpStatusCode = require('../../src/utils/http-status-code.js');

const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;

const rateLimiter = require('../../src/middlewares/rate-limiter.js');

describe('Can rate limit requests', () => {
  const tooManyRequestsMessage = 'Too many requests. Please try again later';
  const maxRequestWindowMs = 10000;
  const maxRequestsAllowedPerWindow = 2;

  const app = express();
  app.use(
    rateLimiter(maxRequestWindowMs, maxRequestsAllowedPerWindow, (req, res) => {
      res.json({ message: tooManyRequestsMessage });
    })
  );

  app.get('/', (req, res) => {
    res.status(httpStatusCode.OK).json('Test endpoint');
  });

  it('should allow the first request through', (done) => {
    request(app).get('/').expect(httpStatusCode.OK);
    request(app).get('/').expect(httpStatusCode.OK);
    done();
  });

  it('should refuse any additional requests', async () => {
    await request(app).get('/').expect(httpStatusCode.OK);
    await request(app).get('/').expect(httpStatusCode.OK);
    const rateLimitedResponse = await request(app).get('/').expect(httpStatusCode.CLIENT_TOO_MANY_REQUESTS);
    expect(rateLimitedResponse.body.message).to.be.a('string').to.be.equal(tooManyRequestsMessage);
  });
});

after(() => {
  console.log('Closing index.test.js (API Gateway) test suite');
});
