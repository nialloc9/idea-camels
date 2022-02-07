AWS_PROFILE?=idea-camels
AWS_REGION?=eu-west-1
NAME?=builder-prod
ACCOUNT_NUMBER?=115830081349
VERSION?=1.0.1

ECR_HOSTNAME=$(ACCOUNT_NUMBER).dkr.ecr.eu-west-1.amazonaws.com

deploy:
	aws ecr get-login-password --profile ${AWS_PROFILE} --region ${AWS_REGION} | docker login --username AWS --password-stdin $(ECR_HOSTNAME)
	docker build -t $(ECR_HOSTNAME)/$(NAME):${VERSION} -t $(ECR_HOSTNAME)/$(NAME):latest .
	docker push $(ECR_HOSTNAME)/$(NAME):${VERSION}
	docker push $(ECR_HOSTNAME)/$(NAME):latest

deploy-via-cicd:
	aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin $(ECR_HOSTNAME)
	docker build -t $(ECR_HOSTNAME)/$(NAME):${VERSION} -t $(ECR_HOSTNAME)/$(NAME):latest .
	docker push $(ECR_HOSTNAME)/$(NAME):${VERSION}
	docker push $(ECR_HOSTNAME)/$(NAME):latest