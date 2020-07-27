# Idea Camels Frontend

$ SITE_BUCKET_NAME=ideacamels.com AWS_PROFILE=idea-camels make deploy_site_to_s3

## Bugs

Some images missing part of route after build. To fix go to dist folder and rename to correct path.

For example:

/static/whiteLogo.8080d4ca.png

Need to add static and also the name was incorrect so needed to be changed.