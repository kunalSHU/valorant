const request = require('supertest');
const expect = require('chai').expect;
const { describe, it } = require('mocha');

const httpStatusCode = require('../../../src/network-utils/http-status-code.js');
const gatewayServer = require('../../../index.js').server;

describe('Can return healthcheck information', () => {
  it('should get approprate basic network information from the /healthcheck endpoint', (done) => {
    const ipv4Matcher = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    const timezoneMatcher = /^\w+\/\w+$/;
    const isoCountryCodeMatcher = /^[A-Z]{2}$/;

    request(gatewayServer)
      .get('/healthcheck')
      .set({ 'X-Forwarded-For': '1.2.3.4' }) // Mocking a random IP address so valid geolocation data can be retrieved
      .expect(httpStatusCode.OK)
      .end((err, res) => {
        const { serviceName, message } = res.body;
        const {
          protocol,
          method,
          routeRequested,
          requestOriginInfo: { ip, ianaTimezone, isoCountryCode },
          serverIpInfo: { publicIpv4, privateIpv4 }
        } = res.body.data;

        expect(message).to.be.a('string').to.be.equal('Pinging /healthcheck on API Gateway');
        expect(serviceName).to.be.a('string').to.be.equal('API Gateway');
        expect(protocol).to.be.a('string').to.be.equal('http');
        expect(method).to.be.a('string').to.be.equal('GET');
        expect(routeRequested).to.be.a('string').to.be.equal('/healthcheck');
        expect(ip).to.be.a('string').to.match(ipv4Matcher);
        expect(ianaTimezone).to.be.a('string').and.to.match(timezoneMatcher);
        expect(isoCountryCode).to.be.a('string').and.to.match(isoCountryCodeMatcher);
        expect(publicIpv4).to.be.a('string').to.match(ipv4Matcher);
        expect(privateIpv4).to.be.a('string').to.match(ipv4Matcher);

        done();
      });
  });
});
