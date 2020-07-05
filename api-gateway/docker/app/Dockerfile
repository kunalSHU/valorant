FROM node:14.5.0-alpine3.12

# Add bash for use by the wait-for-it dependency
RUN apk update
RUN apk upgrade
RUN apk add bash

# APP SETUP
WORKDIR /app
COPY . /app
RUN npm install

COPY ./docker/app/wait-for-it.sh /usr/local
RUN chmod +x /usr/local/wait-for-it.sh

EXPOSE ${APP_PORT}

CMD ["npm", "start"]
