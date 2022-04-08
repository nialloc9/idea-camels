FROM node:14

USER root

WORKDIR /usr/src/app

COPY . .

RUN apt-get update

RUN apt-get install -y awscli

ENV TERRAFORM_VERSION 0.15.3

RUN wget -O terraform.zip https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
  unzip terraform.zip -d /usr/local/bin && \
  rm -f terraform.zip
