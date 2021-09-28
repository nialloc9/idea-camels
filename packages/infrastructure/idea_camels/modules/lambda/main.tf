variable "environment" {}

variable "name" {}

variable "image_repository_url" {}

variable "timeout" {
    default = "60"
}

variable "memory" {
    default = 128
}

variable "env_variables" {
    default = []
}

variable "image_tag" {
    default = "latest"
}

output "iam_role_name" {
  value = aws_iam_role.lambda.name
}

output "invoke_arn" {
  value = aws_lambda_function.lambda.invoke_arn
}

output "name" {
  value= aws_lambda_function.lambda.function_name
}

resource "aws_lambda_function" "lambda" {
   function_name = "${var.environment}_${var.name}"

   
   image_uri = "${var.image_repository_url}:${var.image_tag}"

   package_type = "Image"

   role = aws_iam_role.lambda.arn
   
   memory_size = var.memory

   timeout = var.timeout
   
   dynamic "environment" {
    for_each = length(var.env_variables) > 0 ? [var.env_variables] : []
    content {
      variables = environment.value
    }
   }
}

resource "aws_iam_role" "lambda" {
   name = "${var.environment}_${var.name}"

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

resource "aws_iam_policy" "lambda" {
  name        = "${var.environment}_${var.name}"
  path        = "/"
  description = "IAM policy for logging from ${var.environment} ${var.name} lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = aws_iam_policy.lambda.arn
}