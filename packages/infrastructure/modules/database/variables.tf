variable profile {
    type = string
    default = "idea-camels"
    description = "AWS profile in credentials to use"
}

variable region {
    type = string
    default = "eu-west-1"
}

variable db_table_name {
    type = string
    default = "coming_soon"
}

variable db_table_read_capacity {
    type = number
    default = 20
}

variable db_table_write_capacity {
    type = number
    default = 20
}