variable "aws_region" {
  default	= "eu-west-1"
}
variable "site_name" {
  description = "The full DNS domain for the site."
}

provider "aws" {
  region     = "${var.aws_region}"
}