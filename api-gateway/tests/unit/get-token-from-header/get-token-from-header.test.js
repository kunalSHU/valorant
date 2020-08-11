const { expect } = require('chai');
const { describe, it } = require('mocha');

const getTokenFromHeader = require('../../../src/network-utils/get-token-from-header.js');

describe('[get-token-from-header.test.js]', () => {
  context("Can retrieve a token from an authorization header in the correct 'Bearer <Token>' format", () => {
    it('should retrieve token from a valid authorization header', () => {
      const validAuthorizationHeader = {
        headers: {
          authorization: 'Bearer ABC123'
        }
      };

      getTokenFromHeader(validAuthorizationHeader).should.be.a('string').to.be.equal('ABC123');
    });

    it('should return an empty string if authorization header is not sent', () => {
      const nonExistentAuthorizationHeader = { headers: {} };

      getTokenFromHeader(nonExistentAuthorizationHeader).should.be.a('string').to.be.equal('');
    });
  });

  context('Can handle invalid string based authorization header formats', () => {
    it('should return an empty string if authorization header is not sent in a request', () => {
      const nonExistentAuthorizationHeader = { headers: {} };

      getTokenFromHeader(nonExistentAuthorizationHeader).should.be.a('string').to.be.equal('');
    });

    it("should return an empty string if authorization header is not in 'Bearer <token>' format", () => {
      const invalidAuthorizationHeaderFormatHeader = {
        headers: {
          authorization: 'BearerABC123'
        }
      };

      getTokenFromHeader(invalidAuthorizationHeaderFormatHeader).should.be.a('string').to.be.equal('');
    });
  });

  context('Can handle non-string authorization header formats', () => {
    it('should throw a TypeError if a number is provided in the authorization header', () => {
      const invalidNumericAuthorizationHeader = {
        headers: {
          authorization: 1
        }
      };

      // Using anonymous function to catch errors with Chai: https://exceptionshub.com/mocha-chai-expect-to-throw-not-catching-thrown-errors-2.html
      expect(() => getTokenFromHeader(invalidNumericAuthorizationHeader)).to.throw(TypeError);
    });
    it('should throw a TypeError if an object is provided in the authorization header', () => {
      const invalidObjectAuthorizationHeader = {
        headers: {
          authorization: {
            someData: 'someValue'
          }
        }
      };

      // Using anonymous function to catch errors with Chai: https://exceptionshub.com/mocha-chai-expect-to-throw-not-catching-thrown-errors-2.html
      expect(() => getTokenFromHeader(invalidObjectAuthorizationHeader)).to.throw(TypeError);
    });
  });
});
