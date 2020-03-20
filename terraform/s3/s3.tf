provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_s3_bucket" "ideacamels" {
  bucket = "${var.site_bucket}"
  force_destroy = true
  acl    = "public-read"
  policy = "${file("idea-camels-website-policy.json")}" 
  tags = {
    purpose        = "${var.purpose}"
  }
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket" "www-ideacamels" {
  bucket = "www.${var.site_bucket}"
  acl    = "public-read"
  policy = "${file("www-idea-camels-website-policy.json")}" 
  tags = {
    purpose        = "${var.purpose}"
  }
  website {
    redirect_all_requests_to = "https://${var.site_bucket}"
  }
}

resource "null_resource" "remove_and_upload_to_s3" {
  provisioner "local-exec" {
    command = "aws s3 sync ../../dist s3://${var.site_bucket} --delete"
  }

  depends_on = [aws_s3_bucket.ideacamels]
}

resource "aws_s3_bucket" "ideacamels-lambda" {
  bucket = "${var.lambda_bucket_name}"
  force_destroy = true
  tags = {
    purpose = "${var.purpose}"
  }
}

resource "null_resource" "remove_and_upload_lambda_to_s3" {
  provisioner "local-exec" {
    command = "aws s3 sync ../../lambdas/dist s3://${var.lambda_bucket_name} --delete"
  }

  depends_on = [aws_s3_bucket.ideacamels-lambda]
}