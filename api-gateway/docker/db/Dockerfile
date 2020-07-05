# Via https://hub.docker.com/_/postgres/
FROM postgres

ENV POSTGRES_DB=${POSTGRES_DB_NAME}
ENV POSTGRES_USER=${POSTGRES_USER}
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}

COPY docker/db/accounts_database_init.sql /docker-entrypoint-initdb.d/
CMD ["docker-entrypoint.sh", "postgres"]

EXPOSE ${POSTGRES_DB_PORT}