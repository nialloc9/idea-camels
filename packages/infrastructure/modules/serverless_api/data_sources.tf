data "template_file" "api_lambda" {
  template = "${file("${path.module}/policies/api_lambda.json")}"
}

data "template_file" "lambda_role_policy" {
  template = "${file("${path.module}/policies/write_to_coming_soon_dynamo_table.json")}"
  vars = {
    coming_soon_table_arn = var.coming_soon_table_arn
  }
}