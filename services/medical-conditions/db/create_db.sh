#!/bin/bash
POSTGRES="psql --username postgres"

$POSTGRES <<EOSQL
CREATE DATABASE patient_db OWNER postgres;
EOSQL

echo "Creating schema and populating database..."
psql -d patient_db -a -U postgres -f patient_info.sql
psql -d patient_db -a -U postgres -f data.sql
