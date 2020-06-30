FROM postgres

# Custom initialization scripts
COPY ./create_db.sh /docker-entrypoint-initdb.d/create_db.sh
COPY patient_info.sql /patient_info.sql
COPY data.sql /data.sql

RUN chmod +x /docker-entrypoint-initdb.d/create_db.sh