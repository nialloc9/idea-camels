locals {
  lambda_api = {
     env_variables = [
        { "name": "SERVER_PORT", "value": "80" },
        { "name": "ENV", "value": var.environment },
        { "name": "AWS_REGION", "value": var.region },
        { "name": "AWS_ACCESS_KEY", "value": "test" },
        { "name": "AWS_SECRET_KEY", "value": "test" },
        { "name": "STRIPE_SECRET_KEY", "value": "test" },
        { "name": "DB_USER", "value": "${aws_db_instance.ideacamels.username}" },
        { "name": "DB_PORT", "value": "${aws_db_instance.ideacamels.port}" },
        { "name": "DB_NAME", "value": "${aws_db_instance.ideacamels.name}" },
        { "name": "DB_HOST", "value": "${aws_db_instance.ideacamels.address}" },
        { "name": "JSWT_SECRET", "value": "test" },
        { "name": "PASSWORD_SECRET", "value": "test" },
        { "name": "GOOGLE_ADS_CLIENT_ID", "value": "test" },
        { "name": "GOOGLE_ADS_CLIENT_SECRET", "value": "test" },
        { "name": "GOOGLE_ADS_REFRESH_TOKEN", "value": "test" },
        { "name": "GOOGLE_ADS_DEVELOPER_TOKEN", "value": "test" },
        { "name": "GOOGLE_ADS_CUSTOMER_ID", "value": "test" },
        { "name": "BUILDER_CLUSTER_NAME", "value": "test" },
        { "name": "BUILDER_TASK_NAME", "value": "test" },
        { "name": "USER_IMAGE_BUCKET", "value": "test" },
     ]
  }
}

module "lambda_api" {
  source = "./modules/lambda"
  name = "ideacamels_api"
  image_repository_url = module.api_ecr.repository_url
  environment = var.environment
  env_variables = locals.lambda_api.env_variables
  timeout = "600"
  depends_on = [
    module.api_ecr
  ]
}

resource "aws_api_gateway_rest_api" "lambda_api" {
  name = "${var.environment}_lambda_api"
}

resource "aws_api_gateway_resource" "proxy" {
   rest_api_id = aws_api_gateway_rest_api.lambda_api.id
   parent_id   = aws_api_gateway_rest_api.lambda_api.root_resource_id
   path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy_method" {
   rest_api_id   = aws_api_gateway_rest_api.lambda_api.id
   resource_id   = aws_api_gateway_resource.proxy.id
   http_method   = "POST"
   authorization = "NONE"
}
resource "aws_api_gateway_integration" "lambda_api" {
   rest_api_id = aws_api_gateway_rest_api.lambda_api.id
   resource_id = aws_api_gateway_method.proxy_method.resource_id
   http_method = aws_api_gateway_method.proxy_method.http_method

   integration_http_method = "POST"
   type                    = "AWS_PROXY"
   uri                     = module.lambda_api.invoke_arn
}

resource "aws_api_gateway_method" "proxy_root" {
   rest_api_id   = aws_api_gateway_rest_api.lambda_api.id
   resource_id   = aws_api_gateway_rest_api.lambda_api.root_resource_id
   http_method   = "POST"
   authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
   rest_api_id = aws_api_gateway_rest_api.lambda_api.id
   resource_id = aws_api_gateway_method.proxy_root.resource_id
   http_method = aws_api_gateway_method.proxy_root.http_method

   integration_http_method = "POST"
   type                    = "AWS_PROXY"
   uri                     = module.lambda_api.invoke_arn
}


resource "aws_api_gateway_deployment" "apideploy" {
   depends_on = [
     aws_api_gateway_integration.lambda_api,
     aws_api_gateway_integration.lambda_root
   ]

   rest_api_id = aws_api_gateway_rest_api.lambda_api.id
   stage_name  = "prod"
}


resource "aws_lambda_permission" "lambda_api" {
   statement_id  = "AllowAPIGatewayInvoke"
   action        = "lambda:InvokeFunction"
   function_name = module.lambda_api.name
   principal     = "apigateway.amazonaws.com"

   # The "/*/*" portion grants access from any method on any resource
   # within the API Gateway REST API.
   source_arn = "${aws_api_gateway_rest_api.lambda_api.execution_arn}/*/*"
}


output "base_url" {
  value = aws_api_gateway_deployment.apideploy.invoke_url
}
