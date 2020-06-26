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
	aws s3api create-bucket --bucket "infrastructure-state" --region "eu-west-1" \ --create-bucket-configuration LocationConstraint="eu-west-1"