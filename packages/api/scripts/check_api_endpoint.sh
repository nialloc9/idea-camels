#!/bin/bash

status_code=$(curl --write-out %{http_code} --data '{"caller":"post_deploy_test"}' https://ho0gwvmqfa.execute-api.eu-west-1.amazonaws.com/prod/health-check)

if [[ "$status_code" -ne 200 ]] ; then
  echo "API Unavailable"
  exit 500
else
  echo "Recieved $status_code"
  exit 0
fi