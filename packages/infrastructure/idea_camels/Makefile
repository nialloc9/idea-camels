PROD=idea-camels
NON_PROD=idea-camels-dev
AWS_REGION=eu-west-1

PROD_LOCAL_DB_PORT=3307
PROD_PATH_TO_SSH=./prod_ideacamels.pem
PROD_REMOTE_DB_HOSTNAME=terraform-20210930174456492900000001.cjqxidwezq2m.eu-west-1.rds.amazonaws.com
PROD_BASTION_PUBLIC_IP=3.249.245.30

BASTION_USERNAME=ubuntu
REMOTE_DB_PORT=3306

create_state_bucket:
	aws --profile=idea-camels s3api create-bucket --bucket idea-camels-infrastructure-state --region eu-west-1  --create-bucket-configuration LocationConstraint=eu-west-1

create_lambda_bucket:
	aws --profile=idea-camels s3api create-bucket --bucket idea-camels-lambda-source-code --region eu-west-1  --create-bucket-configuration LocationConstraint=eu-west-1

terraform_apply:
	terraform apply -out=state.json

test_coming_soon_lambda:
	aws --profile=idea-camels lambda invoke --region=eu-west-1 --function-name=coming_soon output.tx

init:
	export AWS_PROFILE=$(AWS_PROFILE) \
	&& terraform init -backend-config=environments/$(ENV)/backend.tfvars

plan:
	export AWS_PROFILE=$(AWS_PROFILE) \
	&& terraform plan --var-file=environments/$(ENV)/variables.tfvars

apply:
	export AWS_PROFILE=$(AWS_PROFILE) \
	&& export AWS_REGION=$(AWS_REGION) \
	&& terraform apply -auto-approve --var-file=environments/$(ENV)/variables.tfvars -target=module.domain.aws_acm_certificate.cert \
	&& terraform apply -auto-approve --var-file=environments/$(ENV)/variables.tfvars -target=module.ecr.api_ecr.aws_ecr_repository \
	&& terraform apply -auto-approve --var-file=environments/$(ENV)/variables.tfvars \
	&& terraform output

destroy:
	# create_cert_validations needed as workaround for validations count need to be set to 0 when destroying
	export AWS_PROFILE=$(AWS_PROFILE) \
	&& export AWS_REGION=$(AWS_REGION) \
	&& terraform destroy -var="create_cert_validations=false" --var-file=environments/$(ENV)/variables.tfvars
	
# INFRA
init-prod:
	AWS_PROFILE=${PROD} ENV=prod make init

plan-prod:
	AWS_PROFILE=${PROD} ENV=prod make plan

deploy-prod:
	AWS_PROFILE=${PROD} ENV=prod make apply

destroy-prod:
	AWS_PROFILE=${PROD} ENV=prod make destroy

deploy-via-cicd:
	terraform init \
	&& terraform apply -auto-approve --var-file=environments/prod/variables.tfvars -target=module.domain.aws_acm_certificate.cert \
	&& terraform apply -auto-approve --var-file=environments/prod/variables.tfvars -target=module.ecr.api_ecr.aws_ecr_repository \
	&& terraform apply -auto-approve --var-file=environments/prod/variables.tfvars \
	&& terraform output

# BASTION
ssh-prod-bastion:
	ssh -i "${PROD_PATH_TO_SSH}" ${BASTION_USERNAME}@${PROD_BASTION_PUBLIC_IP}

prod-bastion-proxy-db:
	ssh -i "${PROD_PATH_TO_SSH}" -f -N -L ${PROD_LOCAL_DB_PORT}:${PROD_REMOTE_DB_HOSTNAME}:${REMOTE_DB_PORT} ${BASTION_USERNAME}@${PROD_BASTION_PUBLIC_IP} -v

