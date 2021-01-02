FROM node:15

USER root
WORKDIR /usr/src/app

COPY . .

RUN apt-get update

RUN apt-get install awscli -y 
	
ENTRYPOINT ["sh", "build_client.sh"]