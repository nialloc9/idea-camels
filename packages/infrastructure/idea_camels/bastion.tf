variable "enable_bastion" {
  default = true
}

# resource "tls_private_key" "ideacamels" {
#   algorithm = "RSA"
#   rsa_bits  = 4096
# }

# resource "aws_key_pair" "generated_key" {
#   key_name   = "ideacamels_${var.environment}_bastion"
#   public_key = tls_private_key.ideacamels.public_key_openssh

#   provisioner "local-exec" { # Create a "myKey.pem" to your computer!!
#     command = "echo '${tls_private_key.ideacamels.private_key_pem}' > ./ideacamels_${var.environment}_bastion.pem"
#   }
# }

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-xenial-16.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_instance" "bastion" {
  count                  = var.enable_bastion ? 1 : 0
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  key_name               = "ideacamels_prod_bastion.pem"
  vpc_security_group_ids = [module.bastion_security_group.id]
  subnet_id              = aws_subnet.ideacamels_main_public.id
}

output "bastion_ip" {
  value = var.enable_bastion ? aws_instance.bastion[0].public_ip : null
}

output "pem_path" {
  value = "./ideacamels_${var.environment}_bastion.pem"
}