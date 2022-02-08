locals {
  lambda_api = {
    env_variables = {
      ENV                        = "${var.environment}",
      DB_USER                    = "${aws_db_instance.ideacamels.username}",
      DB_PORT                    = "${aws_db_instance.ideacamels.port}",
      DB_NAME                    = "${aws_db_instance.ideacamels.name}",
      DB_HOST                    = "${aws_db_instance.ideacamels.address}",
      DB_PASSWORD                = "${data.aws_ssm_parameter.database_password.value}",
      GOOGLE_ADS_CUSTOMER_ID     = "${data.aws_ssm_parameter.google_ads_customer_id.value}",
      BUILDER_CLUSTER_NAME       = "ideacamels-${var.environment}",
      BUILDER_TASK_NAME          = "builder-${var.environment}",
      THEMES_BUCKET              = "${aws_s3_bucket.themes.id}",
      STRIPE_SECRET_KEY          = "${data.aws_ssm_parameter.stripe_secret_key.value}",
      JWT_SECRET                 = "${data.aws_ssm_parameter.api_jwt_secret.value}",
      PASSWORD_SECRET            = "${data.aws_ssm_parameter.api_password_secret.value}",
      GOOGLE_ADS_CLIENT_ID       = "${data.aws_ssm_parameter.google_ads_client_id.value}",
      GOOGLE_ADS_CLIENT_SECRET   = "${data.aws_ssm_parameter.google_ads_client_secret.value}",
      GOOGLE_ADS_REFRESH_TOKEN   = "${data.aws_ssm_parameter.google_ads_refresh_token.value}",
      GOOGLE_ADS_DEVELOPER_TOKEN = "${data.aws_ssm_parameter.google_ads_developer_token.value}"
    }
  }
}

output "base_url" {
  value = aws_api_gateway_deployment.apideploy.invoke_url
}

module "lambda_api" {
  source               = "./modules/lambda"
  name                 = "ideacamels_api"
  image_repository_url = module.api_ecr.repository_url
  environment          = var.environment
  env_variables        = local.lambda_api.env_variables
  timeout              = "600"
  security_group_ids   = [module.api_security_group.id]
  subnet_ids           = aws_subnet.idea_camels_main_public.*.id
  depends_on = [
    module.api_ecr,
    module.api_security_group.id,
    aws_subnet.idea_camels_main_public
  ]
}

# needs to be enabled at account level
resource "aws_api_gateway_account" "account" {
  cloudwatch_role_arn = aws_iam_role.api_gateway_account.arn

  depends_on = [aws_iam_role.api_gateway_account]
}

resource "aws_iam_role" "api_gateway_account" {
  name = "api_gateway_cloudwatch_global"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "apigateway.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "api_gateway_account" {
  name = "${var.environment}-api-gateway-logging"
  role = aws_iam_role.api_gateway_account.id

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:DescribeLogGroups",
                "logs:DescribeLogStreams",
                "logs:PutLogEvents",
                "logs:GetLogEvents",
                "logs:FilterLogEvents"
            ],
            "Resource": "*"
        }
    ]
}
EOF
}

resource "aws_api_gateway_rest_api" "lambda_api" {
  name = "${var.environment}_lambda_api"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.lambda_api.id
  parent_id   = aws_api_gateway_rest_api.lambda_api.root_resource_id
  path_part   = "{proxy+}"
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
    aws_api_gateway_integration.lambda_root
  ]

  rest_api_id = aws_api_gateway_rest_api.lambda_api.id
  stage_name  = var.environment

  # without this nothing will ever deploy as no changes have occured to aws_api_gateway_deployment module
  stage_description = "${md5(file("api.tf"))}"

}

resource "aws_api_gateway_method_settings" "lambda_api" {
  rest_api_id = aws_api_gateway_rest_api.lambda_api.id
  stage_name  = var.environment
  method_path = "*/*"
  settings {
    logging_level      = "INFO"
    data_trace_enabled = var.enable_api_gateway_logging
    metrics_enabled    = var.enable_api_gateway_logging
  }

  depends_on = [aws_api_gateway_account.account, aws_api_gateway_deployment.apideploy]
}

resource "aws_lambda_permission" "lambda_api" {
  statement_id  = "AllowExecutionFromApiGateway"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_api.name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.lambda_api.execution_arn}/*/*/*"
}

module "cors_lambda" {
  source  = "dod-iac/api-gateway-cors-lambda-proxy/aws"
  version = "1.0.0"

  api_id            = aws_api_gateway_rest_api.lambda_api.id
  api_resource_id   = aws_api_gateway_resource.proxy.id
  http_method       = "POST"
  invoke_arn        = module.lambda_api.invoke_arn
  invoke_policy_arn = module.lambda_api.iam_role_arn
  allow_methods = [
    "OPTIONS",
    "POST"
  ]
  allow_headers = [
    "Authorization",
    "Content-Type",
    "X-Amz-Date",
    "X-Amz-Security-Token",
    "X-Api-Key",
    "next-query",
  ]
}

