module "mwaa" {
  source      = "./modules/managed_airflow"
  environment = var.environment
}