import * as dotenv from 'dotenv';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_cloudfront as cf } from 'aws-cdk-lib';
import { aws_cloudfront_origins as origins } from 'aws-cdk-lib';
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_s3_deployment as depl } from 'aws-cdk-lib';
import { aws_certificatemanager as crt } from 'aws-cdk-lib';
import { aws_route53 as route } from "aws-cdk-lib";
import path = require('path');


export class AwsHebrewInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    dotenv.config();
    const certArn = process.env.CRT_ARN ? process.env.CRT_ARN : "";
    const bucketName = process.env.BUCKET_NAME;
    const domainName = process.env.Domain_NAME ? process.env.Domain_NAME : "";
    const hostedZoneId = process.env.HOST_ZONE ? process.env.HOST_ZONE : "";
    const zoneName = process.env.ZONE_NAME ? process.env.ZONE_NAME : "";
    const recordName = process.env.RECORD_NAME ? process.env.RECORD_NAME : "";

    const hebrewBucket = new s3.Bucket(this, 'hebrewBucket', {
      bucketName: bucketName,
    });


    const cert = crt.Certificate.fromCertificateArn(
      this,
      'heb-crt',
      certArn,
    )


    const fileCodeOption: cf.FileCodeOptions = {
      filePath: path.join(__dirname, 'func.js')
    }

    const cfFunc = new cf.Function(this, "hebrew-func", {
      code: cf.FunctionCode.fromFile(fileCodeOption),
      functionName: "hebrew-cf-func"
    })

    const funcAssosiation: cf.FunctionAssociation = {
      eventType: cf.FunctionEventType.VIEWER_REQUEST,
      function: cfFunc
    }

    const hebrewDistribution = new cf.Distribution(this, 'hebrewDist', {
      httpVersion: cf.HttpVersion.HTTP2,
      enableIpv6: true,
      domainNames: [domainName],
      defaultRootObject: 'index.html',
      certificate: cert,
      defaultBehavior: {
        origin: new origins.OriginGroup({
          primaryOrigin: origins.S3BucketOrigin.withOriginAccessControl(hebrewBucket),
          fallbackOrigin: new origins.HttpOrigin(recordName),
          fallbackStatusCodes: [404],
        }),
        //origins.S3BucketOrigin(hebrewBucket),
        viewerProtocolPolicy: cf.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [funcAssosiation],
      },
    });

    const bucketDeployment = new depl.BucketDeployment(
      this,
      'mainBucketDeployment',
      {
        sources: [depl.Source.asset(path.join(__dirname, '../../dist/hebrew-app/browser/'))],
        destinationBucket: hebrewBucket,
        distribution: hebrewDistribution,
        prune: true,
      }
    );

    const route53Zone = route.HostedZone.fromHostedZoneAttributes(this, "route", {
      hostedZoneId: hostedZoneId,
      zoneName: zoneName,
    })

    const record = new route.CnameRecord(this, "route-record", {
      zone: route53Zone,
      deleteExisting: true,
      recordName: recordName,
      domainName: hebrewDistribution.domainName
    })
  }

}

