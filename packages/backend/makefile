compress_lambdas:
	zip ./lambdas/dist/comingSoon.zip ./lambdas/comingSoon.js

deploy_lambdas_to_s3:
	aws s3 sync ./lambdas/dist s3://ideacamels-coming-soon-lambda --delete
