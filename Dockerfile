FROM node:12

WORKDIR /usr/src/app

COPY . .

RUN apt-get update

RUN make install_terraform

RUN make install_aws_cli