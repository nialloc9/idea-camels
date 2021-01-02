rm -rf experiments/${EXPERIMENT_REF}/infrastructure 
mkdir -p experiments/${EXPERIMENT_REF}/infrastructure 
cd ./infrastructure 
cp -r ./ ../experiments/${EXPERIMENT_REF}/infrastructure 
cd ..

cd experiments/${EXPERIMENT_REF}/infrastructure 
ls
rm -rf .terraform 
terraform init -backend-config=environments/backend.tfvars 
&& terraform apply --var-file=environments/variables.tfvars