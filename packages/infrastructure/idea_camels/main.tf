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

# Need to recreate to be fargate task
# module "api" {
#   source = "../modules/serverless_api"
  
#   providers = {
#     "aws.main" = "aws.main"
#   }

#   coming_soon_table_arn = module.database.coming_soon_table_arn
# }