module "builder_security_group" {
  source = "./modules/security_group"
  name="builder"
  environment = var.environment
  vpc_id = aws_vpc.ideacamels_main.id
  tags = var.tags
}

module "api_security_group" {
  source = "./modules/security_group"
  name="api"
  environment = var.environment
  vpc_id = aws_vpc.ideacamels_main.id
  tags = var.tags
}

module "db_security_group" {
  source = "./modules/security_group"
  name="db"
  environment = var.environment
  vpc_id = aws_vpc.ideacamels_main.id
  tags = var.tags

  ingress_cidr_block = null
  egress_cidr_block = null
  security_group_id = module.api_security_group.id
}