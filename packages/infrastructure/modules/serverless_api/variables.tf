variable profile {
  type        = string
  default     = "idea-camels"
  description = "AWS profile in credentials to use"
}

variable region {
  type    = string
  default = "eu-west-1"
}

variable "s3_bucket_api_lambda_source_code" {
  default = "idea-camels-lambda-source-code"
  type    = string
}

variable "coming_soon_function_name" {
  default = "coming_soon"
  type    = string
}

variable "s3_key_coming_soon_lambda" {
  default = "v1.0.0/comingSoon.zip"
  type    = string
}

variable "coming_soon_lambda_handler" {
  default = "comingSoon/index.handler"
  type    = string
}

variable "coming_soon_lambda_environment" {
  default = "nodejs10.x"
  type    = string
}

variable "idea_camels_api_gateway_name" {
  default = "idea_camels_api"
  type    = string
}

variable "idea_camels_api_gateway_description" {
  default = "Idea camels API gateway"
  type    = string
}

variable "coming_soon_table_arn" {
  type = string
}