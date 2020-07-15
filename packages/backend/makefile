compress_lambdas:
	zip ./dist/lambdas/comingSoon.zip ./lambdas/comingSoon.js

deploy_lambdas_to_s3:
	aws --profile=idea-camels s3 sync ./dist/lambdas s3://idea-camels-lambda-source-code/v1.0.0 --delete
