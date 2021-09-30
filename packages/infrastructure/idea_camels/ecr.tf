locals {
  ecr = {
    api_ecr_name = "api"
  }
}

module "builder_ecr" {
  source = "./modules/ecr"
  name = "builder"
  environment = var.environment
}

module "api_ecr" {
  source = "./modules/ecr"
  name = local.ecr.api_ecr_name
  environment = var.environment
}