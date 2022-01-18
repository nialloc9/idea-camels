# Network Setup: VPC, Subnet, IGW, Routes | network.tf
data "aws_availability_zones" "aws_az" {
  state = "available"
}
# create vpc
resource "aws_vpc" "ideacamels_main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags                 = var.tags
}
# create subnets
resource "aws_subnet" "idea_camels_main_public" {
  count                   = length(data.aws_availability_zones.aws_az.names)
  vpc_id                  = aws_vpc.ideacamels_main.id
  cidr_block              = cidrsubnet(aws_vpc.ideacamels_main.cidr_block, 8, count.index + 1)
  availability_zone       = data.aws_availability_zones.aws_az.names[count.index]
  map_public_ip_on_launch = true
  tags                    = var.tags
}
# create internet gateway
resource "aws_internet_gateway" "ideacamels_main" {
  vpc_id = aws_vpc.ideacamels_main.id
  tags   = var.tags
}
# create routes
resource "aws_route_table" "ideacamels_main" {
  vpc_id = aws_vpc.ideacamels_main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ideacamels_main.id
  }
  tags = var.tags
}

resource "aws_main_route_table_association" "idea_camels_main" {
  vpc_id         = aws_vpc.ideacamels_main.id
  route_table_id = aws_route_table.ideacamels_main.id
}