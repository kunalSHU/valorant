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

module.exports = { findAllAccounts };
