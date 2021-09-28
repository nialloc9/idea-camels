FROM amazon/aws-lambda-nodejs:14

WORKDIR /usr/src/app

COPY . .

RUN apt-get update

RUN npm install

