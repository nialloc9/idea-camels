data "aws_iam_policy_document" "theme_bucket_policy" {

  statement {
    sid = "AllowedIPReadAccess"

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "arn:aws:s3:::${var.environment}-themes/*",
    ]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket" "themes" {
  bucket = "${var.environment}-themes"
  acl    = "public-read"

  versioning {
    enabled = true
  }

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "POST", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = []
  }

  policy = data.aws_iam_policy_document.theme_bucket_policy.json
}