# FROM node:14-alpine

# RUN apk add --update npm

# COPY package*.json ./

# RUN npm install

# COPY . .

# WORKDIR /usr/src/task-planning-tool



# Create image based on the official Node 19 image from dockerhub
#FROM node:19.5.0
FROM node:18-alpine

RUN apk add --update npm

RUN npm install -g npm@9.4.0

# Create a directory where our app will be placed
RUN mkdir -p /app

# Change directory so that our commands run inside this new directory
WORKDIR /app

# Copy dependency definitions
COPY package*.json /app/

# Install dependecies
RUN npm install

# Get all the code needed to run the app
COPY . /app/

# Expose the port the app runs in
EXPOSE 4200

# Serve the app
CMD ["npm", "start"]
#CMD ["npm", "run", "ng", "build"]