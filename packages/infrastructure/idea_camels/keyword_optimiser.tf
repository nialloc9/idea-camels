resource "aws_iam_role" "keyword_optimiser" {
  name = "keyword-optimiser-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ecs-tasks.amazonaws.com",
        }
      },
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "logs.amazonaws.com",
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "keyword_optimiser" {
  name = "keyword-optimiser-${var.environment}"
  role = aws_iam_role.keyword_optimiser.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "*",
        ]
        Effect   = "Allow"
        Resource = "*"
      }
    ]
  })
}

resource "aws_ecs_task_definition" "keyword_optimiser" {
  family                   = "keyword-optimiser-${var.environment}"
  execution_role_arn       = aws_iam_role.keyword_optimiser.arn
  task_role_arn            = aws_iam_role.keyword_optimiser.arn
  requires_compatibilities = ["FARGATE"]
  cpu                      = 512
  memory                   = 1024
  network_mode             = "awsvpc"

  container_definitions = <<DEFINITION
[
  {
    "name": "keyword-optimiser-${var.environment}",
    "image": "${module.keyword_optimiser_ecr.repository_url}",
    "requires_compatibilities": ["FARGATE"], 
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${var.environment}_keyword_optimiser",
        "awslogs-region": "${var.region}",
        "awslogs-stream-prefix": "ecs"
      }
    },
    "environment": [
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
              "name": "JWT_SECRET",
              "value": "${data.aws_ssm_parameter.api_jwt_secret.value}"
            },
            {
              "name": "API_BASE_URL",
              "value": "${aws_api_gateway_deployment.apideploy.invoke_url}"
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
            }
    ],
    "entryPoint": [
      "/bin/bash",
      "-c"
    ],
    "command": ["bash ./entrypoint.sh"]
    }
]
DEFINITION
}

resource "aws_cloudwatch_log_group" "keyword_optimiser" {
  name = "${var.environment}_keyword_optimiser"

  retention_in_days = 90
}

module "keyword_optimiser_task" {
  source                                      = "cn-terraform/ecs-fargate-scheduled-task/aws"
  version = "1.0.22"
  name_prefix                                 = "ideacamels-keyword-optimiser_task-task"
  event_rule_name                             = "ideacamels-keyword-optimiser-task-rule"
  event_rule_schedule_expression              = "cron(10 0 1 * *)"
  ecs_cluster_arn                             = module.ideacamels.aws_ecs_cluster_cluster_arn
  event_target_ecs_target_subnets             = [aws_subnet.ideacamels_main_private, module.db_security_group.id, aws_db_subnet_group.ideacamels_main]
  event_target_ecs_target_task_definition_arn = aws_ecs_task_definition.keyword_optimiser.arn
  ecs_execution_task_role_arn                 = aws_iam_role.keyword_optimiser.arn
}