FROM node:10.15.0-alpine

WORKDIR /home/app

# Package location is relative to the location of the Dockerfile
COPY package.json /home/app/
COPY package-lock.json /home/app/

# Copying directories into Docker image
# https://stackoverflow.com/questions/26504846/copy-directory-to-other-directory-at-docker-using-add-command
COPY src src

# Install all non development dependencies
RUN npm install --only=prod

EXPOSE 8085

CMD ["npm", "start"]

# Include a shell script for anything more advanced that needs to be completed in the image 