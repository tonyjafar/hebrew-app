#/bin/sh

ng build

mv favicon.ico dist/hebrew-app/browser/

cd aws-hebrew-infra/

cdk deploy AwsHebrewInfraStack

cd ..