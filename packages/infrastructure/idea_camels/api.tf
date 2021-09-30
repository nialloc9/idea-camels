locals {
  lambda_api = {
     env_variables = {
       ENV = "${var.environment}",
       DB_USER = "${aws_db_instance.ideacamels.username}",
       DB_PORT = "${aws_db_instance.ideacamels.port}",
       DB_NAME = "${aws_db_instance.ideacamels.name}",
       DB_HOST = "${aws_db_instance.ideacamels.address}",
       DB_PASSWORD = "${data.aws_ssm_parameter.database_password.value}",
       GOOGLE_ADS_CUSTOMER_ID = "${data.aws_ssm_parameter.google_ads_customer_id.value}",
       BUILDER_CLUSTER_NAME = "ideacamels-${var.environment}",
       BUILDER_TASK_NAME = "builder-${var.environment}",
       THEMES_BUCKET = "${aws_s3_bucket.themes.id}",
       STRIPE_SECRET_KEY = "${data.aws_ssm_parameter.stripe_secret_key.value}",
       JWT_SECRET = "${data.aws_ssm_parameter.api_jwt_secret.value}",
       PASSWORD_SECRET = "${data.aws_ssm_parameter.api_password_secret.value}",
       GOOGLE_ADS_CLIENT_ID = "${data.aws_ssm_parameter.google_ads_client_id.value}",
       GOOGLE_ADS_CLIENT_SECRET = "${data.aws_ssm_parameter.google_ads_client_secret.value}",
       GOOGLE_ADS_REFRESH_TOKEN = "${data.aws_ssm_parameter.google_ads_refresh_token.value}",
       GOOGLE_ADS_DEVELOPER_TOKEN = "${data.aws_ssm_parameter.google_ads_developer_token.value}"
     }
  }
}

module "lambda_api" {
  source = "./modules/lambda"
  name = "ideacamels_api"
  image_repository_url = module.api_ecr.repository_url
  environment = var.environment
  env_variables = local.lambda_api.env_variables
  timeout = "600"
  security_group_ids = [module.api_security_group.id]
  subnet_ids = aws_subnet.idea_camels_main_public.*.id
  depends_on = [
    module.api_ecr,
    module.api_security_group.id,
    aws_subnet.idea_camels_main_public
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
