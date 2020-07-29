const db = require('../db/db.js');

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

module.exports = { findAllAccounts, findAccountByEmail };
