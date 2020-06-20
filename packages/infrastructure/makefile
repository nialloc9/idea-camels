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
	
# LAMBDAS
deploy_lambdas_infra:
	cd terraform/lambdas && terraform apply && cd ../../
	
# GATEWAY
plan_gateway:
	TF_VAR_account_id=${TF_VAR_account_id} terraform plan

deploy_gateway:
	TF_VAR_account_id=${TF_VAR_account_id} terraform apply

destroy_gateway:
	TF_VAR_account_id=${TF_VAR_account_id} terraform destroy