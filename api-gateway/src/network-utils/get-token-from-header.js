/**
 * Strips the token from the request authorizationHeader header and returns it. Note: The authorization header is always in the form 'Bearer <token>'.
 *
 * @param {object} req - The Express Request object that was sent from the client.
 *
 * @returns {string} The JWT token from the header.
 *
 * @example
 * req.headers.authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
 * const jwtToken = await getTokenFromHeader(req);
 * console.log(jwtToken) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 */
const getTokenFromRequestHeader = (req) => {
  const { authorization: authorizationHeader } = req.headers;

  if (authorizationHeader === undefined || !authorizationHeader) return '';

  const tokenParts = authorizationHeader.split(' ');
  if (authorizationHeader && tokenParts[0] === 'Bearer') {
    return tokenParts[1];
  }
  return '';
};

module.exports = getTokenFromRequestHeader;
