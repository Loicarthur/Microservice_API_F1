FROM node:20.18.0-slim

RUN npm install -g ts-node nodemon

WORKDIR /usr/node/app/users-service

COPY ./api/users-service/package*.json .

RUN npm install

WORKDIR /usr/node/app/api/users-service
COPY ./api/users-service .

ENV TZ=Europe/Paris

EXPOSE 9002

USER node

CMD ["npm", "run", "dev"]