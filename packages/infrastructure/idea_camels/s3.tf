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

  tags = var.tags
}