# Via https://hub.docker.com/_/postgres/
FROM postgres

ENV POSTGRES_DB="accounts-db"
ENV POSTGRES_USER="postgres"
ENV POSTGRES_PASSWORD="postgres"

COPY docker/db/accounts-db.sql /docker-entrypoint-initdb.d/

EXPOSE 5432