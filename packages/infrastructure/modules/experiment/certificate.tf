resource "aws_acm_certificate" "cert" {
  provider                  = "aws.cloudfront"
  count = var.certificate_arn != "" ? 1 : 0
  domain_name               = var.fqdn
  validation_method         = var.cert_validation_method
  subject_alternative_names = ["www.${var.fqdn}"]
  tags = var.tags
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = "aws.cloudfront"
  count = var.certificate_arn != "" ? 1 : 0
  certificate_arn         = aws_acm_certificate[0].cert.arn
  validation_record_fqdns = aws_route53_record.cert_validation.*.fqdn

  depends_on = [aws_acm_certificate.cert]
}