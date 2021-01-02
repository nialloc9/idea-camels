#!/bin/bash

rm -rf experiments/${EXPERIMENT_REF}/client
mkdir -p experiments/${EXPERIMENT_REF}/client
cd ../templates/${TEMPLATE_REF} \
cp -r ./ ../../experiments/${EXPERIMENT_REF}/client 
cd ../../

cd experiments/${EXPERIMENT_REF}/client 
npm install 
npm build 
aws s3 sync ./build s3://${DOMAIN} --delete