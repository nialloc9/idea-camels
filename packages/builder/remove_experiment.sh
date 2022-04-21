#
# This script removes old experiments and removes all infra
# 
# ENV VARIABLES
# DOMAIN -> Domain name e.g ideacamels.com
# ENV -> Environment e.g prod
# EXPERIMENT_REF -> The experiment ref from the database e.g 1
# CALLER -> Unique ID for this task e.g hfdahaj44
#

echo "DELETING ${DOMAIN} ${ENV}..."

# TODO: Once run in cron update database with status
# STATUS="DELETING" node ./updateStatus.js

echo "====== INITIALISING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"
rm -rf experiments/${EXPERIMENT_REF}/infrastructure 
mkdir -p experiments/${EXPERIMENT_REF}/infrastructure 
cd ./infrastructure 
cp -r ./ ../experiments/${EXPERIMENT_REF}/infrastructure 
cd ..

echo "====== FINISHED INITIALISING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

node ./configureExperimentForRemoval.js

echo "====== INITIALISING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

cd ./experiments/${EXPERIMENT_REF}/infrastructure 

rm -rf .terraform 
terraform init -backend-config=environment/backend.tfvars -var-file=environment/variables.tfvars

echo "====== FINISHED INITIALISING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

if [ ENV="prod" ]
then
    echo "====== REMOVING CLIENT FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"
    echo "s3://${DOMAIN}"
    aws s3 rm s3://${DOMAIN} --recursive
    echo "====== FINSIHED REMOVING CLIENT FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

    echo "====== DESTROYING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

    terraform destroy -auto-approve --var-file=./environment/variables.tfvars -target=module.experiment.aws_acm_certificate.cert
    terraform destroy -auto-approve --var-file=./environment/variables.tfvars -target=module.experiment.aws_acm_certificate_validation.cert
    terraform destroy -auto-approve --var-file=./environment/variables.tfvars
    echo "====== FINISHED DESTROYING INFRASTRUCTURE FOR ${EXPERIMENT_REF} FROM ${CALLER} ======"

    # TODO: Once run in cron update database with status
    # STATUS="DELETED" node ./updateStatus.js
fi