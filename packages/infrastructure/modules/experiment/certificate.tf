resource "aws_acm_certificate" "cert" {
  provider          = "aws.cloudfront"
  domain_name       = var.fqdn
  validation_method = var.cert_validation_method
  subject_alternative_names = ["www.${var.fqdn}"]
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = "aws.cloudfront"
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = aws_route53_record.cert_validation.*.fqdn
}