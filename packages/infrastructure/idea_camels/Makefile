PROD=idea-camels
NON_PROD=idea-camels-dev

install_terraform:
	apt-get install wget unzip

	wget https://releases.hashicorp.com/terraform/0.11.13/terraform_0.11.13_linux_amd64.zip

	unzip ./terraform_0.11.13_linux_amd64.zip -d /usr/local/bin/

	rm ./terraform_0.11.13_linux_amd64.zip

	terraform -v

install_aws_cli:
	apt-get install awscli -y 
	aws --version

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
	&& terraform apply --var-file=environments/$(ENV)/variables.tfvars

destroy:
	export AWS_PROFILE=$(AWS_PROFILE) \
	&& terraform destroy --var-file=environments/$(ENV)/variables.tfvars
	
# INFRA
init-prod:
	AWS_PROFILE=${PROD} ENV=prod make init

plan-prod:
	AWS_PROFILE=${PROD} ENV=prod make plan

deploy-prod:
	AWS_PROFILE=${PROD} ENV=prod make apply

destroy-prod:
	AWS_PROFILE=${PROD} ENV=prod make destroy