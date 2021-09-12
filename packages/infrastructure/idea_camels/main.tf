terraform {
  backend "s3" {
  }
}

# AWS Region for S3 and other resources
provider "aws" {
  region = var.region
  alias = "main"
  profile = var.profile

  default_tags {
   tags = var.tags
 }
}

module "domain" {
  source = "../modules/experiment"

  create_cert_validations = var.create_cert_validations

  domain = var.domain
  fqdn = var.fqdn
}

module "database" {
  source = "../modules/database"
  
  providers = {
    "aws.main" = "aws.main"
  }
}