#!/bin/bash
echo "Starting ${ENV} build..."
echo "====== INITIALISING INFRASTRUCTURE FOR ${EXPERIMENT_REF} ======"
# rm -rf experiments/${EXPERIMENT_REF}/infrastructure 
# mkdir -p experiments/${EXPERIMENT_REF}/infrastructure 
# cd ./infrastructure 
# cp -r ./ ../experiments/${EXPERIMENT_REF}/infrastructure 
# cd ..

echo "====== FINISHED INITIALISING INFRASTRUCTURE FOR ${EXPERIMENT_REF} ======"

echo "====== INITIALISING CLIENT FOR ${EXPERIMENT_REF} ======"
rm -rf experiments/${EXPERIMENT_REF}/client
mkdir -p experiments/${EXPERIMENT_REF}/client
cd templates/${TEMPLATE_REF}
cp -r ./ ../../experiments/${EXPERIMENT_REF}/client 
cd ../../
echo "====== FINISHED INITIALISING CLIENT FOR ${EXPERIMENT_REF} ======"

node ./configureExperiment.js

# echo "====== BUILDING INFRASTRUCTURE FOR ${EXPERIMENT_REF} ======"

# cd experiments/${EXPERIMENT_REF}/infrastructure 

# rm -rf .terraform 
# terraform init -backend-config=environment/backend.tfvars 

# # echo "====== FINISHED BUILDING INFRASTRUCTURE FOR ${EXPERIMENT_REF} ======"

# if [ ENV="production" ]
# then
# # cd experiments/${EXPERIMENT_REF}/infrastructure 
# echo "====== DEPLOYING INFRASTRUCTURE FOR ${EXPERIMENT_REF} ======"

# terraform apply -auto-approve --var-file=./environment/variables.tfvars -target=module.experiment.aws_acm_certificate.cert
# terraform apply -auto-approve --var-file=./environment/variables.tfvars
# echo "====== FINISHED DEPLOYING INFRASTRUCTURE FOR ${EXPERIMENT_REF} ======"
# fi

# echo "====== BUILDING CLIENT FOR ${EXPERIMENT_REF} ======"

cd experiments/${EXPERIMENT_REF}/client 
rm -rf ./build
npm install 
npm run build 

echo "====== FINISHED BUILDING CLIENT FOR ${EXPERIMENT_REF} ======"

if [ ENV="production" ]
then
echo "====== DEPLOYING CLIENT FOR ${EXPERIMENT_REF} ======"
aws s3 sync ./build s3://${DOMAIN} --delete
echo "====== FINSIHED DEPLOYING CLIENT FOR ${EXPERIMENT_REF} ======"
fi