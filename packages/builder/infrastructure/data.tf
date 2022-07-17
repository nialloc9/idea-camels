data "aws_acm_certificate" "ideacamels" {
  domain   = "ideacamels.com"
  statuses = ["ISSUED"]
}