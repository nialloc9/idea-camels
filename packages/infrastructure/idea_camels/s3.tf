resource "aws_s3_bucket" "themes" {
  bucket = "${var.environment}-themes"
  acl    = "private"
}