echo "Starting ${ENV} build..."

echo "====== INITIALISING ROOT FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"
npm install

echo "====== INITIALISING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"
rm -rf experiments/${EXPERIMENT_REF}/infrastructure 
mkdir -p experiments/${EXPERIMENT_REF}/infrastructure 
cd ./infrastructure 
cp -r ./ ../experiments/${EXPERIMENT_REF}/infrastructure 
cd ..

echo "====== FINISHED INITIALISING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

STATUS="INIT_INFRA" node ./updateStatus.js

echo "====== INITIALISING CLIENT FOR ${EXPERIMENT_REF} ======"
rm -rf experiments/${EXPERIMENT_REF}/client
mkdir -p experiments/${EXPERIMENT_REF}/client
cd templates/${TEMPLATE_REF}
cp -r ./ ../../experiments/${EXPERIMENT_REF}/client 
cd ../../
echo "====== FINISHED INITIALISING CLIENT FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

STATUS="INIT_CONFIG" node ./updateStatus.js
node ./configureExperiment.js

STATUS="BUILDING_INFRA" node ./updateStatus.js

echo "====== BUILDING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

cd ./experiments/${EXPERIMENT_REF}/infrastructure 

rm -rf .terraform 
terraform init -backend-config=environment/backend.tfvars -var-file=environment/variables.tfvars

echo "====== FINISHED BUILDING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

if [ ENV="prod" ]
then
echo "====== DEPLOYING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"
STATUS="DEPLOYING_INFRA" node ../../../updateStatus.js

terraform apply -auto-approve --var-file=./environment/variables.tfvars -target=module.experiment.aws_acm_certificate.cert
terraform apply -auto-approve --var-file=./environment/variables.tfvars
echo "====== FINISHED DEPLOYING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"
fi

cd ../client

echo "====== BUILDING CLIENT FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"
STATUS="BUILDING_CLIENT" node ../../../updateStatus.js
rm -rf ./build
npm install
npm run build 

echo "====== FINISHED BUILDING CLIENT FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

ls

if [ ENV="prod" ]
then
STATUS="DEPLOYING_CLIENT" node ../../../updateStatus.js
echo "====== DEPLOYING CLIENT FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"
aws s3 sync ./build s3://${DOMAIN} --delete
echo "====== FINSIHED DEPLOYING CLIENT FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"
fi

STATUS="COMPLETE" node ../../../updateStatus.js