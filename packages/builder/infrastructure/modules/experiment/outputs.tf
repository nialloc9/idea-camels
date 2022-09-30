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
  value = var.certificate_arn != "" ? var.certificate_arn : aws_acm_certificate_validation.cert[0].certificate_arn
}

output "route53_zone_id" {
  value = aws_route53_zone.main.id
}

output "name_servers" {
  value = aws_route53_zone.main.name_servers
}