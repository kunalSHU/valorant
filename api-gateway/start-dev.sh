#!/bin/sh

bold_text=$(tput bold)
normal_text=$(tput sgr0)

CONTAINER_DATA_DIR='container-data'

if [ -d "$CONTAINER_DATA_DIR" ]; then
  echo "${bold_text}Removing $CONTAINER_DATA_DIR directory${normal_text}"
  command rm -rf container-data
fi

echo "${bold_text}Removing previous API Gateway app image${normal_text}\n"
docker image rm -f api-gateway_app
echo "${bold_text}Removing previous API Gateway db image${normal_text}\n"
docker image rm -f api-gateway_db

echo "${bold_text}Bringing down any previous API Gateway instances${normal_text}"
docker-compose down
echo "${bold_text}Building API Gateway instance${normal_text}"
docker-compose build
echo "${bold_text}Bringing up API Gateway instance${normal_text}\n"
docker-compose up
