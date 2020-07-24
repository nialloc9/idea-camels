output "base_url" {
  value = aws_api_gateway_deployment.idea_camels_api.invoke_url
}

output "coming_soon_base_url" {
  value = "${aws_api_gateway_deployment.idea_camels_api.invoke_url}/coming-soon"
}