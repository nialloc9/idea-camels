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