resource "aws_security_group" "security_group" {
  name = "${var.environment}_${var.name}"
  description = "${var.environment} ${var.name}"
  vpc_id = var.vpc_id
  tags = var.tags
}

resource "aws_security_group_rule" "builder-ingress" {
  security_group_id = aws_security_group.security_group.id
  description = "${var.environment} ${var.name} ingress"
  type = "ingress"
  from_port = 0
  to_port = 0
  protocol = var.ingress_protocol
  cidr_blocks = var.ingress_cidr_block

  source_security_group_id = var.security_group_id
}

resource "aws_security_group_rule" "builder-egress" {
  security_group_id = aws_security_group.security_group.id
  description = "${var.environment} ${var.name} egress"
  type = "egress"
  from_port = 0
  to_port = 0
  protocol = var.egress_protocol
  cidr_blocks = var.egress_cidr_block

  source_security_group_id = var.security_group_id
}

variable "name" {}
variable "tags" {}

variable "vpc_id" {}
variable "environment" {}

variable "ingress_protocol" {
  default = 0
}

variable "egress_protocol" {
  default = 0
}

variable "ingress_cidr_block" {
    default = ["0.0.0.0/0"]
}

variable "egress_cidr_block" {
    default = ["0.0.0.0/0"]
}

variable security_group_id {
  default = null
}

output "id" {
    value = aws_security_group.security_group.id
}

output "name" {
  value = "${var.environment}_${var.name}"
}