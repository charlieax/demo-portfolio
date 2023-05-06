#!/bin/sh
export AWS_PROFILE=charlieaxtell

aws sts get-caller-identity &> /dev/null || aws sso login --profile $AWS_PROFILE
aws-export-credentials --credentials-file-profile $AWS_PROFILE