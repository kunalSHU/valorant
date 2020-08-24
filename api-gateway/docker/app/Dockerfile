FROM node:14.5.0-alpine3.12

# Add bash for use by the wait-for-it dependency
RUN apk update
RUN apk upgrade
RUN apk add bash

# APP SETUP
WORKDIR /app
COPY package.json /app
COPY .env /app
COPY index.js /app
COPY src /app

# Install app dependencies
RUN npm install --no-progress --only=production

# Wait for DB to intialize
COPY ./docker/app/wait-for-it.sh /usr/local
RUN chmod +x /usr/local/wait-for-it.sh

EXPOSE ${APP_PORT}

CMD ["npm", "start"]
