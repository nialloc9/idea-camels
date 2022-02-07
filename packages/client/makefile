S3_BUCKET_NAME:=ideacamels.com
AWS_PROFILE?=idea-camels

invalidate_cdn_cache:
	for id in $(aws cloudfront list-distributions --query "DistributionList.Items[*].{id:Id,origin:Origins.Items[0].Id}[?origin=='${S3_BUCKET_NAME}'].id" --output text);do aws cloudfront create-invalidation --distribution-id $id --paths "/*";done;

deploy:
	aws s3 sync ./build s3://ideacamels.com --delete --profile=${AWS_PROFILE}
	invalidate_cdn_cache

deploy-via-cicd:
	aws s3 sync ./build s3://ideacamels.com --delete
	make invalidate_cdn_cache
	
install_aws_cli:
	apt-get install awscli -y 
	aws --version