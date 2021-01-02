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
	aws --profile=${AWS_PROFILE} s3api create-bucket --bucket idea-camels-terraform-statefiles --region eu-west-1  --create-bucket-configuration LocationConstraint=eu-west-1
	
# STATE BUCKETS
create_state_bucket_prod:
	AWS_PROFILE=${PROD} make create_state_bucket