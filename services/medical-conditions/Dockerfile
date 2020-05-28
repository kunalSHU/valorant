FROM node:10.15.0-alpine

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

# Copying directories into Docker image
# https://stackoverflow.com/questions/26504846/copy-directory-to-other-directory-at-docker-using-add-command
COPY src src

# Install all non development dependencies
RUN npm install --only=prod

# Define app port from environment variables or use the default 8085
ARG APP_PORT=8085
ENV APP_PORT=${APP_PORT}

RUN npm start

EXPOSE ${APP_PORT}

# Include a shell script for anything more advanced that needs to be completed in the image 