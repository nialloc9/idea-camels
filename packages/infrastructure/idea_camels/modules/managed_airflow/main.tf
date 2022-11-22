module "s3" {
  source = "../../modules/s3"
  name = "airflow_dags"
}

resource "aws_mwaa_environment" "main" {
  dag_s3_path        = "dags/"
  execution_role_arn = var.iam_role_arn
  name               = "${var.environment}_${var.name}"

  network_configuration {
    security_group_ids = var.security_group_ids
    subnet_ids         = var.subnet_ids
  }

  source_bucket_arn = module.s3.arn

  tags = var.tags
}

resource "aws_iam_policy" "mwaa" {
  name        = "${var.environment}_mwaa"
  path        = "/"
  description = "IAM policy for logging from ${var.environment} mwaa"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "*
      ],
      "Resource": ${module.s3.arn}
    }
  ]
}
EOF
}

resource "aws_iam_role" "mwaa" {
  name = "${var.environment}_mwaa"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": ["mwaa.amazonaws.com"]
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "mwaa" {
  role       = aws_iam_role.mwaa.name
  policy_arn = aws_iam_policy.mwaa.arn
}