/**
 * HTTP status codes.
 * Retrieved from: https://httpstatuses.com/.
 */
module.exports = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  CLIENT_BAD_REQUEST: 400,
  CLIENT_UNAUTHORIZED: 401,
  CLIENT_FORBIDDEN: 403,
  CLIENT_NOT_FOUND: 404,
  CLIENT_TOO_MANY_REQUESTS: 429,
  CLIENT_UNPROCESSABLE_ENTINTY: 422, // Error code indicating invalid input passed in from client.
  SERVER_INTERNAL_ERROR: 500,
  SERVER_NOT_IMPLEMENTED: 501,
  SERVER_SERVICE_UNAVAILABLE: 503
};
