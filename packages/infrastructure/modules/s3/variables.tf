variable "name" {
  description = "Cluster name"
  type        = list(string)
  default = []
}

variable "policy" {
  description = "JSON policy from data source"
  type        = string
  default = []
}