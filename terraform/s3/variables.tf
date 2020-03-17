variable "aws_region" {
  type = "string"
  default = "eu-west-1"
}

variable "site_bucket" {
    type = "string"
    default = "ideacamels.com"
}

variable "lambda_coming_soon_bucket" {
    type = "string"
    default = "ideacamels-coming-soon-lambda"
}

variable "purpose" {
    type = "string"
    default = "ideacamels"
}
