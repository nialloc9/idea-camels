terraform {
  backend "s3" {
  }
}

module "experiment" {
  source = "./modules/experiment"

  domain = var.domain
  fqdn   = var.fqdn
  certificate_arn = local.use_sub_domain ? data.aws_acm_certificate.ideacamels.arn : ""

  tags = {
    domain = var.domain
    experiment_ref = var.experiment_ref
  }
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.root.zone_id
  name    = var.domain
  type    = "NS"
  ttl     = 300
  records = module.experiment.name_servers
}