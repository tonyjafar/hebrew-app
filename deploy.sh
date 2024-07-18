#/bin/sh

ng build

cd aws-hebrew-infra/

cdk deploy AwsHebrewInfraStack

cd ..