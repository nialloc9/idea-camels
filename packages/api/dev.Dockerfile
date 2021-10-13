FROM node:14

WORKDIR /usr/src/app

COPY . .

RUN apt-get update

RUN npm install

