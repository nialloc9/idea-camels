module "builder_security_group" {
  source = "./modules/security_group"
  name="builder"
  environment = var.environment
  vpc_id = aws_vpc.ideacamels_main.id
  tags = var.tags
}