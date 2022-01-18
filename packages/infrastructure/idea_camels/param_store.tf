locals {
  param_store = [
    "/${var.environment}/api/jwt_secret",
    "/${var.environment}/api/password_secret",
    "/${var.environment}/database/password",
    "/${var.environment}/stripe/secret_key",
    "/${var.environment}/google/ads/client_id",
    "/${var.environment}/google/ads/client_secret",
    "/${var.environment}/google/ads/refresh_token",
    "/${var.environment}/google/ads/developer_token",
    "/${var.environment}/google/ads/customer_id"
  ]
}

// When updating value in console terraform needs to redeployed
resource "aws_ssm_parameter" "secret" {
  count       = length(local.param_store)
  name        = local.param_store[count.index]
  description = "Created by terraform in param_store.tf"
  type        = "SecureString"
  value       = "password"
  overwrite   = false
  lifecycle {
    ignore_changes = [value, ]
  }

  tags = var.tags
}

data "aws_ssm_parameter" "api_jwt_secret" {
  name = "/${var.environment}/api/jwt_secret"

  depends_on = [
    aws_ssm_parameter.secret
  ]
}

data "aws_ssm_parameter" "api_password_secret" {
  name = "/${var.environment}/api/password_secret"

  depends_on = [
    aws_ssm_parameter.secret
  ]
}

data "aws_ssm_parameter" "database_password" {
  name = "/${var.environment}/database/password"

  depends_on = [
    aws_ssm_parameter.secret
  ]
}

data "aws_ssm_parameter" "stripe_secret_key" {
  name = "/${var.environment}/stripe/secret_key"

  depends_on = [
    aws_ssm_parameter.secret
  ]
}

data "aws_ssm_parameter" "google_ads_client_id" {
  name = "/${var.environment}/google/ads/client_id"

  depends_on = [
    aws_ssm_parameter.secret
  ]
}

data "aws_ssm_parameter" "google_ads_client_secret" {
  name = "/${var.environment}/google/ads/client_secret"

  depends_on = [
    aws_ssm_parameter.secret
  ]
}

data "aws_ssm_parameter" "google_ads_refresh_token" {
  name = "/${var.environment}/google/ads/refresh_token"

  depends_on = [
    aws_ssm_parameter.secret
  ]
}

data "aws_ssm_parameter" "google_ads_developer_token" {
  name = "/${var.environment}/google/ads/developer_token"

  depends_on = [
    aws_ssm_parameter.secret
  ]
}

data "aws_ssm_parameter" "google_ads_customer_id" {
  name = "/${var.environment}/google/ads/customer_id"

  depends_on = [
    aws_ssm_parameter.secret
  ]
}