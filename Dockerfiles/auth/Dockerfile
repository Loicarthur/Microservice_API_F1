FROM node:20.18.0-slim

RUN npm install -g ts-node nodemon

WORKDIR /usr/node/app/auth-service

COPY ./api/auth-service/package*.json .

RUN npm install

WORKDIR /usr/node/app/api/auth-service
COPY ./api/auth-service .

ENV TZ=Europe/Paris

EXPOSE 9001

USER node

CMD ["npm", "run", "dev"]