FROM node:14

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json /usr/src/app/

RUN npm install

# Bundle app source
COPY . .

# Copying source files
COPY . /usr/src/app
EXPOSE 3000

# Running the app
CMD [ "node", "dist/server.js" ]