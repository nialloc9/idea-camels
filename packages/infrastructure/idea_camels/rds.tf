resource "aws_db_subnet_group" "ideacamels_main" {
  name       = "${var.environment}_ideacamels_db"
  subnet_ids = aws_subnet.idea_camels_main_public.*.id
}

resource "aws_db_instance" "ideacamels" {
  allocated_storage    = 10
  engine               = "mysql"
  engine_version       = "8.0"
  instance_class       = "db.t3.micro"
  name                 = "ideacamels"
  username             = "root"
  password             = "password"
  parameter_group_name = "default.mysql8.0"
  skip_final_snapshot  = true

  db_subnet_group_name   = aws_db_subnet_group.ideacamels_main.id
  vpc_security_group_ids = [module.db_security_group.id]

  depends_on = [aws_subnet.idea_camels_main_public, module.db_security_group.id, aws_db_subnet_group.ideacamels_main]
}