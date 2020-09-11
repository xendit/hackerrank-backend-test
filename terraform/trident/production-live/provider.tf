terraform {
  required_version = "~> 0.12.8"
  backend "s3" {
    bucket         = "xendit-terraform"
    key            = "aws/trident/eks-chamber-iam-role/hackerank-backend-test-live"
    region         = "ap-southeast-1"
    encrypt        = true
    profile        = "xendit"
    dynamodb_table = "xendit-terraform-lock"
  }
}

provider "aws" {
  region  = "ap-southeast-1"
}

provider "aws" {
  alias = "oregon"
  region  = "us-west-2"
}