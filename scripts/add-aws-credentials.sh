#!/bin/sh
export AWS_PROFILE=charlieaxtell

rm -rf ~/.aws
mkdir ~/.aws
touch ~/.aws/config

echo "[profile $AWS_PROFILE]" >> ~/.aws/config
echo "credential_process = aws-sso-credential-process --profile $AWS_PROFILE" >> ~/.aws/config
echo "region = eu-west-2" >> ~/.aws/config
echo "output = yaml" >> ~/.aws/config
echo "sso_session = $AWS_PROFILE" >> ~/.aws/config
echo "sso_start_url = https://charlieaxtell.awsapps.com/start" >> ~/.aws/config
echo "sso_region = eu-west-2" >> ~/.aws/config
echo "sso_account_id =" >> ~/.aws/config
echo "sso_role_name =" >> ~/.aws/config

aws-configure-sso-profile --profile $AWS_PROFILE
aws sts get-caller-identity &> /dev/null || aws sso login --profile $AWS_PROFILE
aws-export-credentials --credentials-file-profile $AWS_PROFILE