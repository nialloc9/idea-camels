terraform {
  backend "s3" {
  }
}

module "experiment" {
  source = "./modules/experiment"

  domain = var.domain
  fqdn   = var.fqdn
  certificate_arn = locals.use_sub_domain ? data.aws_acm_certificate.ideacamels.arn : ""
  tags = {
    domain = var.domain
    experiment_ref = var.experiment_ref
  }
}
