FROM postgres

# Custom initialization scripts
COPY ./db/create_db.sh ./docker-entrypoint-initdb.d/
COPY ./db/patient_info.sql ./docker-entrypoint-initdb.d/
COPY ./db/data.sql ./docker-entrypoint-initdb.d/

