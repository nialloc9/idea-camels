#!/bin/bash

echo "Building infrastructure for ${EXPERIMENT_REF}"

rm -rf experiments/${EXPERIMENT_REF}/infrastructure 
mkdir -p experiments/${EXPERIMENT_REF}/infrastructure 
cd ./infrastructure 
cp -r ./ ../experiments/${EXPERIMENT_REF}/infrastructure 
cd ..

cd experiments/${EXPERIMENT_REF}/infrastructure 

rm -rf .terraform 
terraform init -backend-config=environments/backend.tfvars 

if [ ENV="production" ]
then
terraform apply --var-file=environments/variables.tfvars
fi

echo "Finished building infrastructure for ${EXPERIMENT_REF}"