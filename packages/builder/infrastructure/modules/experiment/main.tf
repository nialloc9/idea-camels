module "main" {
  source = "github.com/riboseinc/terraform-aws-s3-cloudfront-website?ref=v2.0.0"

  fqdn                = var.fqdn
  aliases             = concat(["www.${var.fqdn}"], var.sub_domains)
  ssl_certificate_arn = var.certificate_arn != "" ? var.certificate_arn : aws_acm_certificate_validation.cert[0].certificate_arn
  allowed_ips         = var.allowed_ips

  index_document = var.static_website_index_document
  error_document = var.static_website_error_document

  refer_secret = "${base64sha512("REFER-SECRET-19265125-${var.fqdn}-52865926")}"

  force_destroy = var.force_destroy

  cloudfront_price_class = var.cdn_price_class

  single_page_application = var.single_page_application
  
  providers = {
    aws.main       = aws.main
    aws.cloudfront = aws.cloudfront
  }

  tags = var.tags
}

