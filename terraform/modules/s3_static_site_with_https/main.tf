
# Get an SSL cert, issue a CLI call to get the cert. RE-requests just return the ARN
data "external" "cert_request" {
    program = ["bash", "./req_cert.sh"]
    query = {
        site_name = "${var.site_name}"
    }
}

module "dns_domain" {
    source = "./dns_domain"
    domain_parts = "${split(".",var.site_name)}"
    parts_count = "${length(split(".",var.site_name))}"
}

# s3 Bucket with Website settings
resource "aws_s3_bucket" "site_bucket" {
    bucket = "${var.site_name}"
    acl = "public-read"

    website {
        index_document = "index.html"
        error_document = "error.html"
    }
}

# Route53 Domain Name
resource "aws_route53_zone" "site_zone" {
    name = "${module.dns_domain.root_dns}"
}
# resource "aws_route53_record" "site_ns" {
#     zone_id = "${aws_route53_zone.site_zone.zone_id}"
#     name = "${module.dns_domain.root_dns}"
#     type = "NS"
#     ttl = "30"
#     records = [
#         "${aws_route53_zone.site_zone.name_servers.0}",
#         "${aws_route53_zone.site_zone.name_servers.1}",
#         "${aws_route53_zone.site_zone.name_servers.2}",
#         "${aws_route53_zone.site_zone.name_servers.3}"
#     ]
# }

resource "aws_route53_record" "root_domain" {
  zone_id = "${aws_route53_zone.main.zone_id}"
  name = "${var.domain}"
  type = "A"

  alias {
    name = "${aws_cloudfront_distribution.cdn.domain_name}"
    zone_id = "${aws_cloudfront_distribution.cdn.hosted_zone_id}"
    evaluate_target_health = false
  }
}

# cloudfront distribution
resource "aws_cloudfront_distribution" "site_distribution" {
    origin {
        domain_name = "${aws_s3_bucket.site_bucket.bucket_domain_name}"
        origin_id = "${var.site_name}-origin"
    }

    enabled = true
    aliases = ["${var.site_name}"]
    price_class = "PriceClass_100"

    default_cache_behavior {
        allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
        cached_methods   = ["GET", "HEAD"]
        target_origin_id = "${var.site_name}-origin"

        forwarded_values {
            query_string = true
            cookies {
                forward = "all"
            }
        }
        viewer_protocol_policy = "https-only"
        min_ttl                = 0
        default_ttl            = 1000
        max_ttl                = 86400
    }
    restrictions {
        geo_restriction {
            restriction_type = "none"
        }
    }
    viewer_certificate {
        acm_certificate_arn = "arn:aws:acm:us-east-1:115830081349:certificate/7db266fa-33a9-4b26-a582-7c390ed6a83d"
        ssl_support_method  = "sni-only"
        minimum_protocol_version = "TLSv1.1_2016" # set manually since TF default isnt correct
    }
}