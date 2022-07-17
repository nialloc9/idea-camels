resource "aws_acm_certificate" "cert" {
  provider                  = "aws.cloudfront"
  count = var.certificate_arn == "" ? 1 : 0
  domain_name               = var.fqdn
  validation_method         = var.cert_validation_method
  subject_alternative_names = concat(["www.${var.fqdn}"], var.sub_domains)
  tags = var.tags
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = "aws.cloudfront"
  count = var.certificate_arn == "" ? 1 : 0
  certificate_arn         = aws_acm_certificate.cert[0].arn
  validation_record_fqdns = aws_route53_record.cert_validation.*.fqdn

  depends_on = [aws_acm_certificate.cert]
}