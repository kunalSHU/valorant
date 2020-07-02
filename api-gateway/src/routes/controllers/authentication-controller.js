const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isObjectEmpty = require('../../utils/is-object-empty.js');

const jwtSecret = require('../../environment-config.json').middlewares.authentication.jwtSecret;
const defaultTokenExpiryTimeMs = require('../../environment-config.json').middlewares.authentication
  .defaultTokenExpiryTimeMs;

// TODO move from in-memory to persistnace (PSQL)
/* eslint-disable require-jsdoc */
const users = [];

const findUserWithJwtToken = (email, sessionJwtToken) => {
  let i = users.length;
  while (i--) {
    const { email: userEmail, sessionJwtToken: userSessionJwtToken, ...user } = users[parseInt(i)];

    if (email.localeCompare(userEmail) === 0 && userSessionJwtToken.localeCompare(sessionJwtToken) === 0) {
      return { userFoudIdx: i, user: { userEmail, userSessionJwtToken, ...user } };
    }
  }
  return { userFoundIdx: -1, user: {} };
};

const findUser = (email) => {
  let i = users.length;
  while (i--) {
    if (users[parseInt(i)].email === email) {
      return { userFoudIdx: i, user: users[parseInt(i)] };
    }
  }
  return { userFoundIdx: -1, user: {} };
};

const deleteUser = (email) => {
  const { userFoundIdx, user } = findUser(email);
  if (isObjectEmpty(user)) {
    return false;
  }
  users.slice(userFoundIdx, 1);
  return true;
};

const addUser = (name, email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const currDate = new Date().getTime();
  const sessionJwtToken = jwt.sign({ currDate }, process.env.JWT_SECRET || jwtSecret, {
    expiresIn: defaultTokenExpiryTimeMs
  });

  if (!isObjectEmpty(findUser(email).user)) {
    return {};
  } else {
    const newUser = { name, email, hashedPassword, sessionJwtToken };
    users.push(newUser);
    return newUser;
  }
};

module.exports = { findUser, addUser, deleteUser, findUserWithJwtToken, users };
