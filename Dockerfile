FROM node:16
WORKDIR /usr/src/app

# Install Node modules
# This is local and should not affect or be affected by those on the host machine
COPY package*.json .
RUN npm install

# Copy files (except node_modules)
COPY . .

# Startup configuration
USER node
EXPOSE 3000
CMD ["npm", "start"]
