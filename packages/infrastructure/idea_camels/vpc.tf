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
  cidr_block = "10.0.0.0/17"
}

resource "aws_route_table" "ideacamels_main_public" {
  vpc_id = aws_vpc.ideacamels_main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ideacamels_main.id
  }
}

resource "aws_main_route_table_association" "ideacamels_main_public" {
  vpc_id         = aws_vpc.ideacamels_main.id
  route_table_id = aws_route_table.ideacamels_main_public.id
}


# private subnet
resource "aws_subnet" "ideacamels_main_private" {
  vpc_id     = aws_vpc.ideacamels_main.id
  cidr_block = "10.0.128.0/17"
}

resource "aws_route_table" "ideacamels_main_private" {
  vpc_id = aws_vpc.ideacamels_main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.ideacamels_main.id
  }
}

resource "aws_route_table_association" "ideacamels_main_private" {
  subnet_id      = aws_subnet.ideacamels_main_private.id
  route_table_id = aws_route_table.ideacamels_main_private.id
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
  subnet_id     = aws_subnet.ideacamels_main_private.id
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

resource "aws_iam_role_policy_attachment" "iam_role_policy_attachment_lambda_vpc_access_execution" {
  role       = module.lambda_api.iam_role_name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}