# Building the image from Node version 12
FROM node:latest

# Set the application directory
WORKDIR /usr/src/app

# Install App deåpendencies
# Image just uses the dependencies in the package json file
COPY package*.json ./

RUN npm install

# Bundle App
COPY . .

EXPOSE 8080
#ADD https://raw.githubusercontent.com/nickjj/wait-until/v0.1.0/wait-until /usr/local/bin
#RUN chmod +x /usr/local/bin/wait-until

CMD ["node", "src/index.js"]

