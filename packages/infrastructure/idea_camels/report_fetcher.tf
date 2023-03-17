locals {
  report_fetcher = {
    env_variables = [
            {
                "name": "ENV",
                "value": "${var.environment}"
            },
            {
                "name": "DB_USER",
                "value": "${aws_db_instance.ideacamels.username}"
            },
            {
                "name": "DB_PORT",
                "value": "${aws_db_instance.ideacamels.port}"
            },
            {
                "name": "DB_NAME",
                "value": "${aws_db_instance.ideacamels.name}"
            },
            {
                "name": "DB_HOST",
                "value": "${aws_db_instance.ideacamels.address}"
            },
            {
              "name": "DB_PASSWORD",
              "value": "${data.aws_ssm_parameter.database_password.value}"
            },
            {
              "name": "GOOGLE_ADS_CUSTOMER_ID",
              "value": "${data.aws_ssm_parameter.google_ads_customer_id.value}"
            },
            {
              "name": "GOOGLE_ADS_CLIENT_ID",
              "value": "${data.aws_ssm_parameter.google_ads_client_id.value}"
            },
            {
              "name": "GOOGLE_ADS_CLIENT_SECRET",
              "value": "${data.aws_ssm_parameter.google_ads_client_secret.value}"
            },
            {
              "name": "GOOGLE_ADS_DEVELOPER_TOKEN",
              "value": "${data.aws_ssm_parameter.google_ads_developer_token.value}"
            },
            {
              "name": "GOOGLE_ADS_REFRESH_TOKEN",
              "value": "${data.aws_ssm_parameter.google_ads_refresh_token.value}"
            },
            {
              "name": "SLACK_TOKEN",
              "value": "${data.aws_ssm_parameter.slack_token.value}"
            },
            {
              "name": "SLACK_ALERT_CHANNEL",
              "value": "report-fetcher-prod-alerts"
            }
    ]
  }
}

module "report_fetcher" {
  source               = "./modules/fargate_task"
  name                 = "report_fetcher"
  
  environment          = var.environment
  env_variables        = local.report_fetcher.env_variables
  region = var.region
  security_group_ids   = [module.report_fetcher_security_group.id]
  subnet_ids           = [aws_subnet.ideacamels_main_private.id]
  schedule_expression  = "cron(0 10 ? * SUN *)"
  ecr_repository_url   = module.report_fetcher_ecr.repository_url
  cluster_arn = aws_ecs_cluster.ideacamels.arn

  depends_on = [
    module.api_ecr,
    module.api_security_group.id,
    aws_subnet.ideacamels_main_public
  ]
}