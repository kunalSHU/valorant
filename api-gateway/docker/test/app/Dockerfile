FROM node:10.15.0-alpine

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

COPY src /home/app/src

RUN npm install --only=prod

EXPOSE ${APP_PORT}

CMD ["npm", "start"]