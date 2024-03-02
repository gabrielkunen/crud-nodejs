FROM postgres:latest
COPY ./db/seed.sql /docker-entrypoint-initdb.d