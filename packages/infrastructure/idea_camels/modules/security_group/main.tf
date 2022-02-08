resource "aws_security_group" "security_group" {
  name        = "${var.environment}_${var.name}"
  description = "${var.environment} ${var.name}"
  vpc_id      = var.vpc_id
}
// If issue of rule does not exist appears. Comment out rules below. init. apply. uncomment. init, apply
resource "aws_security_group_rule" "builder-ingress" {
  count             = length(var.rules)
  security_group_id = aws_security_group.security_group.id
  description       = "${var.environment} ${var.name} ${var.rules[count.index].name} ${var.rules[count.index].type}"
  type              = var.rules[count.index].type
  from_port         = var.rules[count.index].from_port
  to_port           = var.rules[count.index].to_port
  protocol          = var.rules[count.index].protocol
  cidr_blocks       = var.rules[count.index].cidr_blocks

  source_security_group_id = var.rules[count.index].security_group_id
}

variable "name" {}
variable "tags" {}

variable "vpc_id" {}
variable "environment" {}

variable rules {
  default = [
    {
      "name"              = "default",
      "type"              = "ingress",
      "from_port"         = 0,
      "to_port"           = 0,
      "protocol"          = "all",
      "cidr_blocks"       = ["0.0.0.0/0"],
      "security_group_id" = null
    },
    {
      "name"              = "default",
      "type"              = "egress",
      "from_port"         = 0,
      "to_port"           = 0,
      "protocol"          = "all",
      "cidr_blocks"       = ["0.0.0.0/0"],
      "security_group_id" = null
    }
  ]
}

output "id" {
  value = aws_security_group.security_group.id
}

output "name" {
  value = "${var.environment}_${var.name}"
}