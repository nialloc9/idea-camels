
deploy:
	zip -vr ./dist/comingSoon.zip ./comingSoon -x "*.DS_Store"
	aws --profile=idea-camels s3 sync ./dist s3://idea-camels-lambda-source-code/v1.0.0 --delete
	aws --profile=idea-camels lambda update-function-code --function-name coming_soon --s3-bucket idea-camels-lambda-source-code --s3-key v1.0.0/comingSoon.zip