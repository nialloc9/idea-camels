resource "aws_ecr_repository" "builder" {
  name                 = "builder-${var.environment}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}