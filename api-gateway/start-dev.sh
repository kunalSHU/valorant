#!/bin/sh

bold_text=$(tput bold)
normal_text=$(tput sgr0)

CONTAINER_DATA_DIR='container-data'

if [ -d "$CONTAINER_DATA_DIR" ]; then
  echo "${bold_text}Removing previous $CONTAINER_DATA_DIR directory${normal_text}"
  command rm -rf container-data
fi

echo "\n${bold_text}Removing previous API Gateway app image${normal_text}"
docker image rm -f api-gateway_app
echo "\n${bold_text}Removing previous API Gateway DB image${normal_text}"
docker image rm -f api-gateway_db

echo "\n${bold_text}Bringing down any previous API Gateway instances${normal_text}"
docker-compose down
echo "\n${bold_text}Building API Gateway instance${normal_text}"
docker-compose build
echo "\n${bold_text}Bringing up complete API Gateway instance (app and DB)${normal_text}"
docker-compose up
