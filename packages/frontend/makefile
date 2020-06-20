# S3
deploy_site_to_s3:
	aws s3 sync ./dist s3://${SITE_BUCKET_NAME} --delete --profile=${AWS_PROFILE}
	
invalidate_cdn_cache:
	aws cloudfront create-invalidation --distribution-id ${SITE_DISTRIBUTION_ID} --paths '/*' --profile=${AWS_PROFILE}

install_aws_cli:
	apt-get install awscli -y 
	aws --version