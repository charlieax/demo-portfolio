#!/bin/sh

# To start an AWS session, source this file using
# source ./scripts/aws-session.sh
# so that AWS_PROFILE will be injected into the current environment

export AWS_PROFILE=charlieaxtell
if [ ! -d ~/.aws ]; then
  mkdir ~/.aws
  cat > ~/.aws/config <<-CONFIG
		[profile $AWS_PROFILE]
		credential_process = aws-sso-credential-process --profile $AWS_PROFILE
		region = eu-west-2
		output = yaml
		sso_session = $AWS_PROFILE
		sso_start_url = https://metapraxis.awsapps.com/start
		sso_region = eu-west-2
		sso_account_id =
		sso_role_name =
CONFIG
  aws-configure-sso-profile --profile $AWS_PROFILE
fi
aws sts get-caller-identity &> /dev/null || aws sso login --profile $AWS_PROFILE
aws-export-credentials --credentials-file-profile $AWS_PROFILE