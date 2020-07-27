#!/bin/sh

CONTAINER_DATA_DIR='container-data'

if [ -d "$CONTAINER_DATA_DIR" ]; then
  echo "Removing $CONTAINER_DATA_DIR directory"
  command rm -rf container-data
fi

echo "Removing previous API Gateway app image"
docker image rm -f api-gateway_app
echo "Removing previous API Gateway db image"
docker image rm -f api-gateway_db

echo "Bringing down any previous API Gateway instances"
docker-compose down
echo "Building API Gateway instance"
docker-compose build
echo "Bringing up API Gateway instance"
docker-compose up
