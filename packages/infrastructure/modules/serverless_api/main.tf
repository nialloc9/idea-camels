provider "aws" {
  region  = var.region
  profile = var.profile
}

resource "aws_iam_role" "api_lambda_role" {
  name               = "${var.coming_soon_function_name}_lambda"
  assume_role_policy = data.template_file.api_lambda.rendered
}

resource "aws_iam_role_policy" "coming_soon_lambda_role_policy" {
  name   = "coming_soon_lambda_role_policy"
  role   = aws_iam_role.api_lambda_role.id
  policy = data.template_file.lambda_role_policy.rendered
}

resource "aws_lambda_function" "coming_soon" {
  function_name = var.coming_soon_function_name

  s3_bucket = var.s3_bucket_api_lambda_source_code
  s3_key    = var.s3_key_coming_soon_lambda

  handler = var.coming_soon_lambda_handler
  runtime = var.coming_soon_lambda_environment

  role = aws_iam_role.api_lambda_role.arn

  depends_on = [aws_iam_role_policy.coming_soon_lambda_role_policy]
}

resource "aws_api_gateway_rest_api" "idea_camels_api" {
  name        = "idea_camels_api"
  description = "Idea Camels API"
}

resource "aws_api_gateway_resource" "coming_soon" {
  rest_api_id = aws_api_gateway_rest_api.idea_camels_api.id
  parent_id   = aws_api_gateway_rest_api.idea_camels_api.root_resource_id
  path_part   = "coming-soon"
}

resource "aws_api_gateway_method" "coming_soon" {
  rest_api_id   = aws_api_gateway_rest_api.idea_camels_api.id
  resource_id   = aws_api_gateway_resource.coming_soon.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "coming_soon" {
  rest_api_id = aws_api_gateway_rest_api.idea_camels_api.id
  resource_id = aws_api_gateway_method.coming_soon.resource_id
  http_method = aws_api_gateway_method.coming_soon.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.coming_soon.invoke_arn
}

resource "aws_api_gateway_deployment" "idea_camels_api" {
  depends_on = [
    aws_api_gateway_integration.coming_soon
  ]

  rest_api_id = aws_api_gateway_rest_api.idea_camels_api.id
  stage_name  = "prod"
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.coming_soon.function_name
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.idea_camels_api.execution_arn}/*/*"
}


resource "aws_api_gateway_integration_response" "method_response_post_200" {
  depends_on  = ["aws_api_gateway_method.coming_soon"]
  rest_api_id = "${aws_api_gateway_rest_api.idea_camels_api.id}"
  resource_id = "${aws_api_gateway_resource.coming_soon.id}"
  http_method = "${aws_api_gateway_method.coming_soon.http_method}"
  status_code = "200"
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'",
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS,GET,PUT,PATCH,DELETE'",
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}

resource "aws_api_gateway_method_response" "method_response_post_200" {
  depends_on  = ["aws_api_gateway_method.coming_soon"]
  rest_api_id = "${aws_api_gateway_rest_api.idea_camels_api.id}"
  resource_id = "${aws_api_gateway_resource.coming_soon.id}"
  http_method = "${aws_api_gateway_method.coming_soon.http_method}"
  status_code = "200"

  # response_models = {
  #   "application/json" = "Empty"
  # }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true,
    "method.response.header.Access-Control-Allow-Methods" = true,
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}