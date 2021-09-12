resource "aws_ecs_cluster" "ideacamels" {
  name = "builder-${var.environment}"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

resource "aws_ecs_task_definition" "builder" {
  family = "builder"
  container_definitions = jsonencode([
    {
      name      = "builder-${var.environment}"
      image     = "builder-${var.environment}"
      cpu       = 10
      memory    = 512
      essential = true
      requires_compatibilities = "FARGATE"
    }
  ])
}

resource "aws_iam_role" "builder" {
  name = "builder-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = "ec2.amazonaws.com"
      },
    ]
  })
}

resource "aws_iam_role_policy" "builder" {
  name        = "builder-${var.environment}"
  role = aws_iam_role.builder.id

  # Terraform's "jsonencode" function converts a
  # Terraform expression result to valid JSON syntax.
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

resource "aws_ecs_service" "builder" {
  name            = "builder-${var.environment}"
  cluster         = aws_ecs_cluster.ideacamels.id
  task_definition = aws_ecs_task_definition.builder.arn
  iam_role        = aws_iam_role.builder.arn
  depends_on      = [aws_iam_role_policy.builder]
}