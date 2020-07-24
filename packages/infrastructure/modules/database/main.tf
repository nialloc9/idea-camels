provider "aws" {
  region = var.region
  profile = var.profile
}

resource "aws_dynamodb_table" "idea_camels_coming_soon" {
  name           = var.db_table_name
  billing_mode   = "PAY_PER_REQUEST"
  read_capacity  = var.db_table_read_capacity
  write_capacity = var.db_table_write_capacity
  hash_key       = "email"

  attribute {
    name = "email"
    type = "S"
  }

  tags = {
    purpose        = "ideacamels"
  }
}