import * as cdk from "aws-cdk-lib";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class CdKexampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myS3bucket = new Bucket(this, "MyS3BucketonSDK", {
      bucketName: "aws-dev-course-shop-cdk",
      versioned: true,
      publicReadAccess: true,
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      websiteIndexDocument: "index.html",
    });

    new BucketDeployment(this, "DeployWebsite", {
      sources: [Source.asset("../dist")],
      destinationBucket: myS3bucket,
    });
  }
}
