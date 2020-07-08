#!/bin/bash
POSTGRES="psql postgres -U postgres"

$POSTGRES <<EOSQL
DROP DATABASE IF EXISTS bookings_db;
CREATE DATABASE bookings_db;
EOSQL

echo "Creating schema and populating database..."
psql -d bookings_db -a -U postgres -f bookings_info.sql
psql -d bookings_db -a -U postgres -f data.sql


