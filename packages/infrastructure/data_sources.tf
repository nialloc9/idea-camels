data "aws_route53_zone" "main" {
  provider     = "aws.main"
  name         = var.domain
  private_zone = false
}