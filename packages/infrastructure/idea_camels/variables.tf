variable profile {
  type        = string
  default     = "idea-camels"
  description = "AWS profile in credentials to use"
}

variable account_id {
  type    = string
  default = "115830081349"
}
variable region {
  type    = string
  default = "eu-west-1"
}

variable environment {
  type    = string
  default = "prod"
}

variable cloudfront_region {
  type        = string
  default     = "us-east-1"
  description = "AWS Region for Cloudfront (ACM certs only supports us-east-1)"
}

variable "fqdn" {
  description = "The fully-qualified domain name of the resulting S3 website."
  default     = "ideacamels.com"
  type        = string
}

variable "domain" {
  description = "The domain name."
  default     = "ideacamels.com"
  type        = string
}

variable "allowed_ips" {
  type        = list(string)
  description = "Allowed IPs that can directly access the S3 bucket"
  default = [
    "0.0.0.0/0" # public access
    # "xxx.xxx.xxx.xxx/mm" # restricted
    # "999.999.999.999/32" # invalid IP, completely inaccessible
  ]
}

variable "static_website_index_document" {
  default = "index.html"
  type    = string
}

variable "static_website_error_document" {
  default = "404.html"
  type    = string
}

variable "force_destroy" {
  default = true
  type    = bool
}

variable "cdn_price_class" {
  description = "Optional override for PriceClass, defaults to PriceClass_100"
  default     = "PriceClass_200"
  type        = string
}

variable "cert_validation_method" {
  description = "Validation method for cert. Default is to do with DNS records."
  default     = "DNS"
  type        = string
}

variable "www_record_ttl" {
  description = "TTL of route53 record for www domain"
  default     = 300
  type        = number
}

variable "tags" {
  description = "tags to add to resources"
  default     = {}
  type        = map(string)
}

variable "create_cert_validations" {
  description = "Set to false when destroying"
  default     = true
}

variable "enable_api_gateway_logging" {
  default     = false
  description = "Enable api gateway logging"
}