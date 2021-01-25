resource "aws_route53_zone" "main" {
  name = var.fqdn
}

resource "null_resource" "add_named_servers" {
  provisioner "local-exec" {
    command = "aws route53domains update-domain-nameservers --region us-east-1 --domain-name ${var.fqdn} --nameservers Name=${aws_route53_zone.main.name_servers.0} Name=${aws_route53_zone.main.name_servers.1} Name=${aws_route53_zone.main.name_servers.2} Name=${aws_route53_zone.main.name_servers.3}"
    environment = {
      AWS_PROFILE = "idea-camels"
    }    
  }
}

resource "aws_route53_record" "web" {
  provider = "aws.main"
  zone_id  = aws_route53_zone.main.zone_id
  name     = var.fqdn
  type     = "A"

  alias {
    name    = module.main.cf_domain_name
    zone_id = module.main.cf_hosted_zone_id
    evaluate_target_health = false
  }

  depends_on = [ aws_route53_zone.main ]
}

resource "aws_route53_record" "www" {
  provider = "aws.main"
  zone_id = aws_route53_zone.main.zone_id
  name = "www.${var.fqdn}"
  type = "CNAME"
  records = ["${var.fqdn}"]
  ttl = var.www_record_ttl
  depends_on = [ aws_route53_zone.main ]
}

resource "aws_route53_record" "cert_validation" {
  provider = "aws.cloudfront"

  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  zone_id = aws_route53_zone.main.zone_id
  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type
  ttl     = 60

  depends_on = [ aws_acm_certificate.cert, aws_route53_zone.main, null_resource.add_named_servers ]
}