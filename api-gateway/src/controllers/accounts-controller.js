/* eslint-disable require-jsdoc */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../db/db.js');

const jwtSecret = require('../environment-config.json').middlewares.authentication.jwtSecret;
const defaultTokenExpiryTimeMs = require('../environment-config.json').middlewares.authentication
  .defaultTokenExpiryTimeMs;

const findUserViaEmail = async (email) => {
  try {
    const { rows } = await db.query('SELECT * FROM accounts WHERE emailAddress=$1', [email]);
    return rows;
  } catch (err) {
    return err;
  }
};

const findAll = async () => {
  try {
    const { rows } = await db.query('SELECT * FROM accounts', []);
    return rows;
  } catch (err) {
    return err;
  }
};

const deleteUserViaEmail = async (email) => {
  try {
    const { rowCount } = await db.query('DELETE FROM accounts WHERE emailAddress=$1', [email]);

    if (rowCount === 1) {
      return { message: `User ${email} has been deleted` };
    } else {
      throw Error(`User ${email} could not be found`); //TODO CHECK ERROR
    }
  } catch (err) {
    return err;
  }
};

const addUser = async (firstName, lastName, email, password) => {
  const hashedPassword = bcrypt.hashSync(password, 8);
  const sessionJwtToken = jwt.sign({ currDate: new Date().getTime() }, process.env.JWT_SECRET || jwtSecret, {
    expiresIn: defaultTokenExpiryTimeMs
  });

  try {
    const rows = await db.query(
      'INSERT INTO accounts(firstName, lastName, emailAddress, passwordHash, jwtToken) VALUES($1, $2, $3, $4, $5)',
      [firstName, lastName, email, hashedPassword, sessionJwtToken]
    );

    if (rows.rowCount === 1) {
      return { sessionJwtToken };
    } else {
      throw Error('User already exists');
    }
  } catch (err) {
    return err;
  }
};

module.exports = { findUserViaEmail, findAll, addUser, deleteUserViaEmail };
