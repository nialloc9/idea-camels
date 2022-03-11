locals {
  support_email = "support@ideacamels.com"
}

terraform {
  backend "s3" {
  }
}

# AWS Region for S3 and other resources
provider "aws" {
  region  = var.region
  alias   = "main"
  profile = var.profile

  default_tags {
    tags = local.default_tags
  }
}

module "domain" {
  source = "../modules/experiment"

  create_cert_validations = var.create_cert_validations

  domain = var.domain
  fqdn   = var.fqdn
}

resource "aws_ses_domain_identity" "idea_camels_domain_identity" {
  domain = var.domain

  depends_on = [module.domain]
}

resource "aws_route53_record" "example_amazonses_verification_record" {
  zone_id = module.domain.route53_zone_id
  name    = "_amazonses.${var.domain}"
  type    = "TXT"
  ttl     = "600"
  records = [aws_ses_domain_identity.idea_camels_domain_identity.verification_token]

  depends_on = [module.domain]
}

resource "aws_ses_email_identity" "support_email" {
  email = local.support_email
}