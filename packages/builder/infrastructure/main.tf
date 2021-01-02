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

# AWS Region for Cloudfront (ACM certs only supports us-east-1)
provider "aws" {
  region = var.cloudfront_region
  alias = "cloudfront"
  profile = var.profile
}

module "domain" {
  source = "git@github.com:nialloc9/idea-camels.git//packages/infrastructure/modules/experiment?ref=builder"
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