variable profile {
    type = string
    default = "idea-camels"
    description = "AWS profile in credentials to use"
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

variable "state_bucket_name" {
  description = "The name of the bucket to hold the terraform state"
  default     = "infrastructure-state"
  type = string
}

variable "state_bucket_key" {
  description = "The name of the bucket key for storing terraform state"
  default     = "aws/eu-west-1/idea-camels/terraform.tfstate"
  type = string
}