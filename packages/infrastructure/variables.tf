variable profile {
    type = string
    default = "idea-camels"
    description = "AWS profile in credentials to use"
}

variable account_id {
    type = string
    default = "115830081349"
}

variable region {
    type = string
    default = "eu-west-1"
}

variable cloudfront_region {
    type = string
    default = "us-east-1"
    description = "AWS Region for Cloudfront (ACM certs only supports us-east-1)"
}

variable "fqdn" {
  description = "The fully-qualified domain name of the resulting S3 website."
  default     = "ideacamels.com"
  type = string
}

variable "domain" {
  description = "The domain name."
  default     = "ideacamels.com"
  type = string
}

variable "allowed_ips" {
  type = "list"
  description = "Allowed IPs that can directly access the S3 bucket"
  default = [
    "0.0.0.0/0"            # public access
    # "xxx.xxx.xxx.xxx/mm" # restricted
    # "999.999.999.999/32" # invalid IP, completely inaccessible
  ]
}

variable "static_website_index_document" {
  default     = "index.html"
  type = string
}

variable "static_website_error_document" {
  default     = "404.html"
  type = string
}

variable "force_destroy" {
  default     = true
  type = bool
}

variable "cdn_price_class" {
  description = "Optional override for PriceClass, defaults to PriceClass_100"
  default     = "PriceClass_200"
  type = string
}

variable "cert_validation_method" {
  description = "Validation method for cert. Default is to do with DNS records."
  default     = "DNS"
  type = string
}

variable "www_record_ttl" {
  description = "TTL of route53 record for www domain"
  default     = 300
  type = number
}

// API

variable "s3_bucket_api_lambda_source_code" {
  default     = "idea-camels-lambda-source-code"
  type = string
}

variable "coming_soon_function_name" {
  default     = "coming_soon"
  type = string
}

variable "s3_key_coming_soon_lambda" {
  default     = "v1.0.0/comingSoon.zip"
  type = string
}

variable "coming_soon_lambda_handler" {
  default     = "lambdas/comingSoon.handler"
  type = string
}

variable "coming_soon_lambda_environment" {
  default     = "nodejs10.x"
  type = string
}

// API GATEWAY
variable "idea_camels_api_gateway_name" {
  default     = "idea_camels_api"
  type = string
}

variable "idea_camels_api_gateway_description" {
  default     = "Idea camels API gateway"
  type = string
}

# variable "coming_soon_lambda_environment" {
#   default     = "nodejs10.x"
#   type = string
# }

# variable "coming_soon_lambda_environment" {
#   default     = "nodejs10.x"
#   type = string
# }

