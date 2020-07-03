#!/bin/bash
POSTGRES="psql --username postgres"

$POSTGRES <<EOSQL
DROP DATABASE IF EXISTS PATIENT_DB;
CREATE DATABASE PATIENT_DB;
EOSQL

echo "Creating schema and populating database..."
psql -d PATIENT_DB -a -U postgres -f patient_info.sql
psql -d PATIENT_DB -a -U postgres -f data.sql
