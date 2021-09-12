module "main" {
  source = "github.com/riboseinc/terraform-aws-s3-cloudfront-website?ref=v2.0.0"

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

  tags = var.tags
}

