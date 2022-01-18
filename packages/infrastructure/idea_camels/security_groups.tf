module "builder_security_group" {
  source      = "./modules/security_group"
  name        = "builder"
  environment = var.environment
  vpc_id      = aws_vpc.ideacamels_main.id
  tags        = var.tags
}

module "api_security_group" {
  source      = "./modules/security_group"
  name        = "api"
  environment = var.environment
  vpc_id      = aws_vpc.ideacamels_main.id
  tags        = var.tags
}

module "db_security_group" {
  source      = "./modules/security_group"
  name        = "db"
  environment = var.environment
  vpc_id      = aws_vpc.ideacamels_main.id
  tags        = var.tags

  rules = [
    {
      "name"              = "ingress",
      "type"              = "ingress",
      "from_port"         = 0,
      "to_port"           = 0,
      "protocol"          = "all",
      "cidr_blocks"       = null,
      "security_group_id" = module.api_security_group.id
    },
    {
      "name"              = "egress",
      "type"              = "egress",
      "from_port"         = 0,
      "to_port"           = 0,
      "protocol"          = "all",
      "cidr_blocks"       = null,
      "security_group_id" = module.api_security_group.id
    },
    {
      "name"              = "ingress",
      "type"              = "ingress",
      "from_port"         = 0,
      "to_port"           = 0,
      "protocol"          = "all",
      "cidr_blocks"       = null,
      "security_group_id" = module.bastion_security_group.id
    },
    {
      "name"              = "egress",
      "type"              = "egress",
      "from_port"         = 0,
      "to_port"           = 0,
      "protocol"          = "all",
      "cidr_blocks"       = null,
      "security_group_id" = module.bastion_security_group.id
    }
  ]
}

module "bastion_security_group" {
  source      = "./modules/security_group"
  name        = "bastion"
  environment = var.environment
  vpc_id      = aws_vpc.ideacamels_main.id
  tags        = var.tags

  rules = [
    {
      "name"              = "ingress",
      "type"              = "ingress",
      "from_port"         = 0,
      "to_port"           = 0,
      "protocol"          = "all",
      "cidr_blocks"       = ["0.0.0.0/0"],
      "security_group_id" = null
    },
    {
      "name"              = "egress",
      "type"              = "egress",
      "from_port"         = 0,
      "to_port"           = 0,
      "protocol"          = "all",
      "cidr_blocks"       = ["0.0.0.0/0"],
      "security_group_id" = null
    }
  ]
}