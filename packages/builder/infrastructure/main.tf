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
provider "cloudfront" {
  region = var.cloudfront_region
  alias = "cloudfront"
  profile = var.profile
}

module "experiment" {
  source = "./modules/experiment"

  domain=var.domain
  fqdn=var.fqdn
}