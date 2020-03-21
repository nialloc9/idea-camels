provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_api_gateway_rest_api" "ideacamels" {
  name = "ideacamels gateway"
  description = "Rest API for idea camels"

  tags = {
    purpose        = "${var.purpose}"
  }
}

resource "aws_api_gateway_resource" "ideacamels_resource" {
  rest_api_id = "${aws_api_gateway_rest_api.ideacamels.id}"
  parent_id = "${aws_api_gateway_rest_api.ideacamels.root_resource_id}"
  path_part = "messages"
}

resource "aws_api_gateway_method" "ideacamels_method" {
  rest_api_id = "${aws_api_gateway_rest_api.ideacamels.id}"
  resource_id = "${aws_api_gateway_resource.ideacamels_resource.id}"
  http_method = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "ideacamels_method-integration" {
  rest_api_id = "${aws_api_gateway_rest_api.ideacamels.id}"
  resource_id = "${aws_api_gateway_resource.ideacamels_resource.id}"
  http_method = "${aws_api_gateway_method.ideacamels_method.http_method}"
  type = "AWS_PROXY"
  uri = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/arn:aws:lambda:${var.aws_region}:${var.account_id}:function:${var.coming_soon_name}/invocations"
  integration_http_method = "POST"
}

resource "aws_api_gateway_deployment" "ideacamels_deployment" {
  depends_on = [
    "aws_api_gateway_method.ideacamels_method",
    "aws_api_gateway_integration.ideacamels_method-integration"
  ]
  rest_api_id = "${aws_api_gateway_rest_api.ideacamels.id}"
  stage_name = "api"
}

output "prod_url" {
  value = "https://${aws_api_gateway_deployment.ideacamels_deployment.rest_api_id}.execute-api.${var.aws_region}.amazonaws.com/${aws_api_gateway_deployment.ideacamels_deployment.stage_name}"
}