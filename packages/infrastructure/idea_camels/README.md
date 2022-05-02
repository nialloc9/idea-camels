Uses https://github.com/riboseinc/terraform-aws-s3-cloudfront-website

Need to change named servers in registered domain to match new hosted zone

## Bugs

- API deployment not working and has to be manually triggered in the console
- Cors not working and has to be manually triggered in the console

PEM file created during deployment via cicd will be available for 5 days and then removed.

If getting internal server error message first go to api gateway log group to see why. If it is an auth issue go to api gateway and go to method (POST) and the 'Integration Request'. Click lambda function and reselect same lambda. Then click 'Use Lambda Proxy integration'. This will error but thats okay. Now it should have correct permissions for invoking the lambda. Then go to api gateway and click on method and hit 'Deploy API'. Wait a minute or 2 for it to deploy. Then call endpoint again.
