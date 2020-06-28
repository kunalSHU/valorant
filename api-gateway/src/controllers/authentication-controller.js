const isObjectEmpty = require('../utils/is-object-empty.js');

// TODO move from in-memory to persistnace (PSQL)
/* eslint-disable require-jsdoc */
const users = [];

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

const addUser = (name, email, hashedPassword, sessionJwtToken) => {
  if (!isObjectEmpty(findUser(email).user)) {
    return false;
  }
  users.push({ name, email, hashedPassword, sessionJwtToken });
  return true;
};

module.exports = { findUser, addUser, deleteUser };
