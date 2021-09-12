terraform {
  backend "s3" {
  }
}

module "experiment" {
  source = "./modules/experiment"

  domain = var.domain
  fqdn = var.fqdn
}