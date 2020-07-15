terraform {
  backend "s3" {
    bucket = "idea-camels-infrastructure-state"
    key    = "aws/main/terraform.tfstate"
    region = "eu-west-1"
    profile = "idea-camels"
  }
}

# AWS Region for S3 and other resources
provider "aws" {
  region = var.region
  alias = "main"
  profile = var.profile
}

# AWS Region for Cloudfront (ACM certs only supports us-east-1)
provider "aws" {
  region = var.cloudfront_region
  alias = "cloudfront"
  profile = var.profile
}

# Using this module
module "main" {
  source = "github.com/riboseinc/terraform-aws-s3-cloudfront-website"

  fqdn = var.fqdn
  aliases = ["www.${var.fqdn}"]
  ssl_certificate_arn = aws_acm_certificate_validation.cert.certificate_arn
  allowed_ips = var.allowed_ips

  index_document = var.static_website_index_document
  error_document = var.static_website_error_document

  refer_secret = "${base64sha512("REFER-SECRET-19265125-${var.fqdn}-52865926")}"

  force_destroy = var.force_destroy

  cloudfront_price_class = var.cdn_price_class

  providers = {
    aws.main = aws.main
    aws.cloudfront = aws.cloudfront
  }
}


# ACM Certificate generation

resource "aws_acm_certificate" "cert" {
  provider          = "aws.cloudfront"
  domain_name       = var.fqdn
  validation_method = var.cert_validation_method
  subject_alternative_names = ["www.${var.fqdn}"]
}

resource "aws_route53_record" "cert_validation" {
  provider = "aws.cloudfront"
  count = length(aws_acm_certificate.cert.domain_validation_options)

  zone_id = data.aws_route53_zone.main.zone_id
  name    = element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_name, count.index)
  type    = element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_type, count.index)
  records = [element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_value, count.index)]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = "aws.cloudfront"
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = aws_route53_record.cert_validation.*.fqdn
}


# Route 53 record for the static site

data "aws_route53_zone" "main" {
  provider     = "aws.main"
  name         = var.domain
  private_zone = false
}

resource "aws_route53_record" "web" {
  provider = "aws.main"
  zone_id  = data.aws_route53_zone.main.zone_id
  name     = var.fqdn
  type     = "A"

  alias {
    name    = module.main.cf_domain_name
    zone_id = module.main.cf_hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  provider = "aws.main"
  zone_id = "${data.aws_route53_zone.main.zone_id}"
  name = "www.${var.fqdn}"
  type = "CNAME"
  records = ["${var.fqdn}"]
  ttl = var.www_record_ttl
}

# Outputs

output "s3_bucket_id" {
  value = module.main.s3_bucket_id
}

output "s3_bucket_arn" {
  value = module.main.s3_bucket_arn
}

output "s3_domain" {
  value = module.main.s3_website_endpoint
}

output "s3_hosted_zone_id" {
  value = module.main.s3_hosted_zone_id
}

output "cloudfront_domain" {
  value = module.main.cf_domain_name
}

output "cloudfront_hosted_zone_id" {
  value = module.main.cf_hosted_zone_id
}

output "cloudfront_distribution_id" {
  value = module.main.cf_distribution_id
}

output "route53_fqdn" {
  value = aws_route53_record.web.fqdn
}

output "acm_certificate_arn" {
  value = aws_acm_certificate_validation.cert.certificate_arn
}


# API

resource "aws_lambda_function" "coming_soon" {
  provider = "aws.main"
  function_name = var.coming_soon_function_name

  s3_bucket = var.s3_bucket_api_lambda_source_code
  s3_key    = var.s3_key_coming_soon_lambda

  handler = var.coming_soon_lambda_handler
  runtime = var.coming_soon_lambda_environment

  role = aws_iam_role.api_lambda_role.arn
}

data "template_file" "api_lambda" {
  template = "${file("${path.module}/policies/api_lambda.json")}"
}

resource "aws_iam_role" "api_lambda_role" {
  provider = "aws.main"
  name = "${var.coming_soon_function_name}_lambda"
  assume_role_policy = data.template_file.api_lambda.rendered
}

resource "aws_api_gateway_rest_api" "idea_camels_api" {
  provider = "aws.main"
  name        = "idea_camels_api"
  description = "Idea Camels API"
}

 resource "aws_api_gateway_resource" "coming_soon" {
   provider = "aws.main"
   rest_api_id = aws_api_gateway_rest_api.idea_camels_api.id
   parent_id   = aws_api_gateway_rest_api.idea_camels_api.root_resource_id
   path_part   = "coming-soon"
}

resource "aws_api_gateway_method" "coming_soon" {
   provider = "aws.main"
   rest_api_id   = aws_api_gateway_rest_api.idea_camels_api.id
   resource_id   = aws_api_gateway_resource.coming_soon.id
   http_method   = "POST"
   authorization = "NONE"
 }

 resource "aws_api_gateway_integration" "coming_soon" {
   provider = "aws.main"
   rest_api_id = aws_api_gateway_rest_api.idea_camels_api.id
   resource_id = aws_api_gateway_method.coming_soon.resource_id
   http_method = aws_api_gateway_method.coming_soon.http_method

   integration_http_method = "POST"
   type                    = "AWS_PROXY"
   uri                     = aws_lambda_function.coming_soon.invoke_arn
 }

 resource "aws_api_gateway_deployment" "idea_camels_api" {
   provider = "aws.main"
   depends_on = [
     aws_api_gateway_integration.coming_soon
   ]

   rest_api_id = aws_api_gateway_rest_api.idea_camels_api.id
   stage_name  = "prod"
 }

 resource "aws_lambda_permission" "apigw" {
   provider = "aws.main"
   statement_id  = "AllowAPIGatewayInvoke"
   action        = "lambda:InvokeFunction"
   function_name = aws_lambda_function.coming_soon.function_name
   principal     = "apigateway.amazonaws.com"

   # The "/*/*" portion grants access from any method on any resource
   # within the API Gateway REST API.
   source_arn = "${aws_api_gateway_rest_api.idea_camels_api.execution_arn}/*/*"
 }

 output "base_url" {
  value = aws_api_gateway_deployment.idea_camels_api.invoke_url
}