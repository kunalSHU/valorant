const { Pool } = require('pg');

const connectionString = process.env.DB_CONN_URL || 'postgresql://postgres:postgres@localhost:5432/accounts-db';

const pool = new Pool({
  connectionString
});

console.log(`DB connected on ${connectionString}`);

module.exports = {
  query: (queryString, params) => pool.query(queryString, params),
  getClient: (onGetClient) => {
    pool.connect((err, client, onClientReleasedFromPool) => {
      onGetClient(err, client, onClientReleasedFromPool(err));
    });
  }
};
