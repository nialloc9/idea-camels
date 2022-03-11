locals {
  support_email = "support@ideacamels.com"

  dns_records = [
    {
      name  = "_amazonses.${var.domain}"
      ttl   = 600
      type  = "TXT"
      value = aws_ses_domain_identity.idea_camels_domain_identity.verification_token
    },
    {
      name  = "_amazonses.ideacamels.com."
      ttl   = 300
      type  = "TXT"
      value = "yPHTB1NffNZ9mM2RiGeG59YNJtJu2y9KYhPQVBZLlVo="
    },
    {
      name  = "ideacamels.com."
      ttl   = 300
      type  = "MX"
      value = "10 inbound-smtp.eu-west-1.amazonaws.com."
    },
    {
      name  = "autodiscover.ideacamels.com."
      ttl   = 300
      type  = "CNAME"
      value = "autodiscover.mail.eu-west-1.awsapps.com."
    },
    {
      name  = "lqturewhohc5cgudo7yio62hns5nafrr._domainkey.ideacamels.com."
      ttl   = 300
      type  = "CNAME"
      value = "lqturewhohc5cgudo7yio62hns5nafrr.dkim.amazonses.com."
    },
    {
      name  = "a7jrz3mqepuill5kkixogh4j2wzdwu5c._domainkey.ideacamels.com."
      ttl   = 300
      type  = "CNAME"
      value = "a7jrz3mqepuill5kkixogh4j2wzdwu5c.dkim.amazonses.com."
    },
    {
      name  = "ga224gzycbh3vxcjbddosl7c6wjkdrmu._domainkey.ideacamels.com."
      ttl   = 300
      type  = "CNAME"
      value = "ga224gzycbh3vxcjbddosl7c6wjkdrmu.dkim.amazonses.com."
    },
    {
      name  = "ideacamels.com."
      ttl   = 300
      type  = "TXT"
      value = "v=spf1 include:amazonses.com ~all"
    },
    {
      name  = "_dmarc.ideacamels.com."
      ttl   = 300
      type  = "TXT"
      value = "v=DMARC1;p=quarantine;pct=100;fo=1"
    }
  ]
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

# VERIFY DOMAIN FOR EMAILS AND CREATE EMAIL ACCOUNT
resource "aws_ses_domain_identity" "idea_camels_domain_identity" {
  domain = var.domain

  depends_on = [module.domain]
}

resource "aws_route53_record" "ideacamels_route53_additional_records" {
  count   = length(local.param_store)
  zone_id = module.domain.route53_zone_id
  name    = local.param_store[count.index].name
  type    = local.param_store[count.index].type
  ttl     = local.param_store[count.index].ttl
  records = [local.param_store[count.index].value]

  depends_on = [module.domain]
}

resource "aws_ses_email_identity" "support_email" {
  email = local.support_email

  depends_on = [aws_route53_record.ideacamels_route53_additional_records]
}