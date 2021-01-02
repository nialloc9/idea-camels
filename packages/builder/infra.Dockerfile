FROM hashicorp/terraform

USER root
WORKDIR /usr/src/app

COPY . .

ENTRYPOINT ["sh", "build_infra.sh"]