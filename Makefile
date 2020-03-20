deploy_site_to_s3:
	aws s3 sync ./dist s3://ideacamels.com --delete

deploy_lamdas_to_s3:
	aws s3 sync ./lamdas/dist s3://ideacamels-coming-soon-lambda --delete

invalidate_site_cache:
	aws cloudfront create-invalidation --distribution-id ${SITE_DISTRIBUTION_ID} --paths '/*'

deploy_site_infra:
	cd terraform/s3 && terraform apply && cd ../../

deploy_lamdas_infra:
	cd terraform/lamdas && terraform apply && cd ../../

compress_lamdas:
	zip ./lamdas/dist/comingSoon.zip ./lamdas/comingSoon.js
