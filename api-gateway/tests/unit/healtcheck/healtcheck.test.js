const request = require('supertest');
const { describe, it } = require('mocha');

const httpStatusCode = require('../../../src/network-utils/http-status-code.js');
const gatewayServer = require('../../../index.js').server;

describe('[healthcheck.test.js]', () => {
  context('Can return healthcheck information from /healthcheck endpoint', () => {
    it('should get approprate basic network information from the /healthcheck endpoint', async () => {
      const ipv4Matcher = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

      const timezoneMatcher = /^\w+\/\w+$/;
      const isoCountryCodeMatcher = /^[A-Z]{2}$/;

      const gatewayHealthcheckResponse = await request(gatewayServer)
        .get('/healthcheck')
        .set({ 'X-Forwarded-For': '1.2.3.4' }) // Mocking a random IP address so valid geolocation data can be retrieved
        .expect(httpStatusCode.OK);

      gatewayHealthcheckResponse.should.have.property('statusCode').to.be.equal(httpStatusCode.OK);

      const { body: gatewayHealthcheckResponseBody } = gatewayHealthcheckResponse;

      // Check non-healthcheck specific data
      gatewayHealthcheckResponseBody.should.have.property('serviceName').to.be.a('string').to.be.equal('API Gateway');
      gatewayHealthcheckResponseBody.should.have
        .property('message')
        .to.be.a('string')
        .to.be.equal('Pinging /healthcheck on API Gateway');

      // Check healthcheck specific data
      const { protocol, method, routeRequested, requestOriginInfo, serverIpInfo } = gatewayHealthcheckResponseBody.data;

      protocol.should.be.a('string').equal('http');
      method.should.be.a('string').equal('GET');
      routeRequested.should.be.a('string').equal('/healthcheck');

      requestOriginInfo.ianaTimezone.should.be.a('string').match(timezoneMatcher);
      requestOriginInfo.isoCountryCode.should.be.a('string').match(isoCountryCodeMatcher);
      requestOriginInfo.ip.should.be.a('string').match(ipv4Matcher);

      serverIpInfo.publicIpv4.should.be.a('string').match(ipv4Matcher);
      serverIpInfo.privateIpv4.should.be.a('string').match(ipv4Matcher);
    });
  });
});
