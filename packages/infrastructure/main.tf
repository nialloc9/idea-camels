terraform {
  backend "s3" {
    bucket = var.state_bucket_name
    key    = var.state_bucket_key
    region = var.region
  }
}

# AWS Region for S3 and other resources
provider "aws" {
  region = var.region
  alias = "main"
  profile = var.profile
}

# AWS Region for Cloudfront (ACM certs only supports us-east-1)
provider "aws" {
  region = var.cloudfront_region
  alias = "cloudfront"
  profile = var.profile
}

# Using this module
module "main" {
  source = "github.com/riboseinc/terraform-aws-s3-cloudfront-website"

  fqdn = var.fqdn
  ssl_certificate_arn = aws_acm_certificate_validation.cert.certificate_arn
  allowed_ips = var.allowed_ips

  index_document = var.static_website_index_document
  error_document = var.static_website_error_document

  refer_secret = "${base64sha512("REFER-SECRET-19265125-${var.fqdn}-52865926")}"

  force_destroy = var.force_destroy

  cloudfront_price_class = var.cdn_price_class

  providers = {
    aws.main = aws.main
    aws.cloudfront = aws.cloudfront
  }
}


# ACM Certificate generation

resource "aws_acm_certificate" "cert" {
  provider          = "aws.cloudfront"
  domain_name       = var.fqdn
  validation_method = var.cert_validation_method
}

resource "aws_route53_record" "cert_validation" {
  provider = "aws.cloudfront"
  name     = aws_acm_certificate.cert.domain_validation_options.0.resource_record_name
  type     = aws_acm_certificate.cert.domain_validation_options.0.resource_record_type
  zone_id  = data.aws_route53_zone.main.id
  records  = [aws_acm_certificate.cert.domain_validation_options.0.resource_record_value]
  ttl      = 60
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = "aws.cloudfront"
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}


# Route 53 record for the static site

data "aws_route53_zone" "main" {
  provider     = "aws.main"
  name         = var.domain
  private_zone = false
}

resource "aws_route53_record" "web" {
  provider = "aws.main"
  zone_id  = data.aws_route53_zone.main.zone_id
  name     = var.fqdn
  type     = "A"

  alias {
    name    = module.main.cf_domain_name
    zone_id = module.main.cf_hosted_zone_id
    evaluate_target_health = false
  }
}

# Outputs

output "s3_bucket_id" {
  value = module.main.s3_bucket_id
}

output "s3_bucket_arn" {
  value = module.main.s3_bucket_arn
}

output "s3_domain" {
  value = module.main.s3_website_endpoint
}

output "s3_hosted_zone_id" {
  value = module.main.s3_hosted_zone_id
}

output "cloudfront_domain" {
  value = module.main.cf_domain_name
}

output "cloudfront_hosted_zone_id" {
  value = module.main.cf_hosted_zone_id
}

output "cloudfront_distribution_id" {
  value = module.main.cf_distribution_id
}

output "route53_fqdn" {
  value = aws_route53_record.web.fqdn
}

output "acm_certificate_arn" {
  value = aws_acm_certificate_validation.cert.certificate_arn
}