# Network Setup: VPC, Subnet, IGW, Routes | network.tf
data "aws_availability_zones" "aws_az" {
  state = "available"
}
# create vpc
resource "aws_vpc" "ideacamels_main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
}
# create subnets
# resource "aws_subnet" "idea_camels_main_public" {
#   count                   = length(data.aws_availability_zones.aws_az.names)
#   vpc_id                  = aws_vpc.ideacamels_main.id
#   cidr_block              = cidrsubnet(aws_vpc.ideacamels_main.cidr_block, 8, count.index + 1)
#   availability_zone       = data.aws_availability_zones.aws_az.names[count.index]
#   map_public_ip_on_launch = true
# }

# public subnet
resource "aws_subnet" "ideacamels_main_public" {
  vpc_id     = aws_vpc.ideacamels_main.id
  cidr_block = "10.0.0.0/18"

  tags = merge(local.default_tags, { "subnet_type" = "public" })
}

resource "aws_route_table" "ideacamels_main_public" {
  vpc_id = aws_vpc.ideacamels_main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ideacamels_main.id
  }
  tags = merge(local.default_tags, { "subnet_type" = "public" })
}

resource "aws_main_route_table_association" "ideacamels_main_public" {
  vpc_id         = aws_vpc.ideacamels_main.id
  route_table_id = aws_route_table.ideacamels_main_public.id

  tags = merge(local.default_tags, { "subnet_type" = "public" })
}


# private subnet
resource "aws_subnet" "ideacamels_main_private" {
  vpc_id     = aws_vpc.ideacamels_main.id
  cidr_block = "10.0.64.0/18"

  tags = merge(local.default_tags, { "subnet_type" = "private" })
}

resource "aws_route_table" "ideacamels_main_private" {
  vpc_id = aws_vpc.ideacamels_main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.ideacamels_main.id
  }
  tags = merge(local.default_tags, { "subnet_type" = "private" })
}

resource "aws_route_table_association" "ideacamels_main_private" {
  subnet_id      = aws_subnet.ideacamels_main_private.id
  route_table_id = aws_route_table.ideacamels_main_private.id
  tags           = merge(local.default_tags, { "subnet_type" = "private" })
}

# private subnet 2 10.0.192.0/18 — is left spare and can be used for 4th subet if needed
resource "aws_subnet" "ideacamels_main_private_2" {
  vpc_id     = aws_vpc.ideacamels_main.id
  cidr_block = "10.0.128.0/18"
  tags       = merge(local.default_tags, { "subnet_type" = "private" })
}

resource "aws_route_table" "ideacamels_main_private_2" {
  vpc_id = aws_vpc.ideacamels_main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.ideacamels_main.id
  }
  tags = merge(local.default_tags, { "subnet_type" = "private" })
}

resource "aws_route_table_association" "ideacamels_main_private_2" {
  subnet_id      = aws_subnet.ideacamels_main_private_2.id
  route_table_id = aws_route_table.ideacamels_main_private_2.id
  tags           = merge(local.default_tags, { "subnet_type" = "private" })
}

# create internet gateway
resource "aws_internet_gateway" "ideacamels_main" {
  vpc_id = aws_vpc.ideacamels_main.id
}

# create nat gateway
resource "aws_eip" "ideacamels_main" {
  vpc        = true
  depends_on = [aws_internet_gateway.ideacamels_main]
}

resource "aws_nat_gateway" "ideacamels_main" {
  allocation_id = aws_eip.ideacamels_main.id
  subnet_id     = aws_subnet.ideacamels_main_public.id
}

resource "aws_default_network_acl" "default_network_acl" {
  default_network_acl_id = aws_vpc.ideacamels_main.default_network_acl_id
  subnet_ids             = [aws_subnet.ideacamels_main_public.id, aws_subnet.ideacamels_main_private.id]

  ingress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }

  egress {
    protocol   = -1
    rule_no    = 100
    action     = "allow"
    cidr_block = "0.0.0.0/0"
    from_port  = 0
    to_port    = 0
  }
}