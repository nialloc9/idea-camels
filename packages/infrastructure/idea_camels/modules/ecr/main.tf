resource "aws_ecr_repository" "repo" {
  name                 = "${var.name}-${var.environment}"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "policy" {
  repository = aws_ecr_repository.repo.name
 
  policy = jsonencode({
   rules = [{
     rulePriority = 1
     description  = "keep last ${var.keep_for_this_many_days} images"
     action       = {
       type = "expire"
     }
     selection     = {
       tagStatus   = "any"
       countType   = "imageCountMoreThan"
       countNumber = var.keep_for_this_many_days
     }
   }]
  })
}

variable "name" {}
variable "environment" {}
variable "keep_for_this_many_days" {
    default = 10
}

output "repository_url" {
  value = aws_ecr_repository.repo.repository_url
}

output "id" {
  value = aws_ecr_repository.repo.id
}