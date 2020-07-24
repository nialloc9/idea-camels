terraform {
  backend "s3" {
    bucket = "idea-camels-infrastructure-state"
    key    = "aws/main/terraform.tfstate"
    region = "eu-west-1"
    profile = "idea-camels"
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

module "main" {
  source = "github.com/riboseinc/terraform-aws-s3-cloudfront-website"

  fqdn = var.fqdn
  aliases = ["www.${var.fqdn}"]
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

resource "aws_acm_certificate" "cert" {
  provider          = "aws.cloudfront"
  domain_name       = var.fqdn
  validation_method = var.cert_validation_method
  subject_alternative_names = ["www.${var.fqdn}"]
}

resource "aws_route53_record" "cert_validation" {
  provider = "aws.cloudfront"
  count = length(aws_acm_certificate.cert.domain_validation_options)

  zone_id = data.aws_route53_zone.main.zone_id
  name    = element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_name, count.index)
  type    = element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_type, count.index)
  records = [element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_value, count.index)]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = "aws.cloudfront"
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = aws_route53_record.cert_validation.*.fqdn
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

resource "aws_route53_record" "www" {
  provider = "aws.main"
  zone_id = "${data.aws_route53_zone.main.zone_id}"
  name = "www.${var.fqdn}"
  type = "CNAME"
  records = ["${var.fqdn}"]
  ttl = var.www_record_ttl
}

module "database" {
  source = "./modules/database"
  
  providers = {
    "aws.main" = "aws.main"
  }
  
}

module "api" {
  source = "./modules/serverless_api"
  
  providers = {
    "aws.main" = "aws.main"
  }

  coming_soon_table_arn = module.database.coming_soon_table_arn
}