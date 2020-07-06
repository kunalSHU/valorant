const { Sequelize } = require('sequelize');

const MAX_POOL_CLIENT_CONNECTIONS = 100;
const MIN_POOL_CLIENT_CONNECTIONS = 0;
const MAX_POOL_CLIENT_IDLE_TIME_BEFORE_RELEASE_MS = 20000;
const MAX_POOL_CLIENT_IDLE_TIME_BEFORE_EVICT_MS = 15000;
const MAX_POOL_CLIENT_AQUIRE_DB_CONNECTION_TIME_MS = 30000;

const sequelizeConfig = {
  dialect: 'postgres',
  logging: true,
  operatorsAliases: Sequelize.Op,
  pool: {
    max: MAX_POOL_CLIENT_CONNECTIONS,
    min: MIN_POOL_CLIENT_CONNECTIONS,
    idle: MAX_POOL_CLIENT_IDLE_TIME_BEFORE_RELEASE_MS,
    evict: MAX_POOL_CLIENT_IDLE_TIME_BEFORE_EVICT_MS,
    acquire: MAX_POOL_CLIENT_AQUIRE_DB_CONNECTION_TIME_MS
  }
};

let dbConnection;

/**
 * Connects to the specified PSQL DB and returns an instance of the connection.
 *
 * @param {string} POSTGRES_DB_HOST - The hostname of the machine where the DB is running.
 * @param {string} POSTGRES_DB_NAME - The name of the PSQL database to connect to.
 * @param {string} POSTGRES_USER - The username of the account connecting to the DB.
 * @param {string} POSTGRES_PASSWORD - The password of the account connecting to the DB.
 *
 * @returns {object} The PSQL DB connection.
 */
const connect = (POSTGRES_DB_HOST, POSTGRES_DB_NAME, POSTGRES_USER, POSTGRES_PASSWORD) => {
  const DB_URI = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_DB_HOST}:5432/${POSTGRES_DB_NAME}`;

  // Create a connection to the DB if it does not exist
  if (!dbConnection) {
    dbConnection = new Sequelize(DB_URI, sequelizeConfig);
    console.info(`Connecting to database: ${DB_URI}`);

    dbConnection
      .authenticate()
      .then(() => {
        console.info(`INFO - Connected to database: ${DB_URI}`);
      })
      .catch((err) => {
        console.error('ERROR - Unable to connect to the database:', err);
      });
  }

  return dbConnection;
};

module.exports = connect;
