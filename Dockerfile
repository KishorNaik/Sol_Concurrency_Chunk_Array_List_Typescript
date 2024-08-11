# NodeJS Version 16
FROM node:20.15-buster-slim

# Copy Dir
COPY . ./app

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Specify the command to start your app (adjust as needed)
CMD ["npm", "run", "build:start"]