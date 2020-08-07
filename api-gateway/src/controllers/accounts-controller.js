const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db/db.js');

const jwtSecret = require('../middlewares/middleware-config.js').authentication.getJwtSecret();
const defaultTokenExpiryTimeMs = require('../middlewares/middleware-config.js').authentication.defaultTokenExpiryTimeMs;

/**
 * Returns all Accounts that exist in the Accounts DB.
 *
 * @returns {Array} An array of Accounts.
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
 * Returns the JWT token assosicated with the given Account email.
 *
 * @param {string} email - The email of the Account token to be found.
 *
 * @returns {string} The JWT token if it exists, otherwise returns an empty string (i.e '').
 */
const findMatchingAccountTokenByEmail = async (email) => {
  try {
    const {
      rows: foundAccountRows
    } = await db.query(
      'SELECT jwt_token FROM tokens_tbl INNER JOIN accounts_tbl ON tokens_tbl.account_id=(SELECT account_id FROM accounts_tbl WHERE email_address=$1)',
      [email]
    );

    return foundAccountRows.length === 0 ? '' : foundAccountRows[0].jwt_token;
  } catch (err) {
    throw new Error(
      `Could not find an Account in tokens_tbl that matched the given JWT token. Message: ${err.message}`
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
  try {
    const { rows } = await db.query('SELECT * FROM accounts_tbl WHERE email_address=$1', [email]);

    return rows.length === 0 ? {} : rows[0];
  } catch (err) {
    throw new Error(`Could not find the Account in accounts_tbl'. Message: ${err.message}`);
  }
};

/**
 * Returns the single user who is associated with the specified email.
 *
 * @param {string} email - The email of the Account whose role needs to be found.
 *
 * @returns {object} An object containing the role of the Account.
 */
const getAccountRoleByEmaill = async (email) => {
  try {
    const {
      rows
    } = await db.query(
      'SELECT account_role FROM "permissions_tbl" WHERE account_id=(SELECT account_id FROM accounts_tbl WHERE email_address=$1)',
      [email]
    );

    return rows.length === 0 ? {} : rows[0];
  } catch (err) {
    throw new Error(`Could not find the role in permissions_tbl'. Message: ${err.message}`);
  }
};

/**
 * Returns a JWT session token if the Account has been created successfully.
 *
 * @param {string} emailAddress - The email address used to create the Account.
 * @param {string} password - The password used to create the Account which will be hashed and stored in the DB.
 * @returns {string} A JWT session token if the Account has been created successfully. Otherwise returns an empty object.
 */
const addAccount = async (emailAddress, password) => {
  const passwordSalt = bcrypt.genSaltSync(8);
  const hashedPassword = bcrypt.hashSync(password, passwordSalt);

  // Add account to accounts_tbl
  try {
    const {
      rows: addedAccountRows
    } = await db.query(
      'INSERT INTO accounts_tbl(email_address, password_hash, password_salt) VALUES($1, $2, $3) RETURNING account_id',
      [emailAddress, hashedPassword, passwordSalt]
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
      try {
        const {
          rows: addedPermissionsRows
        } = await db.query(
          "INSERT INTO permissions_tbl(account_id, account_role) VALUES((SELECT account_id FROM accounts_tbl WHERE email_address=$1), 'patient') RETURNING account_role",
          [emailAddress]
        );

        const accountRole = addedPermissionsRows[0].account_role;

        return addedJwtTokenRows.length === 0 ? { sessionJwtToken, accountRole } : {};
      } catch (err) {
        throw new Error(`Could not add account_role to permissions_tbl. Message: ${err.message}`);
      }
    } catch (err) {
      throw new Error(`Could not add JWT token to tokens_tbl. Message: ${err.message}`);
    }
  } catch (err) {
    throw new Error(`Could not add the Account to accounts_tbl. Message: ${err.message}`);
  }
};

/**
 * Returns a JWT session token if the Account has been verified successfully.
 *
 * @param {string} emailAddress - The email address of the user.
 * @param {string} password - The password of the user.
 * @returns {string} A JWT session token if the Account has been verified successfully. Otherwise returns an empty object.
 */
const verifyAccount = async (emailAddress, password) => {
  // get the salt for the user
  try {
    const {
      rows: selectedPasswordSaltRows
    } = await db.query('SELECT password_salt FROM accounts_tbl WHERE email_address=$1', [emailAddress]);

    if (selectedPasswordSaltRows[0] == undefined) {
      throw new Error(`Account Does not exist`);
    }

    const passwordSalt = selectedPasswordSaltRows[0].password_salt;
    const hashedPassword = bcrypt.hashSync(password, passwordSalt);

    // Add account to accounts_tbl
    try {
      const {
        rows: selectedAccountRows
      } = await db.query(
        'SELECT account_id FROM accounts_tbl WHERE email_address=$1 AND password_hash=$2 AND password_salt=$3',
        [emailAddress, hashedPassword, passwordSalt]
      );

      const accountId = selectedAccountRows[0].account_id;

      const currDate = new Date().getTime();
      const sessionJwtToken = jwt.sign({ currDate }, jwtSecret, {
        expiresIn: defaultTokenExpiryTimeMs
      });
      // Check if token exist
      const { rows: selectedJwtTokenRows } = await db.query('SELECT jwt_token FROM tokens_tbl WHERE account_id=$1', [
        accountId
      ]);

      if (selectedJwtTokenRows[0] != undefined) {
        return selectedJwtTokenRows[0].jwt_token;
      }

      // Add token to tokens_tbl if expired
      try {
        const {
          rows: addedJwtTokenRows
        } = await db.query('INSERT INTO tokens_tbl(account_id, jwt_token) VALUES($1, $2)', [
          accountId,
          sessionJwtToken
        ]);
        return addedJwtTokenRows.length === 0 ? sessionJwtToken : {};
      } catch (err) {
        throw new Error(`Could not add JWT token to tokens_tbl. Message: ${err.message}`);
      }
    } catch (err) {
      throw new Error(`Could not add the Account to accounts_tbl. Message: ${err.message}`);
    }
  } catch (err) {
    throw new Error(`Could not fetch password salt from accounts_tbl. Message: ${err.message}`);
  }
};

/**
 * Deletes the Account from the DB that was created using the specified email.
 *
 * @param {string} email - The email of the Account token to be found.
 *
 * @returns {object} The single Account object of the Account that was deleted.
 */
const deleteAccountByEmail = async (email) => {
  try {
    const { rows: deletedAccountRows } = await db.query('DELETE FROM accounts_tbl WHERE email_address=$1 RETURNING *', [
      email
    ]);

    return deletedAccountRows.length === 0 ? {} : deletedAccountRows[0];
  } catch (err) {
    throw new Error(`Could not delete the Account in accounts_tbl'. Message: ${err.message}`);
  }
};

module.exports = {
  findAllAccounts,
  findMatchingAccountTokenByEmail,
  findAccountByEmail,
  getAccountRoleByEmaill,
  addAccount,
  verifyAccount,
  deleteAccountByEmail
};
