AWS_PROFILE?=idea-camels
AWS_REGION?=eu-west-1
NAME?=api-prod
ACCOUNT_NUMBER?=115830081349

ECR_HOSTNAME=$(ACCOUNT_NUMBER).dkr.ecr.eu-west-1.amazonaws.com

PATCH_DEFAULT_VERSION?=1
MAJOR_VERSION?=1
MINOR_VERSION?=0

deploy:
	aws ecr get-login-password --profile ${AWS_PROFILE} --region ${AWS_REGION} | docker login --username AWS --password-stdin $(ECR_HOSTNAME)
	docker build --no-cache -t $(ECR_HOSTNAME)/$(NAME):${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_DEFAULT_VERSION} -t $(ECR_HOSTNAME)/$(NAME):latest .
	docker push $(ECR_HOSTNAME)/$(NAME):${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_DEFAULT_VERSION}
	docker push $(ECR_HOSTNAME)/$(NAME):latest
	AWS_REGION=${AWS_REGION} AWS_PROFILE=${AWS_PROFILE} aws lambda update-function-code --function-name  prod_ideacamels_api --publish --image-uri $(ECR_HOSTNAME)/$(NAME):latest

deploy-via-cicd:
	aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin $(ECR_HOSTNAME)
	docker build --no-cache -t $(ECR_HOSTNAME)/$(NAME):${MAJOR_VERSION}.${MINOR_VERSION}.${GITHUB_RUN_NUMBER} -t $(ECR_HOSTNAME)/$(NAME):latest .
	docker push $(ECR_HOSTNAME)/$(NAME):${MAJOR_VERSION}.${MINOR_VERSION}.${GITHUB_RUN_NUMBER}
	docker push $(ECR_HOSTNAME)/$(NAME):latest
	AWS_REGION=${AWS_REGION} aws lambda update-function-code --function-name  prod_ideacamels_api --publish --image-uri $(ECR_HOSTNAME)/$(NAME):latest

post-deploy:
	sh ./scripts/check_api_endpoint.sh