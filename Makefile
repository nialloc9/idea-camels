# S3
deploy_site_to_s3:
	aws s3 sync ./dist s3://ideacamels.com --delete

deploy_lambdas_to_s3:
	aws s3 sync ./lambdas/dist s3://ideacamels-coming-soon-lambda --delete

deploy_site_infra:
	cd terraform/s3 && terraform apply && cd ../../

plan_site_infra:
	cd terraform/s3 && terraform plan && cd ../../

destroy_site_infra:
	cd terraform/s3 && terraform destroy && cd ../../

install_terraform:
	apt-get install wget unzip

	wget https://releases.hashicorp.com/terraform/0.11.13/terraform_0.11.13_linux_amd64.zip

	unzip ./terraform_0.11.13_linux_amd64.zip -d /usr/local/bin/

	rm ./terraform_0.11.13_linux_amd64.zip

	terraform -v

install_aws_cli:
	apt-get install awscli -y 
	aws --version
	
# CLOUDFRONT
invalidate_site_cache:
	aws cloudfront create-invalidation --distribution-id ${SITE_DISTRIBUTION_ID} --paths '/*'

# LAMBDAS
deploy_lambdas_infra:
	cd terraform/lambdas && terraform apply && cd ../../

compress_lambdas:
	zip ./lambdas/dist/comingSoon.zip ./lambdas/comingSoon.js

# GATEWAY
plan_gateway:
	TF_VAR_account_id=${TF_VAR_account_id} terraform plan

deploy_gateway:
	TF_VAR_account_id=${TF_VAR_account_id} terraform apply

destroy_gateway:
	TF_VAR_account_id=${TF_VAR_account_id} terraform destroy