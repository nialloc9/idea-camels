#!/bin/bash

echo "Building client for ${EXPERIMENT_REF}"

rm -rf experiments/${EXPERIMENT_REF}/client
mkdir -p experiments/${EXPERIMENT_REF}/client
cd templates/${TEMPLATE_REF}
cp -r ./ ../../experiments/${EXPERIMENT_REF}/client 
cd ../../

cd experiments/${EXPERIMENT_REF}/client 
npm install 
npm run build 

if [ ENV="production" ]
then
aws s3 sync ./build s3://${DOMAIN} --delete
fi

echo "Finished building client for ${EXPERIMENT_REF}"