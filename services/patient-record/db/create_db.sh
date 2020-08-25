#!/bin/bash
POSTGRES="psql postgres -U postgres"

$POSTGRES <<EOSQL
DROP DATABASE IF EXISTS patient_db;
CREATE DATABASE patient_db;
EOSQL

echo "Creating schema and populating database..."
psql -d patient_db -a -U postgres -f /docker-entrypoint-initdb.d/patient_info.sql
#psql -d patient_db -a -U postgres -f /docker-entrypoint-initdb.d/data.sql


