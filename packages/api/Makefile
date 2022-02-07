AWS_PROFILE?=idea-camels
AWS_REGION?=eu-west-1
NAME?=api-prod
ACCOUNT_NUMBER?=115830081349
VERSION?=1.0.1

ECR_HOSTNAME=$(ACCOUNT_NUMBER).dkr.ecr.eu-west-1.amazonaws.com

deploy:
	aws ecr get-login-password --profile ${AWS_PROFILE} --region ${AWS_REGION} | docker login --username AWS --password-stdin $(ECR_HOSTNAME)
	docker build --no-cache -t $(ECR_HOSTNAME)/$(NAME):${VERSION} -t $(ECR_HOSTNAME)/$(NAME):latest .
	docker push $(ECR_HOSTNAME)/$(NAME):${VERSION}
	docker push $(ECR_HOSTNAME)/$(NAME):latest
	AWS_REGION=${AWS_REGION} AWS_PROFILE=${AWS_PROFILE} aws lambda update-function-code --function-name  prod_ideacamels_api --publish --image-uri $(ECR_HOSTNAME)/$(NAME):latest

deploy-via-cicd:
	aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin $(ECR_HOSTNAME)
	docker build --no-cache -t $(ECR_HOSTNAME)/$(NAME):${GITHUB_RUN_NUMBER} -t $(ECR_HOSTNAME)/$(NAME):latest .
	docker push $(ECR_HOSTNAME)/$(NAME):${GITHUB_RUN_NUMBER}
	docker push $(ECR_HOSTNAME)/$(NAME):latest
	AWS_REGION=${AWS_REGION} aws lambda update-function-code --function-name  prod_ideacamels_api --publish --image-uri $(ECR_HOSTNAME)/$(NAME):latest