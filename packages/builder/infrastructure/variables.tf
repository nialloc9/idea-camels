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
  type = string
}

variable "domain" {
  description = "The domain name."
  type = string
}