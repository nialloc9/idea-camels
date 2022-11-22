output "arn" {
  value = aws_mwaa_environment.main.arn
}

output "id" {
  value = aws_mwaa_environment.main.id
}

output "iam_role_arn" {
 value = aws_iam_role.mwaa.arn
}