variable "environment" {
  description = "Environment name"
  type        = list(string)
  default = []
}

variable "tags" {
  description = "Tags to add to resources"
  type        = map(string)
  default = {}
}

variable "security_group_ids" {
  description = "Security groups to add to resources"
  type        = list(string)
  default = []
}

variable "subnet_ids" {
  description = "Subnets to add to resources"
  type        = list(string)
  default = []
}