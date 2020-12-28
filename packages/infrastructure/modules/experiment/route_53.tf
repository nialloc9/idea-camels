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

resource "aws_route53_record" "cert_validation" {
  provider = "aws.cloudfront"
  count = length(aws_acm_certificate.cert.domain_validation_options)

  zone_id = data.aws_route53_zone.main.zone_id
  name    = element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_name, count.index)
  type    = element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_type, count.index)
  records = [element(aws_acm_certificate.cert.domain_validation_options.*.resource_record_value, count.index)]
  ttl     = 60

  depends_on = [ aws_acm_certificate.cert ]
}