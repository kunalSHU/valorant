const sequelize = require('../../db').getDbConnection();
const { DataTypes } = require('sequelize');

const user = sequelize.define(
  'user',
  {
    accountId: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING(64)
    },
    emailAddress: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING(256)
    },
    passwordHash: {
      allowNull: true,
      type: DataTypes.STRING(512)
    },
    accountCreatedTimeUtc: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: 'users_tbl'
  }
);

module.exports = user;
