FROM postgres

# Custom initialization scripts
COPY ./create_db.sh ./docker-entrypoint-initdb.d/
COPY ./patient_info.sql ./docker-entrypoint-initdb.d/
COPY ./data.sql ./docker-entrypoint-initdb.d/

RUN chmod +x ./docker-entrypoint-initdb.d/create_db.sh
RUN chmod +x ./docker-entrypoint-initdb.d/data.sql
RUN chmod +x ./docker-entrypoint-initdb.d/patient_info.sql
