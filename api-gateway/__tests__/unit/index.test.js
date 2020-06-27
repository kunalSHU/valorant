const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;

const describe = require('mocha').describe;
const it = require('mocha').it;
const after = require('mocha').after;

const httpStatusCode = require('../../src/utils/http-status-code.js');

const environmentConfig = require('../../src/environment-config.json');

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
  it("should get a response from '/' endpoint", (done) => {
    request(gatewayServer)
      .get('/')
      .expect(httpStatusCode.OK)
      .end((err, res) => {
        expect(res.body.message).to.be.a('string').to.be.equal('Valorant API Gateway reached');
        done();
      });
  });

  it('should get appropriate basic network information from the /healthcheck endpoint', (done) => {
    const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    const timezoneRegex = /^\w+\/\w+$/;
    const isoCountryCodeRegex = /^[A-Z]{2}$/;

    request(gatewayServer)
      .get('/healthcheck')
      .set({ 'X-Forwarded-For': '1.2.3.4' }) // Mocking a random IP address so valid geolocation data can be retrieved
      .expect(httpStatusCode.OK)
      .end((err, res) => {
        const { message } = res.body;
        const {
          serviceName,
          protocol,
          method,
          routeRequested,
          requestOriginIpInfo: { ip, timezone, country },
          serverIpInfo: { publicIpv4, privateIpv4 }
        } = res.body.data;

        expect(message).to.be.a('string').to.be.equal('Pinging /healthcheck on API Gateway');
        expect(serviceName).to.be.a('string').to.be.equal(environmentConfig.application.serviceName);
        expect(protocol).to.be.a('string').to.be.equal('http');
        expect(method).to.be.a('string').to.be.equal('GET');
        expect(routeRequested).to.be.a('string').to.be.equal('/healthcheck');
        expect(ip).to.be.a('string').to.match(ipv4Regex);
        expect(timezone).to.be.a('string').and.to.match(timezoneRegex);
        expect(country).to.be.a('string').and.to.match(isoCountryCodeRegex);
        expect(publicIpv4).to.be.a('string').to.match(ipv4Regex);
        expect(privateIpv4).to.be.a('string').to.match(ipv4Regex);

        done();
      });
  });
});

after(() => {
  console.log('Closing index.test.js (API Gateway) test suite');
});