const getTokenFromRequestHeader = require('../network-utils/get-token-from-header.js');

const authenticationController = require('../controllers/accounts-controller.js');
const httpStatusCode = require('../network-utils/http-status-code.js');

/**
 * Checks if the client is authorized to perform an action in the Gateway. Allows the client to proceed if they are authorized. Otherwise sends an error response back to the client.
 *
 * @param {express.Request} req - The express request object that is being recieved from the client.
 * @param {express.Response} res - The express response object that will be sent back to the client.
 * @param {Function} [next] - Calls the next middleware in the middleware stack.
 *
 * @returns {void}
 */
const authenticationMiddleware = async (req, res, next) => {
  const jwtSessionTokenFromHeader = getTokenFromRequestHeader(req);
  const { email } = req.query;

  if (email === undefined || jwtSessionTokenFromHeader === '') {
    return res
      .status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY)
      .json({ err: 'JWT token or email query param not provided' });
  }

  const matchingAccountToken = await authenticationController.findMatchingAccountTokenByEmail(email);

  if (matchingAccountToken === '') {
    // If Account not found
    return res
      .status(httpStatusCode.OK)
      .json({ message: `Could not find a matching JWT token that matches the email: ${email}` });
  } else if (jwtSessionTokenFromHeader !== matchingAccountToken) {
    // If tokens for Account don't match
    return res
      .status(httpStatusCode.CLIENT_UNAUTHORIZED)
      .json({ message: 'You are not authorized to perform that action' });
  }

  next();
};

module.exports = authenticationMiddleware;
