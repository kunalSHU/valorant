const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db/db.js');

const jwtSecret = require('../middlewares/middleware-config.js').authentication.getJwtSecret();
const defaultTokenExpiryTimeMs = require('../middlewares/middleware-config.js').authentication.defaultTokenExpiryTimeMs;

const accountsTable = 'accounts_tbl';

/**
 * Returns all User accounts that exist in the Accounts DB.
 *
 * @returns {object} An object containing a list of Users.
 */
const findAllAccounts = async () => {
  const findAllAccountsQuery = `SELECT * FROM ${accountsTable}`;
  const findAllAccountsQueryVariables = [];

  try {
    const { rows } = await db.query(findAllAccountsQuery, findAllAccountsQueryVariables);
    return rows;
  } catch (err) {
    throw new Error(
      `Could not execute query '${findAllAccountsQuery} with variables '${findAllAccountsQueryVariables}'. Message: ${err.message}`
    );
  }
};

/**
 * Returns the single user who is associated with the specified email.
 *
 * @param {string} email - The email of the Account to be found.
 *
 * @returns {object} An object containing the User who matches the email.
 */
const findAccountByEmail = async (email) => {
  const findSingleAccountByEmailQuery = `SELECT * FROM ${accountsTable} WHERE email_address=$1`;
  const findSingleAccountByEmailQueryVariables = [email];

  try {
    const { rows } = await db.query(findSingleAccountByEmailQuery, findSingleAccountByEmailQueryVariables);

    return rows.length === 0 ? {} : rows[0];
  } catch (err) {
    throw new Error(
      `Could not execute query '${findSingleAccountByEmailQuery} with variables '${findSingleAccountByEmailQueryVariables}'. Message: ${err.message}`
    );
  }
};

/**
 * Returns a JWT session token if the Account has been created successfully.
 *
 * @param {object} account - An Account object containing the Account info of the Account being added.
 * @param {string} account.firstName - The first name of the Account holder.
 * @param {string} account.lastName - The last name of the Account holder.
 * @param {string} account.emailAddress - The email address used to create the Account.
 * @param {string} account.password - The password used to create the Account which will be hashed and stored in the DB.
 *
 * @returns {string} A JWT session token if the Account has been created successfully. Otherwise returns an empty object.
 *
 * @example
 * Adding an Account to the Accounts DB
 *
 * const account = {
 *  firstName: 'Shabaz',
 *  lastName: 'Badshah',
 *  emailAddress: 'shabazemail@email.com',
 *  password: '!!IlikePotatoes23?'
 * };
 * const createdUserJwtSessionToken = await addAccount(account);
 */
const addAccount = async (account) => {
  const { firstName, lastName, emailAddress, password } = account;

  const passwordSalt = bcrypt.genSaltSync(8);
  const hashedPassword = bcrypt.hashSync(password, passwordSalt);

  const addAccountQuery = `INSERT INTO ${accountsTable}(first_name, last_name, email_address, password_hash, password_salt) VALUES($1, $2, $3, $4, $5)`;
  const addAccountQueryVariables = [firstName, lastName, emailAddress, hashedPassword, passwordSalt];

  try {
    const { rows } = await db.query(addAccountQuery, addAccountQueryVariables);

    const currDate = new Date().getTime();
    const sessionJwtToken = jwt.sign({ currDate }, jwtSecret, {
      expiresIn: defaultTokenExpiryTimeMs
    });

    return rows.length === 0 ? { sessionJwtToken } : {};
  } catch (err) {
    throw new Error(
      `Could not execute query '${addAccountQuery} with variables '${addAccountQueryVariables}'. Message: ${err.message}`
    );
  }
};

module.exports = { findAllAccounts, findAccountByEmail, addAccount };
