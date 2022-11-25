from include.file import write_to_file
from include.config import config

experiment_ref = config["experiment"]["experiment_ref"]
domain = config["experiment"]["domain"]

def write_backend_vars():

    path = "./experiments/{}/infrastructure/environment/backend.tfvars".format(experiment_ref)

    file_content = """
        bucket         = 'idea-camels-infrastructure-state'
        key            = 'prod/{}/{}/terraform.tfstate'
        session_name   = 'terraform'
        region         = 'eu-west-1'
    """.format(domain, experiment_ref)

    write_to_file(path=path, str=file_content)

def write_tf_vars():
    path = "./experiments/{}/infrastructure/environment/variables.tfvars".format(experiment_ref)

    file_content = """
        fqdn='{}'
        domain='{}'
        experiment_ref='{}'
    """.format(domain, domain, experiment_ref)

    write_to_file(path=path, str=file_content)