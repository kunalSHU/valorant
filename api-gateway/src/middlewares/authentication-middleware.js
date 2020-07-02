/* eslint-disable require-jsdoc */
/* eslint-disable no-console */
const isObjectEmpty = require('../utils/is-object-empty.js');

const authenticationController = require('../routes/controllers/authentication-controller.js');
const httpStatusCode = require('../utils/http-status-code.js');

const authenticationMiddleware = (req, res, next) => {
  const { email, sessionJwtToken } = req.body;

  const { user } = authenticationController.findUser(email);
  console.log(user);

  if (isObjectEmpty(user)) {
    res.status(httpStatusCode.CLIENT_NOT_FOUND).json({ message: 'User does not exist in DB' });
  } else if (user.sessionJwtToken.localeCompare(sessionJwtToken) !== 0) {
    res.status(httpStatusCode.CLIENT_FORBIDDEN).json({ message: 'You are not authorized to perform that action' });
  }
  next();
};

module.exports = authenticationMiddleware;
