const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db/db.js');

const jwtSecret = require('../middlewares/middleware-config.js').authentication.getJwtSecret();
const defaultTokenExpiryTimeMs = require('../middlewares/middleware-config.js').authentication.defaultTokenExpiryTimeMs;

/**
 * Returns all User accounts that exist in the Accounts DB.
 *
 * @returns {object} An object containing a list of Users.
 */
const findAllAccounts = async () => {
  try {
    const { rows: allAccountRows } = await db.query('SELECT * FROM accounts_tbl', []);
    return allAccountRows;
  } catch (err) {
    throw new Error(`Could not find any Accounts in accounts_tbl'. Message: ${err.message}`);
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
  try {
    const { rows: foundAccountRows } = await db.query('SELECT * FROM accounts_tbl WHERE email_address=$1', [email]);

    return foundAccountRows.length === 0 ? {} : foundAccountRows[0];
  } catch (err) {
    throw new Error(`Could not find Account in accounts_tbl. Message: ${err.message}`);
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

  // Add account to accounts_tbl
  try {
    const {
      rows: addedAccountRows
    } = await db.query(
      'INSERT INTO accounts_tbl(first_name, last_name, email_address, password_hash, password_salt) VALUES($1, $2, $3, $4, $5) RETURNING account_id',
      [firstName, lastName, emailAddress, hashedPassword, passwordSalt]
    );

    const accountId = addedAccountRows[0].account_id;

    const currDate = new Date().getTime();
    const sessionJwtToken = jwt.sign({ currDate }, jwtSecret, {
      expiresIn: defaultTokenExpiryTimeMs
    });

    // Add token to tokens_tbl
    try {
      const { rows: addedJwtTokenRows } = await db.query(
        'INSERT INTO tokens_tbl(account_id, jwt_token) VALUES($1, $2)',
        [accountId, sessionJwtToken]
      );
      return addedJwtTokenRows.length === 0 ? { sessionJwtToken } : {};
    } catch (err) {
      throw new Error(`Could not add JWT token to tokens_tbl. Message: ${err.message}`);
    }
  } catch (err) {
    throw new Error(`Could not add the Account to accounts_tbl. Message: ${err.message}`);
  }
};

module.exports = { findAllAccounts, findAccountByEmail, addAccount };
