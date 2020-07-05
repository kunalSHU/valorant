FROM node

RUN mkdir -p /app/src/
WORKDIR /app/

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

COPY ./package.json ./package-lock.json ./
COPY ./src/ ./src/

RUN npm install --prod

EXPOSE ${APP_PORT}

CMD /wait && npm start
