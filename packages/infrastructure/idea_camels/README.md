Uses https://github.com/riboseinc/terraform-aws-s3-cloudfront-website

Need to change named servers in registered domain to match new hosted zone

## Bugs

- API deployment not working and has to be manually triggered in the console
- Cors not working and has to be manually triggered in the console

PEM file created during deployment via cicd will be available for 5 days and then removed.

If getting internal server error message go to api gateway and go to method (POST) and the 'Integration Request'. Click lambda function and reselect same lambda. Then click 'Use Lambda Proxy integration'. This will error but thats okay. Now it should have correct permissions for invoking the lambda. Then go to api gateway and hit 'Deploy API'
