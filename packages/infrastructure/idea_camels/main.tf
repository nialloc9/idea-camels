terraform {
  backend "s3" {
  }
}

# AWS Region for S3 and other resources
provider "aws" {
  region = var.region
  alias = "main"
  profile = var.profile
}

module "domain" {
  source = "../modules/experiment"

  domain = var.domain
  fqdn = var.fqdn
}

module "database" {
  source = "../modules/database"
  
  providers = {
    "aws.main" = "aws.main"
  }
}

module "api" {
  source = "../modules/serverless_api"
  
  providers = {
    "aws.main" = "aws.main"
  }

  coming_soon_table_arn = module.database.coming_soon_table_arn
}