# Base image
FROM node:17.8.0

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn build

# Configura o prisma
RUN yarn prisma generate

# Gera banco de dados
# RUN yarn prisma migrate dev --name init

# Roda testes unitários
RUN yarn test

# Start the server using the production build
CMD [ "yarn", "start:prod" ]