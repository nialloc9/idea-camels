# S3
deploy_site_to_s3:
	aws s3 sync ./build s3://ideacamels.com --delete --profile=idea-camels
	
invalidate_cdn_cache:
	# To get distribution id check terraform state file
	aws cloudfront create-invalidation --distribution-id E3MMNEXFI9AND4 --paths '/*' --profile=idea-camels

deploy:
	make deploy_site_to_s3
	make invalidate_cdn_cache
	
install_aws_cli:
	apt-get install awscli -y 
	aws --version