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

variable "lambda_coming_soon_key" {
    type = "string"
    default = "comingSoon.js"
}

variable "coming_soon_function_name" {
  type = "string"
  default = "coming_soon"
}

variable "purpose" {
    type = "string"
    default = "ideacamels"
}

variable "coming_soon_lambda_iam_role" {
    type = "string"
    default = "coming_soon_lambda"
}

