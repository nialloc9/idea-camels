terraform {
  backend "s3" {
  }
}

module "experiment" {
  source = "./modules/experiment"

  domain = var.domain
  fqdn   = var.fqdn

  tags = {
    domain = var.domain
    experiment_ref = var.experiment_ref
  }
}