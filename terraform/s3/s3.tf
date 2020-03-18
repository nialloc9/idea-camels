provider "aws" {
  region = "${var.aws_region}"
}

resource "aws_s3_bucket" "ideacamels" {
  bucket = "${var.site_bucket}"
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

resource "aws_s3_bucket" "ideacamels-coming-soon-lambda" {
  bucket = "${var.lambda_coming_soon_bucket}"
  tags = {
    purpose        = "${var.purpose}"
  }
}

resource "null_resource" "remove_and_upload_to_s3" {
  provisioner "local-exec" {
    command = "aws s3 sync ../../dist s3://${var.site_bucket} --delete"
  }

  depends_on = [aws_s3_bucket.ideacamels.com]
}

resource "aws_s3_bucket_object" "object" {
  bucket = "ideacamels-coming-soon-lambda"
  key    = "comingSoon.js"
  source = "../../lamdas/dist/comingSoon.zip"

  etag = "${filemd5("../../lamdas/dist/comingSoon.zip")}"

  depends_on = [aws_s3_bucket.ideacamels-coming-soon-lambda]
}