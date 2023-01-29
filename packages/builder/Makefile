AWS_PROFILE?=idea-camels
AWS_REGION?=eu-west-1
NAME?=builder-prod
ACCOUNT_NUMBER?=115830081349
ECR_HOSTNAME=$(ACCOUNT_NUMBER).dkr.ecr.eu-west-1.amazonaws.com
PATCH_DEFAULT_VERSION?=1
MAJOR_VERSION?=1
MINOR_VERSION?=0
EXPERIMENT_REF?=1

# Description: Deploys docker image via cicd manually tagging changes
deploy:
	aws ecr get-login-password --profile ${AWS_PROFILE} --region ${AWS_REGION} | docker login --username AWS --password-stdin $(ECR_HOSTNAME)
	docker build -t $(ECR_HOSTNAME)/$(NAME):${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_DEFAULT_VERSION} -t $(ECR_HOSTNAME)/$(NAME):latest .
	docker push $(ECR_HOSTNAME)/$(NAME):${MAJOR_VERSION}.${MINOR_VERSION}.${PATCH_DEFAULT_VERSION}
	docker push $(ECR_HOSTNAME)/$(NAME):latest

# Description: Deploys docker image via cicd automatically accepting and tagging changes
deploy-via-cicd:
	aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin $(ECR_HOSTNAME)
	docker build -t $(ECR_HOSTNAME)/$(NAME):${MAJOR_VERSION}.${MINOR_VERSION}.${GITHUB_RUN_NUMBER} -t $(ECR_HOSTNAME)/$(NAME):latest .
	docker push $(ECR_HOSTNAME)/$(NAME):${MAJOR_VERSION}.${MINOR_VERSION}.${GITHUB_RUN_NUMBER}
	docker push $(ECR_HOSTNAME)/$(NAME):latest

# Description: Sets up experiment from template
# EXPERIMENT_REF -> experiment ref for experiment. e.g 1
# TEMPLATE_REF -> template to be used for experiment. e.g 1
init-experiment:
	STATUS="INITIALISING_EXPERIMENT" node ./updateStatus.js
	rm -rf ./experiments/${EXPERIMENT_REF} 

	mkdir -p ./experiments/${EXPERIMENT_REF}/client experiments/${EXPERIMENT_REF}/infrastructure 

	cp -a ./infrastructure/. ./experiments/${EXPERIMENT_REF}/infrastructure 
	cp -a ./templates/${TEMPLATE_REF}/. ./experiments/${EXPERIMENT_REF}/client 

	node ./configureExperiment.js

	STATUS="EXPERIMENT_INITIALISED" node ./updateStatus.js

# Description: Deploys experiment infra from template
# EXPERIMENT_REF -> experiment ref for experiment. e.g 1
configure-infrastructure:
	STATUS="CONFIGURING_INFRA" node ./updateStatus.js
	
	cd ./experiments/${EXPERIMENT_REF}/infrastructure &&  rm -rf .terraform 
	cd ./experiments/${EXPERIMENT_REF}/infrastructure && terraform init -backend-config=environment/backend.tfvars -var-file=environment/variables.tfvars

	@if [ ${ENV}="prod" ]; then \
        cd ./experiments/${EXPERIMENT_REF}/infrastructure; \
		terraform apply -auto-approve --var-file=./environment/variables.tfvars -target=module.experiment.aws_acm_certificate.cert; \
		terraform apply -auto-approve --var-file=./environment/variables.tfvars; \
    fi


	STATUS="CONFIGURED_INFRA" node ./updateStatus.js

# Description: Deploys client from template
# EXPERIMENT_REF -> experiment ref for experiment. e.g 1
# DOMAIN -> experiment domain. e.g ideacamels.com
configure-client:
	STATUS="CONFIGURING_CLIENT" node ./updateStatus.js

	cd ./experiments/${EXPERIMENT_REF}/client; \
	npm install; \
	npm run test; \
	rm -rf ./build; \
	npm run build; \
	npm run export; \

	@if [ ${ENV}="prod" ]; then \
		cd ./experiments/${EXPERIMENT_REF}/client; \
		aws s3 sync ./out s3://${DOMAIN} --delete; \
	fi

	STATUS="CLIENT_CONFIGURED" node ./updateStatus.js

post-build:
	STATUS="COMPLETE" node ./updateStatus.js

# Description: Updates status to complete
# DOMAIN -> Domain name e.g ideacamels.com
# ENV -> Environment e.g prod
# EXPERIMENT_REF -> The experiment ref from the database e.g 1
# TEMPLATE_REF -> The template ref from the database e.g 1
# CALLER -> Unique ID for this task e.g hfdahaj44
test-experiment:
	# cd templates/1 && npm install

	AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} AWS_REGION=eu-west-1 AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} \
	EXPERIMENT_REF=1 TEMPLATE_REF=1 ENV="prod" DOMAIN="test.ideacamels.com" CALLER=test DESCRIPTION='test my idea' \
	CONTENT_KEY='test/1/contents/test.json' THEME_KEY='test/1/themes/test.json' SHOULD_LOG_STATUS_IN_DB=n \
	API_BASE_URL="https://v1xwkm07ta.execute-api.eu-west-1.amazonaws.com/prod" API_TOKEN="test" \
	bash ./entrypoint.sh

# Description: Completely removes experiments
clean-up-experiments:
	for experiment_ref in 1 57 71 72 ; do \
		EXPERIMENT_REF=$$experiment_ref ENV="prod" DOMAIN="test.ideacamels.com" AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} AWS_REGION=eu-west-1 CALLER=test-$$experiment_ref bash ./remove_experiment.sh ; \
	done