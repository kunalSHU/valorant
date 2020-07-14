#!/bin/bash
POSTGRES="psql postgres -U postgres"

$POSTGRES <<EOSQL
DROP DATABASE IF EXISTS accounts_db;
CREATE DATABASE accounts_db;
EOSQL

echo "Creating schema and populating database..."
psql -d accounts_db -a -U postgres -f accounts_info.sql
psql -d accounts_db -a -U postgres -f data.sql


