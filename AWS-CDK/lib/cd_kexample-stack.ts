import * as cdk from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdKexampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myS3bucket = new Bucket(this, 'MyS3BucketonSDK', {
      bucketName: 'thisistestbucketname',
      versioned: true
    })
    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdKexampleQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
