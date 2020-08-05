const { Pool } = require('pg');

const MAX_POOL_CLIENT_CONNECTIONS = 100;
const MIN_POOL_CLIENT_CONNECTIONS = 0;
const MAX_POOL_CLIENT_IDLE_TIMEOUT_BEFORE_RELEASE_MS = 20000;
const MAX_POOL_CLIENT_CONNECTION_TIMEOUT_MS = 30000;

const POSTGRES_DB_HOST = process.env.POSTGRES_DB_HOST || '127.0.0.1';
const POSTGRES_DB_NAME = process.env.POSTGRES_DB_NAME || 'accounts_db';
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';

const DB_URI = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB_HOST}:5432/${POSTGRES_DB_NAME}`;

const dbPoolConfig = {
  max: MAX_POOL_CLIENT_CONNECTIONS,
  min: MIN_POOL_CLIENT_CONNECTIONS,
  connectionTimeoutMillis: MAX_POOL_CLIENT_CONNECTION_TIMEOUT_MS,
  idleTimeoutMillis: MAX_POOL_CLIENT_IDLE_TIMEOUT_BEFORE_RELEASE_MS,
  connectionString: DB_URI
};

const pool = new Pool(dbPoolConfig);

module.exports = {
  query: (queryString, params) => pool.query(queryString, params)
};
