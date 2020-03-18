provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_iam_role" "coming_soon_lambda" {
  name = "${var.coming_soon_lambda_iam_role}"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_lambda_function" "coming_soon_lambda" {
  s3_bucket         = "${var.lambda_coming_soon_bucket}"
  s3_key         = "${var.lambda_coming_soon_key}"
  function_name    = "${var.coming_soon_function_name}"
  role             = "${aws_iam_role.coming_soon_lambda.arn}"
  handler          = "index.handler"
  runtime          = "nodejs12.x"

  tags = {
    purpose        = "${var.purpose}"
  }
}