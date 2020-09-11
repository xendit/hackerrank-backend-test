data "aws_eks_cluster" "this" {
  name = "trident-production-0"
}

data "aws_caller_identity" "current" {}

data "aws_kms_key" "chamber_key" {
  provider = aws.oregon
  key_id = "alias/parameter_store_key"
}

#EKS-IAM IAM role creation
module "eks_iam_role_assumable_with_eks_oidc" {
  source = "git@github.com:xendit/xendit-infrastructure.git//terraform//public_modules//eks-chamber-iam-role?ref=master"

  account_id = data.aws_caller_identity.current.account_id
  service_name = "hackerank-backend-test"
  environment = "production"
  mode = "live"

  role_path = "/"
  force_detach_policies = false
  oidc_provider_url          = replace(data.aws_eks_cluster.this.identity.0.oidc.0.issuer, "/(https|http)(://)/", "")
  chamber_kms_master_key_id = data.aws_kms_key.chamber_key.id

  eks_service_accounts = [
    {
      name      = "hackerank-backend-test-live"
      namespace = "cashpay-live"
    },
  ]
}