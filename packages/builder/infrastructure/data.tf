provider "aws" {
  alias = "virginia"
  region = "us-east-1"
}

data "aws_acm_certificate" "ideacamels" {
  domain   = "ideacamels.com"
  statuses = ["ISSUED"]

  provider = aws.virginia
}

data "aws_route53_zone" "root" {
  name         = "ideacamels.com."
  private_zone = false
}