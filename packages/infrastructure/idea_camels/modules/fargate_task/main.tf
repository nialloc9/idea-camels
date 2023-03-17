variable "name" {
  description = "name of task"
}

variable "environment" {
  description = "name of environment"
}

variable "cluster_arn" {
  description = "arn of ecs cluster"
}

variable "ecr_repository_url" {
  description = "url of ecr_repository"
}

variable "region" {
  description = "region to deploy in"
  default = "eu-west-1"
}

variable "memory" {
  description = "Disk memory"
  default = 1024
}

variable "cpu" {
  description = "CPU memory"
  default = 512
}


variable "env_variables" {
  description = "env variables"
  type        = list(map(string))
  default = []
}

variable "schedule_expression" {
  description = "schedule to run on"
  default = "cron(0 10 ? * SUN *)"
}

variable "subnet_ids" {
  description = "subnet ids"
  default = []
}

variable "security_group_ids" {
  description = "security group ids"
  default = []
}

resource "aws_iam_role" "iam_role" {
  name = "${var.name}-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "events.amazonaws.com",
        }
      },
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

resource "aws_iam_role_policy" "iam_role_policy" {
  name = "${var.name}-${var.environment}"
  role = aws_iam_role.iam_role.id

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

resource "aws_ecs_task_definition" "ecs_task_definition" {
  family                   = "${var.name}-${var.environment}"
  execution_role_arn       = aws_iam_role.iam_role.arn
  task_role_arn            = aws_iam_role.iam_role.arn
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.cpu
  memory                   = var.memory
  network_mode             = "awsvpc"
  
  container_definitions = <<DEFINITION
[
  {
    "name": "keyword-optimiser-${var.environment}",
    "image": "${var.ecr_repository_url}",
    "requires_compatibilities": ["FARGATE"], 
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${var.environment}_${var.name}",
        "awslogs-region": "${var.region}",
        "awslogs-stream-prefix": "ecs"
      }
    },
    "environment": ${jsonencode(var.env_variables)},
    "entryPoint": [
      "/bin/bash",
      "-c"
    ],
    "command": ["bash ./entrypoint.sh"]
    }
]
DEFINITION
}


resource "aws_cloudwatch_log_group" "cloudwatch_log_group" {
  name = "${var.environment}_${var.name}"

  retention_in_days = 90
}

resource "aws_cloudwatch_event_rule" "event_rule" {
  name                = "${var.environment}_${var.name}"
  schedule_expression = var.schedule_expression
}

resource "aws_cloudwatch_event_target" "scheduled_task" {
  rule      = aws_cloudwatch_event_rule.event_rule.name
  target_id = "${var.environment}_${var.name}"
  arn       = var.cluster_arn
  role_arn  = aws_iam_role.iam_role.arn

  ecs_target {
    launch_type         = "FARGATE"
    platform_version    = "LATEST"
    task_count          = 1
    task_definition_arn =  aws_ecs_task_definition.ecs_task_definition.arn

    network_configuration {
      subnets = var.subnet_ids
      security_groups = var.security_group_ids
    }
  }
}